const pool = require("../config/config.db");

// CREATE
exports.createChapter = async (req, res) => {
    try {

        const { chapNumber, story_id, chapName, chapContent, isVip, price, chapAdsContent, countWords } = req.body;

        const [result] = await pool.query(
            "INSERT INTO Chapters ( story_id, chap_number, title, content, is_vip, price, chap_ads_content , word_count) VALUES (?, ?, ?,?,? ,?,?,?)",
            [story_id, chapNumber, chapName, chapContent, isVip, price, chapAdsContent, countWords]
        );

        res.status(201).json({ success: true, id: result.insertId, message: "chapter created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error creating chapter", error: error.message });
    }
};

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



exports.checkChapterStoryWithIdChap = async (req, res) => {
    try {

        const { storyId, chapterId } = req.params;
        const [rows] = await pool.query(
            `SELECT c.*,  s.title AS story_title FROM Chapters c JOIN Stories s ON c.story_id = s.story_id WHERE c.chap_number = ? AND c.story_id = ?`,
            [chapterId, storyId]
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
            LIMIT 10;
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
