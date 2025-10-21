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
                LEFT JOIN TopicCategory t ON p.topic_id = t.topic_id
                WHERE p.status = 'published'`,
            );

            res.status(201).json({ success: true, data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        }
    },
    exports.getListPostForum = async (req, res) => {
        try {
            const topicId = parseInt(req.params.TopicId);
            const limit = parseInt(req.query.limit) || 10;     // mặc định 10 bản ghi
            const page = parseInt(req.query.page) || 1;        // mặc định trang 1
            const offset = (page - 1) * limit;
            const [[{ total }]] = await pool.query(
                "SELECT COUNT(*) AS total FROM ForumPosts WHERE topic_id = ?",
                [topicId]
            );
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
                    WHERE p.topic_id = ? AND p.status = 'published'
                    ORDER BY p.created_at DESC
                    LIMIT ? OFFSET ?;`,
                [topicId, limit, offset]
            );

            res.status(201).json({ success: true, data: result, totalPage: total });
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
        const { comment_id, user_id } = req.body;

        if (!comment_id || !user_id) {
            return res.status(400).json({ error: "Thiếu comment_id hoặc user_id" });
        }

        // Kiểm tra user đã like chưa
        const [rows] = await pool.query(
            `SELECT like_id FROM ForumCommentLikes WHERE comment_id = ? AND user_id = ?`,
            [comment_id, user_id]
        );

        if (rows.length > 0) {
            // Nếu đã like -> bỏ like
            await pool.query(
                `DELETE FROM ForumCommentLikes WHERE comment_id = ? AND user_id = ?`,
                [comment_id, user_id]
            );
            return res.json({ message: "Unliked", isLiked: false });
        } else {
            // Nếu chưa like -> thêm like
            await pool.query(
                `INSERT INTO ForumCommentLikes (comment_id, user_id) VALUES (?, ?)`,
                [comment_id, user_id]
            );
            return res.json({ message: "Liked", isLiked: true });
        }
    } catch (err) {
        console.error("Error toggleCommentLike:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getCommentLikes = async (req, res) => {
    try {
        const { commentId } = req.params;

        // ===== 1️⃣ Lấy tổng like + user đã like comment gốc =====
        const [[{ total_likes }]] = await pool.query(
            `SELECT COUNT(*) AS total_likes 
     FROM ForumCommentLikes 
     WHERE comment_id = ?`,
            [commentId]
        );

        const [liked_users] = await pool.query(
            `SELECT u.user_id, u.username, u.link_thumbnail, fcl.created_at AS liked_at
     FROM ForumCommentLikes fcl
     JOIN Users u ON fcl.user_id = u.user_id
     WHERE fcl.comment_id = ?
     ORDER BY fcl.created_at DESC`,
            [commentId]
        );

        // ===== 2️⃣ Lấy danh sách reply (có total_likes luôn) =====
        const [replies] = await pool.query(
            `SELECT 
       r.reply_id,
       r.comment_id,
       r.user_id,
       r.content,
       r.created_at,
       r.total_likes,       -- ✅ lấy trực tiếp từ bảng
       u.username,
       u.link_thumbnail
     FROM ForumCommentReplies r
     JOIN Users u ON r.user_id = u.user_id
     WHERE r.comment_id = ?
     ORDER BY r.created_at ASC`,
            [commentId]
        );

        // ===== 3️⃣ Trả về kết quả =====
        res.json({
            comment_id: commentId,
            total_likes,
            liked_users,
            replies,
        });
    } catch (err) {
        console.error("Error getCommentWithRepliesLikes:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }

};
exports.getNumberPostForm = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT 
                t.topic_id,
                t.title AS topic_title,
                COUNT(p.post_id) AS total_posts
            FROM TopicCategory t
            LEFT JOIN ForumPosts p ON t.topic_id = p.topic_id
            GROUP BY t.topic_id, t.title
            ORDER BY total_posts DESC;`,
        );

        res.status(201).json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error increase", error: error.message });
    }
};

exports.toggleLikePost = async (req, res) => {
    try {
        const { user_id, post_id } = req.body;

        if (!user_id || !post_id) {
            return res.status(400).json({ success: false, message: "Missing user_id or post_id" });
        }

        // Kiểm tra đã like chưa
        const [exist] = await pool.query(
            "SELECT like_id FROM ForumLikes WHERE user_id = ? AND post_id = ?",
            [user_id, post_id]
        );

        if (exist.length > 0) {
            // Nếu đã like => bỏ like
            await pool.query("DELETE FROM ForumLikes WHERE like_id = ?", [exist[0].like_id]);
            return res.json({ success: true, liked: false, message: "Unliked post successfully" });
        }

        // Nếu chưa like => thêm like mới
        await pool.query(
            "INSERT INTO ForumLikes (user_id, post_id, created_at) VALUES (?, ?, NOW())",
            [user_id, post_id]
        );

        return res.json({ success: true, liked: true, message: "Liked post successfully" });
    } catch (error) {
        console.error("Error in toggleLikePost:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getUsersLikedPost = async (req, res) => {
    try {
        const { postId } = req.params;

        // Lấy danh sách user đã like
        const [likedUsers] = await pool.query(
            `
      SELECT 
        u.user_id,
        u.username,
        u.link_thumbnail,
        fl.created_at AS liked_at
      FROM ForumLikes fl
      JOIN Users u ON fl.user_id = u.user_id
      WHERE fl.post_id = ?
      ORDER BY fl.created_at DESC
      `,
            [postId]
        );

        // Lấy tổng số like (cách 1: đếm nhanh)
        const [countResult] = await pool.query(
            `SELECT COUNT(*) AS total_likes FROM ForumLikes WHERE post_id = ?`,
            [postId]
        );

        const totalLikes = countResult[0]?.total_likes || 0;

        res.status(200).json({
            post_id: postId,
            total_likes: totalLikes,
            liked_users: likedUsers,
        });
    } catch (error) {
        console.error("Error fetching liked users:", error);
        res.status(500).json({ message: "Lỗi server khi lấy danh sách user like" });
    }
};

exports.createReply = async (req, res) => {
    try {
        const { comment_id, user_id, content } = req.body;

        if (!comment_id || !user_id || !content)
            return res.status(400).json({ error: "Thiếu dữ liệu cần thiết" });

        // Kiểm tra comment cha có tồn tại không
        const [exists] = await pool.query(
            `SELECT comment_id FROM ForumComments WHERE comment_id = ?`,
            [comment_id]
        );
        if (!exists.length)
            return res.status(404).json({ error: "Comment cha không tồn tại" });

        const [result] = await pool.query(
            `INSERT INTO ForumCommentReplies (comment_id, user_id, content)
       VALUES (?, ?, ?)`,
            [comment_id, user_id, content]
        );

        res.json({
            message: "Thêm reply thành công",
            reply_id: result.insertId,
            success: true
        });
    } catch (err) {
        console.error("Error createReply:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllPostAdmin = async (req, res) => {
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
                LEFT JOIN TopicCategory t ON p.topic_id = t.topic_id`,
        );

        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }

}
exports.updatePostStatus = async (req, res) => {
    try {
        const { postId } = req.params; // /posts/:postId/status
        const { status } = req.body;   // { status: 'published' }

        if (!status) {
            return res.status(400).json({ message: "Thiếu trạng thái cần cập nhật" });
        }

        const [result] = await pool.query(
            "UPDATE ForumPosts SET status = ? WHERE post_id = ?",
            [status, postId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài viết" });
        }

        res.json({ message: "Cập nhật trạng thái thành công", postId, status, success: true });
    } catch (error) {
        console.error("Lỗi khi cập nhật status:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};