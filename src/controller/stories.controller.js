const pool = require("../config/config.db");
const cloudinary = require("../config/cloudinary");

exports.checkOwner = async (req, res) => {


    const storyId = req.params.id;
    const userId = req.user.user_id; // đảm bảo auth middleware set req.user
    try {
        const [rows] = await pool.query(
            "SELECT author_id FROM Stories WHERE story_id = ?",
            [storyId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Story không tồn tại" });
        }

        const isOwner = rows[0].author_id === userId;
        return res.json({ success: true, isOwner });
    } catch (err) {
        console.error("❌ Error checking owner:", err);
        return res.status(500).json({ success: false, message: "Lỗi server", error: err.message });
    }
};

exports.createStory = async (req, res) => {
    try {
        const { title, description, author_id, link_forum, genres_id } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        let coverUrl = null;

        // nếu có file ảnh thì upload lên cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream(
                { folder: "stories_covers", timeout: 1200000 },
                (error, result) => {
                    if (error) throw error;
                    coverUrl = result.secure_url;
                }
            );

            // vì upload_stream dùng callback nên cần promise
            await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "stories_covers" },
                    (error, result) => {
                        if (error) reject(error);
                        else {
                            coverUrl = result.secure_url;
                            resolve();
                        }
                    }
                );
                stream.end(req.file.buffer);
            });
        }

        const [result] = await pool.query(
            "INSERT INTO Stories (title,  description, author_id, urlImg , link_forum, genres_id) VALUES (?, ?, ? , ?,?,?)",
            [title, description, author_id, coverUrl, link_forum, genres_id]
        );

        res.status(201).json({ success: true, id: result.insertId, message: "Story created", cover: coverUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error, error: error.message });
    }
};

// UPDATE
exports.updateStory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, genres_id, description } = req.body;

        let coverUrl = null;

        // Nếu có file upload -> upload lên Cloudinary
        if (req.file) {
            coverUrl = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "stories_covers" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                );
                stream.end(req.file.buffer);
            });
        }

        // Nếu không có ảnh mới => giữ nguyên ảnh cũ
        let query = "";
        let params = [];

        if (coverUrl) {
            query = `
        UPDATE Stories 
        SET title = ?, genres_id = ?, description = ?, urlImg = ? 
        WHERE story_id = ?
      `;
            params = [title, genres_id, description, coverUrl, id];
        } else {
            query = `
        UPDATE Stories 
        SET title = ?, genres_id = ?, description = ? 
        WHERE story_id = ?
      `;
            params = [title, genres_id, description, id];
        }

        const [result] = await pool.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Story not found" });
        }

        res.status(200).json({
            success: true,
            message: "Cập nhật thành công!",
            coverUrl: coverUrl || undefined
        });

    } catch (error) {
        console.error("❌ Error updating story:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi khi cập nhật story",
            error: error.message
        });
    }
};

// DELETE
exports.deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM stories WHERE id=?", [id]);
        res.json({ success: true, message: "Story deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting story", error: error.message });
    }
};

exports.getStoryById = async (req, res) => {
    try {
        const story_id = req.params.id;
        const [rows] = await pool.query(
            ` SELECT * from Stories where story_id = ?  AND status = 'published'`,
            [story_id]
        );

        res.json(rows);
    } catch (err) {
        console.error("Lỗi lấy stories:", err);
        res.status(500).json({ error: "Lỗi server" });
    }
};

exports.getAllStory = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
                s.story_id,
                s.urlImg,
                s.title,
                s.description,
                s.status,
                s.author_id,
                u.username,
                u.link_thumbnail,
                COUNT(c.chap_number) AS total_chapters
            FROM Stories s
            LEFT JOIN Chapters c 
                ON s.story_id = c.story_id
            LEFT JOIN Users u 
                ON s.author_id = u.user_id
            WHERE s.status = 'published'
            GROUP BY 
                s.story_id, s.title, s.description, s.status, s.author_id, u.username, u.link_thumbnail;
        `,
        );

        res.json(rows);
    } catch (err) {
        console.error("Lỗi lấy stories:", err);
        res.status(500).json({ error: "Lỗi server" });
    }
};

exports.getStory = async (req, res) => {
    try {
        const author_id = req.params.id
        const status = req.query.status || 'published' // 👈 thêm dòng này

        const [rows] = await pool.query(
            `SELECT 
          s.create_at,
          s.story_id,
          s.title,
          s.description,
          s.author_id,
          s.urlImg,
          s.genres_id,
          COALESCE(SUM(c.word_count), 0) AS total_word_count,
          COALESCE(SUM(c.view_count), 0) AS total_view_count,
          COALESCE(COUNT(ur.story_id), 0) AS total_reads,
          lc.chapter_id   AS last_chapter_id,
          lc.chap_number  AS last_chap_number,
          lc.is_final     AS last_chapter_is_final,
          lc.title        AS last_chapter_title
      FROM Stories s
      LEFT JOIN chapters c 
            ON c.story_id = s.story_id
      LEFT JOIN (
          SELECT c1.story_id, c1.chapter_id, c1.chap_number, c1.title, c1.is_final
          FROM chapters c1
          WHERE c1.chap_number = (
              SELECT MAX(c2.chap_number)
              FROM chapters c2
              WHERE c2.story_id = c1.story_id
          )
      ) lc ON lc.story_id = s.story_id
      LEFT JOIN UserReading ur 
            ON ur.story_id = s.story_id
      WHERE s.author_id = ?  AND ( ? = 'all' OR s.status = ? )
      GROUP BY 
          s.story_id, s.create_at, s.title, s.description, 
          s.author_id, s.urlImg, s.genres_id, 
          lc.chapter_id, lc.chap_number, lc.title, lc.is_final;
      `,
            [author_id, status, status] // 👈 truyền status vào query
        )

        res.json(rows)
    } catch (err) {
        console.error('Lỗi lấy stories:', err)
        res.status(500).json({ error: 'Lỗi server' })
    }
}

exports.getRandomStory = async (req, res) => {
    let limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit) || limit <= 0) limit = 10;    // default 10
    limit = Math.min(limit, 100);
    try {
        const [rows] = await pool.query(
            `SELECT 
                s.*,
                g.name AS genre_name
            FROM Stories s
            JOIN Genres g ON s.genres_id = g.genre_id
            ORDER BY RAND()
             LIMIT ?`,
            [limit]
        )
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.getStoryComplete = async (req, res) => {
    let limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit) || limit <= 0) limit = 10;    // default 10
    limit = Math.min(limit, 100);
    try {
        const [rows] = await pool.query(
            `SELECT 
      s.*,
      c.chap_number,
      g.name AS genre_name,
      u.username AS author_name,
      u.user_id AS author_id
   FROM Stories s
   JOIN Chapters c 
       ON c.story_id = s.story_id
   JOIN Genres g 
       ON s.genres_id = g.genre_id
   JOIN Users u 
       ON s.author_id = u.user_id
   WHERE c.is_final = 1  AND s.status = 'published'
   LIMIT ?`,
            [limit]
        )
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.getTopStoryReaded = async (req, res) => {
    let { limit } = req.query
    // Nếu client không gửi thì mặc định = 10
    limit = parseInt(limit) || 10

    try {
        const [rows] = await pool.query(
            `SELECT 
                s.story_id,
                s.title AS story_title,
                s.urlImg,
                s.author_id,
                u.username AS author_name,
                COUNT(cr.id) AS total_reads
            FROM ChapterReads cr
            JOIN Chapters c 
                ON cr.story_id = c.story_id 
            AND cr.chap_number = c.chap_number
            JOIN Stories s 
                ON s.story_id = c.story_id
            JOIN Users u 
                ON s.author_id = u.user_id
                WHERE s.status = 'published'
            GROUP BY s.story_id, s.title, s.urlImg, s.author_id, u.username
            ORDER BY total_reads DESC
            LIMIT ?;`,
            [limit]
        )

        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

// GET /api/stories?category=1
exports.getStoryByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const [rows] = await pool.query(
            `SELECT s.story_id, s.title, s.description, s.author_id, s.urlImg,s.link_forum, s.create_at, g.name AS genre_name ,g.description AS genre_description FROM Stories s JOIN Genres g ON g.genre_id = s.genres_id WHERE g.genre_id = ?   AND s.status = 'published';`,
            [categoryId]
        );

        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getAllDataStory = async (req, res) => {
    try {
        const story_id = req.params.id;
        // ✅ Lấy trạng thái từ query hoặc body, mặc định là 'published'
        const status = req.query.status || req.body.status || 'published';

        const [rows] = await pool.query(
            `
      SELECT 
        s.urlImg, 
        s.story_id, 
        s.title AS story_title, 
        s.description, 
        u.user_id, 
        u.username AS author_name, 
        c.chapter_id, 
        c.chap_number,
        c.is_vip,
        c.title AS chapter_title, 
        c.view_count, 
        c.word_count, 
        c.created_at,
        COALESCE(totals.total_view, 0) AS total_view, 
        COALESCE(totals.total_word, 0) AS total_word,
        COALESCE(user_reads.total_reads, 0) AS total_reads
      FROM Stories s
      JOIN Users u 
        ON s.author_id = u.user_id
      LEFT JOIN Chapters c 
        ON s.story_id = c.story_id
      LEFT JOIN (
          SELECT 
              story_id, 
              SUM(view_count) AS total_view, 
              SUM(word_count) AS total_word
          FROM Chapters 
          GROUP BY story_id
      ) totals 
        ON totals.story_id = s.story_id
      LEFT JOIN (
          SELECT 
              story_id, 
              COUNT(*) AS total_reads
          FROM UserReading
          GROUP BY story_id
      ) user_reads
        ON user_reads.story_id = s.story_id
      WHERE s.story_id = ? AND s.status = ?
      ORDER BY c.chap_number ASC
      `,
            [story_id, status]
        );

        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getCommentStory = async (req, res) => {
    try {
        const story_id = req.params.id;

        const [rows] = await pool.query(
            `SELECT sc.*, u.username, u.link_thumbnail
        FROM StoryComments sc
        JOIN Users u ON sc.user_id = u.user_id
        WHERE sc.story_id = ?`,
            [story_id]
        );

        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.insertUserReadingBook = async (req, res) => {
    const { user_id, story_id, chapter_id } = req.body;
    if (!user_id || !story_id || !chapter_id) {
        return res.status(400).json({ message: "Thiếu dữ liệu" });
    }
    try {
        const [result] = await pool.query(
            ` INSERT INTO UserReading (user_id, story_id, chapter_number, last_read_at)
            VALUES (?, ?, ?, NOW())
            ON DUPLICATE KEY UPDATE
            chapter_number = VALUES(chapter_number),
            last_read_at = NOW()`,
            [user_id, story_id, chapter_id]
        );
        res.json({ message: "Cập nhật thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

exports.getUserReadingList = async (req, res) => {
    const { user_id } = req.params;
    try {
        const [result] = await pool.query(
            `SELECT 
                ur.user_id,
                s.story_id,
                s.title AS story_title,
                s.urlImg AS link_img,
                u.username AS author_name,    -- lấy tên tác giả
                ur.chapter_number,
                c.chapter_id,
                c.title AS chapter_title,
                ur.last_read_at,
                max_chap.max_chap_number AS total_chapters,
                story_vip.is_vip_story
            FROM UserReading ur
            JOIN Stories s 
                ON ur.story_id = s.story_id
            JOIN Users u
                ON s.author_id = u.user_id  
            JOIN Chapters c
                ON c.story_id = ur.story_id 
                AND c.chap_number = ur.chapter_number
            JOIN (
                SELECT story_id, MAX(chap_number) AS max_chap_number
                FROM Chapters
                GROUP BY story_id
            ) max_chap
                ON max_chap.story_id = ur.story_id
                JOIN (
                SELECT story_id, MAX(is_vip) AS is_vip_story
                FROM Chapters
                GROUP BY story_id
            ) story_vip
                ON story_vip.story_id = ur.story_id
            WHERE ur.user_id = ? AND s.status = 'published'
            ORDER BY ur.last_read_at DESC;

            `,
            [user_id]
        );
        res.json({ success: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
exports.addFavorite = async (req, res) => {
    const { user_id, story_id } = req.body;
    try {
        const { user_id, story_id } = req.body;
        if (!user_id || !story_id) {
            return res.status(400).json({ message: "Thiếu user_id hoặc story_id" });
        }

        const [rows] = await pool.query(
            "SELECT * FROM StoryFavorites WHERE user_id = ? AND story_id = ?",
            [user_id, story_id]
        );


        if (rows.length > 0) {
            await pool.query(
                "DELETE FROM StoryFavorites WHERE user_id = ? AND story_id = ?",
                [user_id, story_id]
            );
            return res.json({ isFavorite: false, message: "Đã bỏ yêu thích" });
        } else {
            await pool.query(
                "INSERT INTO StoryFavorites (user_id, story_id) VALUES (?, ?)",
                [user_id, story_id]
            );
            return res.json({ isFavorite: true, message: "Đã thêm vào yêu thích" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
};
exports.checkFavoriteData = async (req, res) => {
    try {
        const user_id = req.query.user_id
        const story_id = req.query.story_id
        const [rows] = await pool.query(
            "SELECT * FROM StoryFavorites WHERE user_id = ? AND story_id = ?", [user_id, story_id]
        );
        if (rows.length > 0) {
            return res.json({ isFavorite: true });
        } else {
            return res.json({ isFavorite: false });
        }
    } catch (err) {
        res.status(500).json({ error: "Lỗi server" });
    }
}

exports.getListFavorites = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
            sf.user_id,
            u.username,
            s.story_id,
            s.title,
            s.urlImg,
            s.author_id,
            s.description,
            MAX(c.chap_number) AS total_chapters
        FROM StoryFavorites sf
        JOIN Stories s 
            ON sf.story_id = s.story_id
        JOIN Users u 
            ON sf.user_id = u.user_id
        LEFT JOIN Chapters c
            ON c.story_id = s.story_id
        WHERE sf.user_id = ? AND s.status = 'published'
        GROUP BY 
            sf.user_id,
            u.username,
            s.story_id,
            s.title,
            s.urlImg,
            s.author_id,
            s.description;
        `,
            [req.params.userId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server" });
    }
}

exports.getTopStoryReadedForMonth = async (req, res) => {
    let { limit } = req.query
    // Nếu client không gửi thì mặc định = 10
    limit = parseInt(limit) || 10

    try {
        const [rows] = await pool.query(
            `SELECT 
            s.story_id,
            s.title AS story_title,
            s.urlImg,
            s.author_id,
            u.username AS author_name,
            COUNT(cr.id) AS total_reads
        FROM ChapterReads cr
        JOIN Chapters c 
            ON cr.story_id = c.story_id 
        AND cr.chap_number = c.chap_number
        JOIN Stories s 
            ON s.story_id = c.story_id
        JOIN Users u 
            ON s.author_id = u.user_id
        WHERE YEAR(cr.read_at) = YEAR(CURDATE())
        AND MONTH(cr.read_at) = MONTH(CURDATE()) AND s.status = 'published'
        GROUP BY s.story_id, s.title, s.urlImg, s.author_id, u.username
        ORDER BY total_reads DESC
            LIMIT ?;`,
            [limit]
        )

        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}


exports.getTopAuthorForWeek = async (req, res) => {
    let { limit } = req.query
    // Nếu client không gửi thì mặc định = 10
    limit = parseInt(limit) || 10

    try {
        const [rows] = await pool.query(
            `SELECT 
                s.author_id,
                u.username AS author_name,
                u.link_thumbnail,
                COUNT(cr.id) AS total_reads
            FROM ChapterReads cr
            JOIN Chapters c 
                ON cr.story_id = c.story_id 
            AND cr.chap_number = c.chap_number
            JOIN Stories s 
                ON s.story_id = c.story_id
            JOIN Users u 
                ON s.author_id = u.user_id
                WHERE s.status = 'published'
            GROUP BY s.author_id, u.username, u.link_thumbnail
            ORDER BY total_reads DESC
            LIMIT ?;`,
            [limit]
        )
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.getTopUserReadersStory = async (req, res) => {
    let { limit } = req.query
    // Nếu client không gửi thì mặc định = 10
    limit = parseInt(limit) || 10

    try {
        const [rows] = await pool.query(
            `SELECT 
                cr.user_id,
                u.username,
                u.link_thumbnail,
                COUNT(cr.id) AS total_reads
            FROM ChapterReads cr
            JOIN Users u 
                ON cr.user_id = u.user_id
            GROUP BY cr.user_id, u.username, u.link_thumbnail
            ORDER BY total_reads DESC
            LIMIT ?`,
            [limit]
        )
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}


exports.getListStoryUpdated = async (req, res) => {
    let { limit } = req.query
    // Nếu client không gửi thì mặc định = 10
    limit = parseInt(limit) || 10

    try {
        const [rows] = await pool.query(
            `SELECT *
            FROM Stories s
            ORDER BY s.create_at DESC
            LIMIT ?`,
            [limit]
        )
        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.getNumberChapterStory = async (req, res) => {
    try {
        const { storyId } = req.params;

        const [rows] = await pool.execute(
            `SELECT s.story_id,
              s.title,
              COUNT(c.chapter_id) AS total_chapters
       FROM Stories s
       LEFT JOIN Chapters c ON s.story_id = c.story_id
       WHERE s.story_id = ?
       GROUP BY s.story_id, s.title`,
            [storyId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.getNumberChapterStoryNotPurchase = async (req, res) => {
    try {
        const { storyId, userId } = req.params;

        const [rows] = await pool.execute(
            `SELECT c.chap_number
                FROM Chapters c
                LEFT JOIN UserChapters uc 
                    ON c.story_id = uc.story_id 
                    AND c.chap_number = uc.chap_number 
                    AND uc.user_id = ?
                WHERE c.story_id = ?
                    AND uc.chap_number IS NULL
                ORDER BY c.chap_number`,
            [userId, storyId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

exports.unlockChapters = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { userId, storyId } = req.params;
        const { chapters } = req.body; // ví dụ: { "chapters": [2,3,4] }

        console.log(chapters);

        const pricePerChapter = 5; // số coin 1 chương
        if (!userId || !storyId || !Array.isArray(chapters) || chapters.length === 0) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const totalCost = pricePerChapter * chapters.length;

        await conn.beginTransaction();

        // Lấy coin hiện tại
        const [[user]] = await conn.query(
            "SELECT coin_balance FROM Users WHERE user_id = ?",
            [userId]
        );

        if (!user) {
            await conn.rollback();
            return res.status(404).json({ message: "User not found" });
        }

        if (user.coin_balance < totalCost) {
            await conn.rollback();
            return res.status(400).json({ message: "Không đủ Tang diệp" });
        }

        // Trừ coin
        await conn.query(
            "UPDATE Users SET coin_balance = coin_balance - ? WHERE user_id = ?",
            [totalCost, userId]
        );

        // Insert chương đã mở khóa (bỏ qua nếu đã có)
        const values = chapters.map(chap => [userId, storyId, chap]);
        console.log("💾 Values to insert:", values);
        await conn.query(
            "INSERT IGNORE INTO UserChapters (user_id, story_id, chap_number) VALUES ?",
            [values]
        );

        const [[story]] = await conn.query(
            "SELECT title FROM Stories WHERE story_id = ?",
            [storyId]
        );
        const storyTitle = story ? story.title : `ID ${storyId}`;
        const description = `Mở khóa chương ${chapters.join(', ')} của truyện ${storyTitle}`;
        await conn.query(
            `INSERT INTO TransactionHistory (user_id, type, amount, direction, status, description, created_at)
             VALUES (?, ?, ?, ?, ?, ?, NOW())`,
            [userId, 'UNLOCK_CHAPTER', totalCost, 'OUT', 'SUCCESS', description]
        );

        await conn.commit();

        res.status(201).json({
            message: "Mở khóa chương thành công",
            storyId,
            userId,
            unlocked: chapters,
            spent: totalCost,
            remaining_balance: user.coin_balance - totalCost
        });
    } catch (err) {
        await conn.rollback();
        console.error(err);
        res.status(500).json({ message: "Server error" });
    } finally {
        conn.release();
    }
};


exports.getTopStoryRecomment = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
                sr.user_id,
                u.username,          -- username của người recommend
                sr.story_id,
                s.author_id,
                a.username AS author_name,  -- username của tác giả
                sr.coins_spent,
                sr.created_at,
                s.title,
                s.description,
                s.urlImg
            FROM StoryRecommendations sr
            JOIN Stories s ON sr.story_id = s.story_id
            JOIN Users u ON sr.user_id = u.user_id         -- user recommend
            JOIN Users a ON s.author_id = a.user_id       -- tác giả
            ORDER BY sr.coins_spent DESC
            LIMIT 10;

                `
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAllPublishedStories = async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT 
        s.story_id,
        s.title,
        s.description,
        s.urlImg,
        s.status,
        s.create_at,
        u.user_id,
        u.username AS author_name,
        u.email
      FROM Stories s
      JOIN Users u ON s.author_id = u.user_id
      ORDER BY s.create_at DESC
    `);

        return res.json({
            message: "Lấy danh sách truyện đã đăng thành công",
            data: rows
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Lỗi máy chủ" });
    }
};

exports.updateStoryStatus = async (req, res) => {
    try {
        const { storyId } = req.params
        const { status } = req.body

        // kiểm tra input hợp lệ
        const validStatus = ['draft', 'pending', 'published', 'denied']
        if (!validStatus.includes(status)) {
            return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ' })
        }

        // cập nhật trong database
        const [result] = await pool.query(
            `UPDATE Stories SET status = ? WHERE story_id = ?`,
            [status, storyId]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy truyện' })
        }

        return res.json({ success: true, message: 'Cập nhật trạng thái thành công' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Lỗi server' })
    }
}

exports.getTopSpendingUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // cho phép truyền limit qua query param

        const [rows] = await pool.query(`
            SELECT 
                u.user_id AS user_id,
                u.username,
                u.link_thumbnail,
                u.email,
                SUM(t.amount) AS total_spent,
                COUNT(t.id) AS total_transactions
            FROM TransactionHistory t
            JOIN users u ON u.user_id = t.user_id
            WHERE t.direction = 'OUT'
            GROUP BY u.user_id, u.username, u.email
            ORDER BY total_spent DESC
            LIMIT 10
        `, [limit]);

        res.status(200).json({
            success: true,
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách người dùng tiêu nhiều nhất'
        });
    }
};

exports.saveReadingProgress = async (req, res) => {
    const { user_id, story_id, chapter_id, scroll } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!story_id || !chapter_id) {
        return res.status(400).json({ error: 'Thiếu story_id hoặc chapter_id' });
    }
    console.log(req.body);
    try {
        // Ghi hoặc cập nhật tiến độ đọc
        const [result] = await pool.query(
            `INSERT INTO ReadingProgress (user_id, story_id, chapter_id, scroll,  updated_at)
       VALUES (?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE 
          scroll = VALUES(scroll),
          updated_at = NOW()`,
            [user_id, story_id, chapter_id, scroll]
        )

        // Trả phản hồi cho client
        res.status(200).json({
            success: true,
            message: 'Đã lưu tiến độ đọc thành công',
            affectedRows: result.affectedRows
        });
    } catch (err) {
        console.error('Lỗi khi lưu tiến độ đọc:', err);
        res.status(500).json({ error: 'Lỗi server khi lưu tiến độ đọc' });
    }
};

exports.getReadingProgress = async (req, res) => {
    const { storyId } = req.params;
    const { userId } = req.params || 1; // tạm dùng userId = 1 để test



    try {
        const [rows] = await pool.query(
            `SELECT 
                rp.story_id,
                rp.chapter_id,
                rp.scroll,
                rp.updated_at,
                c.title AS chapter_title
            FROM ReadingProgress rp
            JOIN Chapters c 
                ON rp.story_id = c.story_id
                AND rp.chapter_id = c.chap_number
            WHERE rp.user_id = ?
                AND rp.story_id = ?`,
            [userId, storyId] // 
        );
        if (rows.length === 0) {
            return res.status(200).json({
                message: 'Chưa có tiến độ đọc',
                story_id: storyId
            });
        }

        res.status(200).json({
            success: true,
            data: rows
        });
    } catch (err) {
        console.error('Lỗi khi lấy tiến độ đọc:', err);
        res.status(500).json({ error: 'Lỗi server khi lấy tiến độ đọc' });
    }
};