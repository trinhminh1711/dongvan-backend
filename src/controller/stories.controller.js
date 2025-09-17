const pool = require("../config/config.db");
const cloudinary = require("../config/cloudinary");

// CREATE
exports.createStory = async (req, res) => {
    try {
        const { title, description, author_id, link_forum , genres_id} = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        let coverUrl = null;

        // nếu có file ảnh thì upload lên cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream(
                { folder: "stories_covers",timeout: 1200000  },
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
            [title, description, author_id, coverUrl, link_forum , genres_id]
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
        console.log(id);

        let coverUrl = null;
        if (req.file) {
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

        await pool.query(
            "UPDATE Stories SET title=?, genres_id=?, description=?, urlImg=?   WHERE story_id=?",
            [title, genres_id, description, coverUrl, id]
        );
        res.status(201).json({ success: true, message: "update successfull" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating story", error: error.message });
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
            ` SELECT * from Stories where story_id = ?`,
            [story_id]
        );

        res.json(rows);
    } catch (err) {
        console.error("Lỗi lấy stories:", err);
        res.status(500).json({ error: "Lỗi server" });
    }
};


exports.getStory = async (req, res) => {
    try {
        const author_id = req.params.id;
        const [rows] = await pool.query(
            ` SELECT s.create_at,
       s.story_id,
       s.title,
       s.description,
       s.author_id,
       s.urlImg,
       s.genres_id,
       COALESCE(SUM(c.word_count), 0) AS total_word_count,
       COALESCE(SUM(c.view_count), 0) AS total_view_count,
       lc.chapter_id   AS last_chapter_id,
       lc.chap_number  AS last_chap_number,
       lc.title        AS last_chapter_title
FROM Stories s
LEFT JOIN chapters c 
       ON c.story_id = s.story_id
LEFT JOIN (
    SELECT c1.story_id, c1.chapter_id, c1.chap_number, c1.title
    FROM chapters c1
    WHERE c1.chap_number = (
        SELECT MAX(c2.chap_number)
        FROM chapters c2
        WHERE c2.story_id = c1.story_id
    )
) lc ON lc.story_id = s.story_id
WHERE s.author_id = ?
GROUP BY s.story_id, s.create_at, s.title, s.description, 
         s.author_id, s.urlImg, s.genres_id, 
         lc.chapter_id, lc.chap_number, lc.title;
`,
            [author_id]
        );

        res.json(rows);
    } catch (err) {
        console.error("Lỗi lấy stories:", err);
        res.status(500).json({ error: "Lỗi server" });
    }
};


// GET /api/stories?category=1
exports.getStoryByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const [rows] = await pool.query(
            `SELECT s.story_id, s.title, s.description, s.author_id, s.urlImg,s.link_forum, s.create_at, g.name AS genre_name ,g.description AS genre_description FROM Stories s JOIN Genres g ON g.genre_id = s.genres_id WHERE g.genre_id = ?`,
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

        const [rows] = await pool.query(
            `SELECT s.urlImg, s.story_id, s.title AS story_title, s.description, u.user_id, u.username AS author_name, c.chapter_id, c.chap_number, c.title AS chapter_title, c.view_count, c.word_count, totals.total_view, totals.total_word FROM Stories s JOIN Users u ON s.author_id = u.user_id LEFT JOIN Chapters c ON s.story_id = c.story_id LEFT JOIN ( SELECT story_id, SUM(view_count) AS total_view, SUM(word_count) AS total_word FROM Chapters GROUP BY story_id ) totals ON totals.story_id = s.story_id WHERE s.story_id = ? ORDER BY c.chap_number ASC;`,
            [story_id]
        );

        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
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
                max_chap.max_chap_number AS total_chapters
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
            WHERE ur.user_id = ?
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
        WHERE sf.user_id = ?
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

