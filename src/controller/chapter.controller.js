const pool = require("../config/config.db");

// CREATE
exports.createChapter = async (req, res) => {
    try {

        const { chapNumber, story_id, chapName, chapContent, isVip, price, chapAdsContent, countWords, isfinal } = req.body;

        const [result] = await pool.query(
            "INSERT INTO Chapters ( story_id, chap_number, title, content, is_vip, price, chap_ads_content , word_count , is_final) VALUES (?, ?, ?,?,? ,?,?,? , ?)",
            [story_id, chapNumber, chapName, chapContent, isVip, price, chapAdsContent, countWords, isfinal]
        );

        res.status(201).json({ success: true, id: result.insertId, message: "chapter created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating chapter", error: error.message });
    }
};

exports.markRead = async (req, res) => {
    const { storyId, chapNumber } = req.params
    const { user_id } = req.body
    try {
        // Ghi nhận user đọc (nếu chưa tồn tại)
        const [result] = await pool.query(
            "INSERT IGNORE INTO ChapterReads (story_id, chap_number, user_id) VALUES (?, ?, ?)",
            [storyId, chapNumber, user_id]
        )

        // Cập nhật lại read_count = số user unique đã đọc
        await pool.query(
            "UPDATE Chapters SET read_count = (SELECT COUNT(*) FROM ChapterReads WHERE story_id = ? AND chap_number = ?) WHERE story_id = ? AND chap_number = ?",
            [storyId, chapNumber, storyId, chapNumber]
        )

        res.json({
            message: "Read recorded successfully",
            story_id: storyId,
            chap_number: chapNumber,
            user_id: user_id
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
};

exports.getTopUserRead = async (req, res) => {
    let { limit } = req.query

    // Nếu client không gửi thì mặc định = 10
    limit = parseInt(limit) || 10

    try {
        const [rows] = await pool.query(
            `SELECT u.user_id, u.username, COUNT(cr.id) AS total_chapters_read
       FROM ChapterReads cr
       JOIN Users u ON cr.user_id = u.user_id
       GROUP BY cr.user_id
       ORDER BY total_chapters_read DESC
       LIMIT ?`,
            [limit]
        )

        res.json(rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.checkLastChapterWithStory = async (req, res) => {
    try {
        const { storyId } = req.params;
        const [rows] = await pool.query(
            "SELECT * FROM Chapters WHERE story_id = ? ORDER BY chap_number DESC LIMIT 1",
            [storyId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "Chưa có chương nào" });
        }
        res.json(rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
};

async function hasPurchased(userId, storyId, chapNumber) {
    const sql = `
    SELECT 1 FROM UserChapters
    WHERE user_id = ? AND story_id = ? AND chap_number = ?
    LIMIT 1
  `;
    const [rows] = await pool.execute(sql, [userId, storyId, chapNumber]);
    return rows.length > 0;
}

exports.checkChapterStoryWithIdChap = async (req, res) => {
  try {
    const { storyId, chapterId, userId } = req.params;

    // ✅ Kiểm tra xem user đã mua chapter này chưa
    const purchased = await hasPurchased(userId, storyId, chapterId);

    // ✅ Nếu đã mua → trả full content
    if (purchased) {
      const [rows] = await pool.query(
        `SELECT c.*, s.title AS story_title 
         FROM Chapters c 
         JOIN Stories s ON c.story_id = s.story_id 
         WHERE c.chap_number = ? AND c.story_id = ?`,
        [chapterId, storyId]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "Chưa có chương nào" });
      }

      return res.json({ IsPurchased: true, data: rows[0] });
    }

    // ✅ Nếu chưa mua → chỉ trả về một phần nội dung
    const [rows] = await pool.query(
      `SELECT c.*, s.title AS story_title 
       FROM Chapters c 
       JOIN Stories s ON c.story_id = s.story_id 
       WHERE c.chap_number = ? AND c.story_id = ?`,
      [chapterId, storyId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ IsPurchased: false, message: "Không tìm thấy chương" });
    }

    const content = rows[0].content;
    if (!content) {
      return res.json({ IsPurchased: false, data: "Không tìm thấy nội dung" });
    }

    // ✅ Cắt nội dung demo (1/10 độ dài)
    const previewLength = Math.floor(content.length / 10);
    rows[0].content = content.substring(0, previewLength) + " ...";

    res.json({ IsPurchased: false, data: rows[0] });

  } catch (err) {
    console.error("Lỗi checkChapterStoryWithIdChap:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
};


exports.getChapterLastestUpdate = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT c.*, s.title AS story_title
            FROM Chapters c
            JOIN Stories s ON c.story_id = s.story_id
            JOIN (
                SELECT story_id, MAX(chap_number) AS latest_chap
                FROM Chapters
                GROUP BY story_id
            ) latest
            ON c.story_id = latest.story_id
            AND c.chap_number = latest.latest_chap
            ORDER BY c.created_at DESC
            LIMIT 12;
            `,
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Chưa có chương nào" });
        }
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Lỗi server" });
    }
};

exports.unlockChapters = async (req, res) => {
  try {
    const { userId, storyId, chapters } = req.body; 
    // chapters = [1, 2, 3] (chap_number list)

    if (!userId || !storyId || !Array.isArray(chapters) || chapters.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // build values insert nhiều dòng
    const values = chapters.map(chap => [userId, storyId, chap]);

    await pool.query(
      `INSERT INTO UserChapters (user_id, story_id, chap_number) VALUES ?`,
      [values]
    );

    res.json({ message: "Chapters unlocked successfully", unlocked: chapters });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};