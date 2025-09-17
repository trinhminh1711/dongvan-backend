const pool = require("../config/config.db");

// CREATE
exports.createPost = async (req, res) => {
    try {
        const { user_id, title, content, topic_id } = req.body;
        const [result] = await pool.query(
            `INSERT INTO ForumPosts (user_id, title, content, topic_id) VALUES (?,?,?,?)`, [user_id, title, content, topic_id]
        );

        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
},
    exports.getPost = async (req, res) => {
        try {
            const [result] = await pool.query(
                `SELECT 
                    p.*,
                    u.username,
                    u.link_thumbnail,
                    IFNULL(l.total_likes, 0) AS total_likes,
                    IFNULL(c.total_comments, 0) AS total_comments,
                    t.title AS topic_title
                FROM ForumPosts p
                LEFT JOIN Users u ON p.user_id = u.user_id
                LEFT JOIN (
                    SELECT post_id, COUNT(*) AS total_likes
                    FROM ForumLikes
                    GROUP BY post_id
                ) l ON p.post_id = l.post_id
                LEFT JOIN (
                    SELECT post_id, COUNT(*) AS total_comments
                    FROM ForumComments
                    GROUP BY post_id
                ) c ON p.post_id = c.post_id
                LEFT JOIN TopicCategory t ON p.topic_id = t.topic_id;`,
            );

            res.status(201).json({ success: true, data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    exports.getListPostForum = async (req, res) => {
        try {

            const { TopicId } = req.params
            const [result] = await pool.query(
                `SELECT 
                p.*,
                u.username,
                u.link_thumbnail,
                t.title AS topic_title,
                (SELECT COUNT(*) FROM ForumComments c WHERE c.post_id = p.post_id) AS total_comments,
                (SELECT COUNT(*) FROM ForumLikes l WHERE l.post_id = p.post_id) AS total_likes,
                (
                    SELECT JSON_OBJECT(
                        'comment_id', fc.comment_id,
                        'content', fc.content,
                        'created_at', fc.created_at,
                        'username', u2.username,
                        'user_id',u2.user_id,
                        'link_thumbnail', u2.link_thumbnail
                    )
                            FROM ForumComments fc
                            JOIN Users u2 ON fc.user_id = u2.user_id
                            WHERE fc.post_id = p.post_id
                            ORDER BY fc.created_at DESC
                            LIMIT 1
                        ) AS latest_comment
                    FROM ForumPosts p
                    LEFT JOIN Users u ON p.user_id = u.user_id
                    LEFT JOIN TopicCategory t ON p.topic_id = t.topic_id
                    WHERE p.topic_id = ?
                    ORDER BY p.created_at DESC;`,
                [TopicId]
            );

            res.status(201).json({ success: true, data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        }
    };



exports.getPostDetailById = async (req, res) => {
    try {

        const { id } = req.params


        const [result] = await pool.query(
            `SELECT 
            p.*,
            up.username AS post_username,
            up.link_thumbnail AS post_link_thumbnail,
            IFNULL(lp.total_likes, 0) AS post_total_likes,
            c.comment_id,
            c.user_id AS comment_user_id,
            c.content AS comment_content,
            c.created_at AS comment_created_at,
            c.total_likes AS comment_total_likes,
            uc.username AS comment_username,
            uc.link_thumbnail AS comment_link_thumbnail
        FROM ForumPosts p
        LEFT JOIN Users up ON p.user_id = up.user_id       -- user của post
        LEFT JOIN (
            SELECT post_id, COUNT(DISTINCT like_id) AS total_likes
            FROM ForumLikes
            GROUP BY post_id
        ) lp ON p.post_id = lp.post_id
        LEFT JOIN ForumComments c ON p.post_id = c.post_id
        LEFT JOIN Users uc ON c.user_id = uc.user_id       -- user của comment
        WHERE p.post_id = ?
        ORDER BY c.created_at ASC;
            `,
            [id]
        );

        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.createCommentPost = async (req, res) => {
    try {

        const { post_id, user_id, content } = req.body;

        const [result] = await pool.query(
            "INSERT INTO ForumComments ( post_id, user_id , content) VALUES (?, ?, ?)",
            [post_id, user_id, content]
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
            "UPDATE ForumComments SET `total_likes` = `total_likes` + 1 WHERE comment_id= ?",
            [comment_id]
        );

        res.status(201).json({ success: true, id: result.insertId, message: "increase!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error increase", error: error.message });
    }
};