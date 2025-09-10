const pool = require("../config/config.db");

// CREATE
exports.createComment = async (req, res) => {
    try {

        const { story_id, user_id, content } = req.body;

        const [result] = await pool.query(
            "INSERT INTO StoryComments (story_id, user_id , content) VALUES (?, ?, ?)",
            [story_id, user_id, content]
        );

        res.status(201).json({ success: true, id: result.insertId, message: "comment created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error comment created", error: error.message });
    }
};

exports.increaseLikeComment = async (req, res) => {
    try {

        const { comment_id } = req.body;
        
        const [result] = await pool.query(
            "UPDATE StoryComments SET `like` = `like` + 1 WHERE comment_id= ?",
            [comment_id]
        );

        res.status(201).json({ success: true, id: result.insertId, message: "increase!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error increase", error: error.message });
    }
};