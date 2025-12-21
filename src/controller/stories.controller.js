const pool = require("../config/config.db");
const cloudinary = require("../config/cloudinary");

// =================================================================================
// 🚀 CONTROLLER METHODS
// =================================================================================

/**
 * Kiểm tra xem người dùng hiện tại có phải là tác giả của truyện không.
 */
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

/**
 * Tạo mới một Story.
 * Chú ý: Cột pen_name được INSERT trực tiếp vào bảng Stories.
 */
exports.createStory = async (req, res) => {
  try {
    const { title, description, pen_name, author_id, link_forum, genres_id } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let coverUrl = null;

    // nếu có file ảnh thì upload lên cloudinary
    if (req.file) {
      // Vì upload_stream dùng callback nên cần dùng Promise để biến nó thành async/await
      coverUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "stories_covers" },
          (error, result) => {
            if (error) reject(error);
            else {
              resolve(result.secure_url);
            }
          }
        );
        stream.end(req.file.buffer);
      });
    }

    const [result] = await pool.query(
      "INSERT INTO Stories (title, description, author_id, pen_name, urlImg, link_forum, genres_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, author_id, pen_name, coverUrl, link_forum, genres_id]
    );

    res.status(201).json({ success: true, id: result.insertId, message: "Story created", cover: coverUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error, error: error.message });
  }
};

/**
 * Cập nhật thông tin Story (chưa bao gồm cập nhật pen_name, bạn có thể thêm logic này nếu cần).
 */
exports.updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    // Bổ sung pen_name vào destructuring nếu bạn muốn cho phép cập nhật pen_name tại đây
    const { title, genres_id, description, pen_name } = req.body;

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

    // Xây dựng query linh hoạt
    let fieldsToUpdate = [];
    let params = [];

    if (title !== undefined) { fieldsToUpdate.push("title = ?"); params.push(title); }
    if (genres_id !== undefined) { fieldsToUpdate.push("genres_id = ?"); params.push(genres_id); }
    if (description !== undefined) { fieldsToUpdate.push("description = ?"); params.push(description); }
    if (pen_name !== undefined) { fieldsToUpdate.push("pen_name = ?"); params.push(pen_name); } // Thêm pen_name
    if (coverUrl !== null) { fieldsToUpdate.push("urlImg = ?"); params.push(coverUrl); }

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ success: false, message: "Không có trường nào để cập nhật" });
    }

    const query = `UPDATE Stories SET ${fieldsToUpdate.join(", ")} WHERE story_id = ?`;
    params.push(id);

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

/**
 * Xóa Story.
 */
exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM stories WHERE id=?", [id]);
    res.json({ success: true, message: "Story deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting story", error: error.message });
  }
};

/**
 * Lấy Story theo ID.
 * (Hàm này không cần thay đổi logic tên tác giả vì nó chỉ trả về cột từ Stories, 
 * nếu cần tên tác giả, bạn nên dùng hàm khác hoặc bổ sung JOIN)
 */
exports.getStoryById = async (req, res) => {
  try {
    const story_id = req.params.id;
    const [rows] = await pool.query(
      ` SELECT s.*, u.username, COALESCE(s.pen_name, u.username) AS author_name 
        FROM Stories s
        JOIN Users u ON s.author_id = u.user_id
        WHERE s.story_id = ? AND s.status = 'published'`,
      [story_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Story không tồn tại" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Lỗi lấy stories:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

/**
 * Lấy tất cả Story.
 * ✅ ĐÃ SỬA: Sử dụng COALESCE(s.pen_name, u.username) AS author_name
 */
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
    COALESCE(s.pen_name, u.username) AS author_name,
    u.link_thumbnail,
    COUNT(DISTINCT c.chap_number) AS total_chapters,
    s.create_at
FROM Stories s
LEFT JOIN Chapters c 
    ON s.story_id = c.story_id
LEFT JOIN Users u 
    ON s.author_id = u.user_id
WHERE TRIM(LOWER(s.status)) = 'published'
GROUP BY 
    s.story_id, s.urlImg, s.title, s.description, s.status, s.author_id, author_name, u.link_thumbnail, s.create_at
ORDER BY s.create_at DESC;

        `,
    );

    res.json(rows);
  } catch (err) {
    console.error("Lỗi lấy stories:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

/**
 * Lấy Stories của một tác giả.
 * (Hàm này chủ yếu dành cho tác giả quản lý, không cần thay đổi logic tên tác giả)
 */
exports.getStory = async (req, res) => {
  try {
    const author_id = req.params.id
    const status = req.query.status || 'published'

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
      LEFT JOIN Chapters c 
            ON c.story_id = s.story_id
      LEFT JOIN (
          SELECT c1.story_id, c1.chapter_id, c1.chap_number, c1.title, c1.is_final
          FROM Chapters c1
          WHERE c1.chap_number = (
              SELECT MAX(c2.chap_number)
              FROM Chapters c2
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
      [author_id, status, status]
    )

    res.json(rows)
  } catch (err) {
    console.error('Lỗi lấy stories:', err)
    res.status(500).json({ error: 'Lỗi server' })
  }
}

/**
 * Lấy Story ngẫu nhiên.
 * (Hàm này chỉ lấy các cột từ Stories và Genres, không cần username/pen_name)
 */
exports.getRandomStory = async (req, res) => {
  let limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit) || limit <= 0) limit = 10;
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

/**
 * Lấy Story đã hoàn thành.
 * ✅ ĐÃ SỬA: Sử dụng COALESCE(s.pen_name, u.username) AS author_name
 */
exports.getStoryComplete = async (req, res) => {
  let limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit) || limit <= 0) limit = 10;
  limit = Math.min(limit, 100);
  try {
    const [rows] = await pool.query(
      `SELECT 
      s.*,
      c.chap_number,
      g.name AS genre_name,
      COALESCE(s.pen_name, u.username) AS author_name,
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

/**
 * Lấy Top Story được đọc nhiều nhất (tổng thể).
 * ✅ ĐÃ SỬA: Sử dụng COALESCE(s.pen_name, u.username) AS author_name
 */
exports.getTopStoryReaded = async (req, res) => {
  let { limit } = req.query
  limit = parseInt(limit) || 10

  try {
    const [rows] = await pool.query(
      `SELECT 
                s.story_id,
                s.title AS story_title,
                s.urlImg,
                s.author_id,
                -- 🚀 LOGIC ĐÃ SỬA: Ưu tiên pen_name, nếu NULL thì dùng username
                COALESCE(s.pen_name, u.username) AS author_name,
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
            GROUP BY s.story_id, s.title, s.urlImg, s.author_id, author_name 
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

/**
 * Lấy Story theo Category.
 * ✅ ĐÃ SỬA: Sử dụng COALESCE(s.pen_name, u.username) AS author_name
 */
exports.getStoryByCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);

    const [rows] = await pool.query(
      `
            SELECT 
    s.story_id, 
    s.title,
    s.pen_name,
    s.description, 
    s.author_id, 
    -- 🚀 LOGIC ĐÃ SỬA: Ưu tiên pen_name, nếu NULL thì dùng username
    COALESCE(s.pen_name, u.username) AS author_name,             
    u.link_thumbnail,          
    s.urlImg,
    s.link_forum, 
    s.create_at, 
    g.name AS genre_name,
    g.description AS genre_description,
    (
        SELECT MAX(c.chap_number)
        FROM Chapters c
        WHERE c.story_id = s.story_id
    ) AS latest_chapter
FROM Stories s
JOIN Genres g ON g.genre_id = s.genres_id 
JOIN Users u ON u.user_id = s.author_id  
WHERE 
    (? NOT BETWEEN 1 AND 11 OR g.genre_id = ?)
    AND s.status = 'published';
            `,
      [categoryId, categoryId]
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Lấy tất cả dữ liệu chi tiết Story + Chapters.
 * ✅ ĐÃ SỬA: Sử dụng COALESCE(s.pen_name, u.username) AS author_name
 */
exports.getAllDataStory = async (req, res) => {
  try {
    const story_id = req.params.id;
    const status = req.query.status || req.body.status || 'published';

    const [rows] = await pool.query(
      `
                SELECT 
                    s.urlImg, 
                    s.story_id, 
                    s.title AS story_title, 
                    s.description, 
                    u.user_id, 
                    -- 🚀 LOGIC ĐÃ SỬA: Ưu tiên pen_name, nếu NULL thì dùng username
                    COALESCE(s.pen_name, u.username) AS author_name, 
                    c.chapter_id, 
                    c.chap_number,
                    c.is_vip,
                    c.title AS chapter_title, 
                    c.view_count, 
                    c.word_count, 
                    c.created_at,
                    COALESCE(totals.total_view, 0) AS total_view, 
                    COALESCE(totals.total_word, 0) AS total_word,
                    COALESCE(user_reads.total_reads, 0) AS total_reads,
                    COALESCE(votes.total_votes, 0) AS total_votes
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
                LEFT JOIN (
                    SELECT 
                        story_id, 
                        COUNT(*) AS total_votes
                    FROM StoryRecommendations 
                    GROUP BY story_id
                ) votes 
                    ON votes.story_id = s.story_id
                WHERE s.story_id = ? 
                AND s.status = ?
                ORDER BY c.chap_number ASC;
      `,
      [story_id, status]
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * Lấy Comment Story.
 */
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

/**
 * Lấy danh sách truyện đang đọc.
 * ✅ ĐÃ SỬA: Sử dụng COALESCE(s.pen_name, u.username) AS author_name
 */
exports.getUserReadingList = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [result] = await pool.query(
      `SELECT 
                ur.user_id,
                s.story_id,
                s.author_id,
                s.title AS story_title,
                s.urlImg AS link_img,
                -- 🚀 LOGIC ĐÃ SỬA: Ưu tiên pen_name, nếu NULL thì dùng username
                COALESCE(s.pen_name, u.username) AS author_name,
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

/**
 * Lấy danh sách truyện yêu thích.
 * ✅ ĐÃ SỬA: Sử dụng COALESCE(s.pen_name, a.username) AS author_name
 */
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
    -- 🚀 LOGIC ĐÃ SỬA: Ưu tiên pen_name, nếu NULL thì dùng username
    COALESCE(s.pen_name, a.username) AS author_name,
    s.description,
    MAX(c.chap_number) AS total_chapters
FROM StoryFavorites sf
JOIN Stories s 
    ON sf.story_id = s.story_id
JOIN Users u 
    ON sf.user_id = u.user_id           -- người dùng yêu thích
LEFT JOIN Users a 
    ON s.author_id = a.user_id          -- tác giả truyện
LEFT JOIN Chapters c
    ON c.story_id = s.story_id
WHERE sf.user_id = ? 
  AND s.status = 'published'
GROUP BY 
    sf.user_id,
    u.username,
    s.story_id,
    s.title,
    s.urlImg,
    s.author_id,
    author_name,
    s.description;
        `,
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
}

/**
 * Lấy Top Story được đọc nhiều nhất (theo tháng).
 * ✅ ĐÃ SỬA: Sử dụng COALESCE(s.pen_name, u.username) AS author_name
 */
exports.getTopStoryReadedForMonth = async (req, res) => {
  let { limit } = req.query
  limit = parseInt(limit) || 10

  try {
    const [rows] = await pool.query(
      `SELECT 
                s.story_id,
                s.title AS story_title,
                s.urlImg,
                s.author_id,
                -- 🚀 LOGIC ĐÃ SỬA: Ưu tiên pen_name, nếu NULL thì dùng username
                COALESCE(s.pen_name, u.username) AS author_name,
                COUNT(cr.id) AS total_reads
            FROM ChapterReads cr
            JOIN Chapters c 
                ON cr.story_id = c.story_id 
            AND cr.chap_number = c.chap_number
            JOIN Stories s 
                ON s.story_id = c.story_id
            JOIN Users u 
                ON s.author_id = u.user_id
            WHERE cr.read_at BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
                                AND LAST_DAY(DATE_SUB(CURDATE(), INTERVAL 1 MONTH))
            AND s.status = 'published'
            GROUP BY s.story_id, s.title, s.urlImg, s.author_id, author_name
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

/**
 * Lấy Top Author (theo tuần).
 * (Chỉ cần lấy username, không cần pen_name vì đây là bảng xếp hạng author_id)
 */
exports.getTopAuthorForWeek = async (req, res) => {
  let { limit } = req.query
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

/**
 * Lấy Top User Readers.
 */
exports.getTopUserReadersStory = async (req, res) => {
  let { limit } = req.query
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
      // Có thể trả về 200 [] nếu không có chương nào chưa mua, tùy thuộc vào logic front-end
      return res.status(200).json([]);
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
    const { chapters } = req.body;

    const pricePerChapter = 5;
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


/**
 * Lấy Top Story được đề cử nhiều nhất.
 * ✅ ĐÃ SỬA: Sử dụng COALESCE(s.pen_name, a.username) AS author_name
 */
exports.getTopStoryRecomment = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
    s.story_id,
    s.title,
    s.description,
    s.urlImg,
    s.author_id,
    -- 🚀 LOGIC ĐÃ SỬA: Ưu tiên pen_name, nếu NULL thì dùng username
    COALESCE(s.pen_name, a.username) AS author_name,
    SUM(sr.coins_spent) AS total_coins_spent,           
    COUNT(DISTINCT sr.user_id) AS total_users_recommend, 
    MAX(sr.created_at) AS last_recommend_at              
FROM StoryRecommendations sr
JOIN Stories s ON sr.story_id = s.story_id
JOIN Users a ON s.author_id = a.user_id
GROUP BY s.story_id, s.title, s.description, s.urlImg, s.author_id, author_name
ORDER BY total_coins_spent DESC
LIMIT 10;

                `
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Lấy tất cả Story đã publish (cho Admin/Quản lý).
 * (Hàm này nên lấy thông tin chính thức là username)
 */
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

    const validStatus = ['draft', 'pending', 'published', 'denied']
    if (!validStatus.includes(status)) {
      return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ' })
    }

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
    const limit = parseInt(req.query.limit) || 10;

    const [rows] = await pool.query(`
            SELECT 
                u.user_id AS user_id,
                u.username,
                u.link_thumbnail,
                u.email,
                SUM(t.amount) AS total_spent,
                COUNT(t.id) AS total_transactions
            FROM TransactionHistory t
            JOIN Users u ON u.user_id = t.user_id
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

  if (!story_id || !chapter_id) {
    return res.status(400).json({ error: 'Thiếu story_id hoặc chapter_id' });
  }

  try {
    const [exists] = await pool.query(
      `SELECT 1 FROM ReadingProgress 
         WHERE user_id = ? AND story_id = ? AND chapter_id = ?`,
      [user_id, story_id, chapter_id]
    );

    let result;

    if (exists.length > 0) {
      // Nếu đã có → XÓA (logic bỏ bookmark)
      [result] = await pool.query(
        `DELETE FROM ReadingProgress 
             WHERE user_id = ? AND story_id = ? AND chapter_id = ?`,
        [user_id, story_id, chapter_id]
      );

      res.status(200).json({
        success: true,
        message: 'Đã xóa tiến độ đọc (bỏ bookmark)',
        affectedRows: result.affectedRows
      });
    } else {
      // Nếu chưa có → THÊM MỚI
      [result] = await pool.query(
        `INSERT INTO ReadingProgress (user_id, story_id, chapter_id, scroll, updated_at)
             VALUES (?, ?, ?, ?, NOW())`,
        [user_id, story_id, chapter_id, scroll]
      );

      res.status(200).json({
        success: true,
        message: 'Đã lưu tiến độ đọc thành công',
        affectedRows: result.affectedRows
      });
    }

  } catch (err) {
    console.error('Lỗi khi lưu tiến độ đọc:', err);
    res.status(500).json({ error: 'Lỗi server khi lưu tiến độ đọc' });
  }
};

exports.getReadingProgress = async (req, res) => {
  const { storyId } = req.params;
  const { userId } = req.params; // Lấy userId từ params
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
      [userId, storyId]
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

exports.followStory = async (req, res) => {
  const storyId = parseInt(req.params.storyId);
  const { user_id } = req.body;

  if (!user_id || !storyId) {
    return res.status(400).json({ success: false, message: 'Thiếu user_id hoặc story_id' });
  }

  try {
    // Thêm vào bảng UserFollowStories (tránh trùng bằng UNIQUE KEY)
    await pool.query(`
      INSERT IGNORE INTO UserFollowStories (user_id, story_id)
      VALUES (?, ?)
    `, [user_id, storyId]);

    res.json({ success: true, message: 'Theo dõi truyện thành công!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// =================================================================================
// 🚀 FOLLOW/UNFOLLOW STORY CONTROLLERS
// =================================================================================

/**
 * Theo dõi một truyện. Sử dụng INSERT IGNORE để tránh trùng lặp nếu đã theo dõi.
 */
exports.followStory = async (req, res) => {
  const storyId = parseInt(req.params.storyId);
  const { user_id } = req.body;

  if (!user_id || !storyId) {
    return res.status(400).json({ success: false, message: 'Thiếu user_id hoặc story_id' });
  }

  try {
    // Thêm vào bảng UserFollowStories (tránh trùng bằng UNIQUE KEY)
    await pool.query(`
      INSERT IGNORE INTO UserFollowStories (user_id, story_id)
      VALUES (?, ?)
    `, [user_id, storyId]);

    res.json({ success: true, message: 'Theo dõi truyện thành công!' });
  } catch (error) {
    console.error('Lỗi khi theo dõi truyện:', error);
    res.status(500).json({ success: false, message: 'Lỗi server khi theo dõi truyện.' });
  }
};

/**
 * Bỏ theo dõi một truyện.
 */
exports.unfollowStory = async (req, res) => {
  const storyId = parseInt(req.params.storyId);
  const { user_id } = req.body;

  if (!user_id || !storyId) {
    return res.status(400).json({ success: false, message: 'Thiếu user_id hoặc story_id' });
  }

  try {
    const [result] = await pool.query(`
      DELETE FROM UserFollowStories
      WHERE user_id = ? AND story_id = ?
    `, [user_id, storyId]);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Đã bỏ theo dõi truyện.' });
    } else {
      res.json({ success: false, message: 'Bạn chưa theo dõi truyện này.' });
    }
  } catch (error) {
    console.error('Lỗi khi bỏ theo dõi:', error);
    res.status(500).json({ success: false, message: 'Lỗi server khi bỏ theo dõi truyện.' });
  }
};

/**
 * Lấy danh sách truyện đã theo dõi chi tiết.
 * ✅ ĐÃ SỬA: JOIN với Stories và Users để lấy chi tiết truyện và tên tác giả (ưu tiên pen_name).
 */
exports.getFollowedStories = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    if (!userId) {
      return res.status(400).json({ success: false, message: "Thiếu userId" });
    }

    const [rows] = await pool.query(`
      SELECT 
        fs.id, 
        fs.created_at AS followed_at,
        s.story_id,
        s.title,
        s.urlImg,
        s.description,
        s.status,
        s.author_id,
        -- 🚀 LOGIC ĐÃ SỬA: Ưu tiên pen_name, nếu NULL thì dùng username
        COALESCE(s.pen_name, u.username) AS author_name,
        (SELECT MAX(c.chap_number) FROM Chapters c WHERE c.story_id = s.story_id) AS total_chapters
      FROM UserFollowStories fs
      JOIN Stories s 
        ON fs.story_id = s.story_id
      JOIN Users u 
        ON s.author_id = u.user_id
      WHERE fs.user_id = ?
      AND s.status = 'published' -- Chỉ lấy truyện đã xuất bản
      ORDER BY fs.created_at DESC
    `, [userId]);

    res.json({
      success: true,
      total: rows.length,
      data: rows
    });

  } catch (error) {
    console.error('❌ Lỗi getFollowedStories:', error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh sách truyện đã follow",
      error: error.message
    });
  }
};