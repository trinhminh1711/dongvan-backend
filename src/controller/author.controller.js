const pool = require("../config/config.db");
exports.voteStory = async (req, res) => {

    const { userId, storyId, coins } = req.body;

    if (!userId || !storyId || !coins || isNaN(coins) || coins <= 0) {
        return res.status(400).json({ message: "Invalid parameters" });
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // 1) Lấy user và kiểm tra coin_balance
        const [userRows] = await conn.query(
            "SELECT coin_balance FROM Users WHERE user_id = ? FOR UPDATE",
            [userId]
        ); // FOR UPDATE lock row
        if (!userRows || userRows.length === 0) {
            await conn.rollback();
            return res.status(404).json({ message: "User not found" });
        }
        const user = userRows[0];
        const remainingAfter = user.coin_balance - coins;
        if (remainingAfter < 0) {
            await conn.rollback();
            return res.status(400).json({ message: "Not enough coins" });
        }

        // 2) Trừ coin
        await conn.query(
            "UPDATE Users SET coin_balance = coin_balance - ? WHERE user_id = ?",
            [coins, userId]
        );

        // 3) Insert or update StoryRecommendations
        // Assumes UNIQUE KEY(user_id, story_id) exists.
        // If exists, cộng thêm coins_spent; nếu chưa thì insert mới.
        await conn.query(
            `INSERT INTO StoryRecommendations (user_id, story_id, coins_spent, created_at)
       VALUES (?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE
         coins_spent = coins_spent + VALUES(coins_spent),
         created_at = VALUES(created_at)`,
            [userId, storyId, coins]
        );

        // 4) Lấy tổng coins đã được đề cử cho story (tổng tất cả users)
        const [aggRows] = await conn.query(
            "SELECT COALESCE(SUM(coins_spent), 0) AS story_total_coins FROM StoryRecommendations WHERE story_id = ?",
            [storyId]
        );
        const story_total_coins = aggRows[0]?.story_total_coins ?? 0;

        // 5) Lấy remaining_balance mới của user
        const [newUserRows] = await conn.query(
            "SELECT coin_balance FROM Users WHERE user_id = ?",
            [userId]
        );
        const remaining_balance = newUserRows[0]?.coin_balance ?? remainingAfter;

        await conn.commit();

        return res.status(201).json({
            message: "Vote (recommendation) successful",
            spent: Number(coins),
            remaining_balance,
            story_total_coins
        });
    } catch (err) {
        await conn.rollback();
        console.error("voteStory error:", err);
        return res.status(500).json({ message: "Server error" });
    } finally {
        conn.release();
    }
};

exports.getStoryVoted = async (req, res) => {
    const { storyId, userId } = req.params;

    try {
        // Tổng số coins tất cả user đã vote cho story
        const [totalVotes] = await pool.query(
            `SELECT COALESCE(coins_spent, 0) AS user_votes
        FROM StoryRecommendations
        WHERE story_id = ? 
        AND user_id = ?;
        `,
            [storyId, userId]
        );

        res.json({
            story_id: storyId,
            total_votes: totalVotes[0]?.user_votes,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi lấy dữ liệu vote" });
    }
};
exports.rateStory = async (req, res) => {
    try {
        const { storyId } = req.params;
        const { userId, rating, comment } = req.body;

        if (!userId || !rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Invalid data" });
        }

        await pool.query(
            `INSERT INTO StoryRatings (user_id, story_id, rating, comment, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
            [userId, storyId, rating, comment || null]
        );

        res.status(201).json({ success: true, message: "Rating saved successfully" });
    } catch (err) {
        console.error("❌ Error rating story:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getStoryRate = async (req, res) => {
    try {
        const { storyId } = req.params;

        // Lấy danh sách chi tiết từng đánh giá
        const [rows] = await pool.query(
            `SELECT 
      sr.id,
      sr.rating, 
      sr.comment, 
      sr.created_at, 
      u.username,
      u.link_thumbnail
   FROM StoryRatings sr
   JOIN Users u ON sr.user_id = u.user_id
   WHERE sr.story_id = ?
   ORDER BY sr.created_at DESC`,
            [storyId]
        );

        // Lấy điểm trung bình & tổng lượt đánh giá
        const [[summary]] = await pool.query(
            `SELECT 
          ROUND(AVG(rating), 1) AS average_rating,
          COUNT(*) AS total_reviews
       FROM StoryRatings
       WHERE story_id = ?`,
            [storyId]
        );

        res.json({
            success: true,
            average_rating: summary.average_rating || 0,
            total_reviews: summary.total_reviews || 0,
            data: rows,
        });
    } catch (err) {
        console.error("❌ Lỗi khi lấy đánh giá truyện:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.giveSupport = async (req, res) => {
    try {

        const { from_user_id, to_user_id, coins, message } = req.body;

        if (!from_user_id || !to_user_id || !coins) {
            return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" });
        }


        // Trừ coin người tặng trước
        const [user] = await pool.query(
            "SELECT coin_balance FROM Users WHERE user_id = ?",
            [from_user_id]
        );

        if (!user.length) {
            return res.status(404).json({ message: "Người tặng không tồn tại" });
        }

        if (user[0].coin_balance < coins) {
            return res.status(400).json({ message: "Số Tang Diệp không đủ" });
        }

        // Transaction
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // Trừ coin của người tặng
            await conn.query(
                "UPDATE Users SET coin_balance = coin_balance - ? WHERE user_id = ?",
                [coins, from_user_id]
            );

            // Cộng coin cho người nhận
            await conn.query(
                "UPDATE Users SET coin_balance = coin_balance + ? WHERE user_id = ?",
                [coins, to_user_id]
            );

            // Ghi lại lịch sử ủng hộ
            await conn.query(
                "INSERT INTO UserGift (sender_id, receiver_id, coins, message) VALUES (?, ?, ?, ?)",
                [from_user_id, to_user_id, coins, message || null]
            );
            await conn.query(
                `INSERT INTO TransactionHistory 
     (user_id, type, amount, direction, status, description) 
   VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    from_user_id,
                    "SUPPORT",
                    coins,
                    "OUT",                     // trừ coin
                    "Thành công",
                    `Ủng hộ ${coins} coin cho user_id ${to_user_id}${message ? " - " + message : ""}`
                ]
            );

            // Ghi cho người nhận
            await conn.query(
                `INSERT INTO TransactionHistory 
     (user_id, type, amount, direction, status, description) 
   VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    to_user_id,
                    "SUPPORT",
                    coins,
                    "IN",                      // cộng coin
                    "Thành công",
                    `Nhận ${coins} coin từ user_id ${from_user_id}${message ? " - " + message : ""}`
                ]
            );
            await conn.commit();

            res.status(201).json({
                message: "Ủng hộ thành công",
                from_user_id,
                to_user_id,
                coins,
                note: message || "",
            });
        } catch (err) {
            await conn.rollback();
            console.error("Transaction error:", err);
            res.status(500).json({ message: "Lỗi server khi ủng hộ" });
        } finally {
            conn.release();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};

exports.getUserTransactions = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { start_date, end_date } = req.query; // nhận query param từ frontend

        if (!user_id) {
            return res.status(400).json({ message: "Thiếu user_id" });
        }

        let sql = `
    SELECT id, type, amount, direction, status, description, created_at
    FROM TransactionHistory
    WHERE user_id = ?
  `;
        const params = [user_id];

        // Nếu có start_date và end_date, thêm điều kiện lọc
        if (start_date && end_date) {
            sql += ` AND created_at BETWEEN ? AND ?`;
            params.push(start_date, end_date);
        }

        sql += ` ORDER BY created_at DESC`;

        const [transactions] = await pool.query(sql, params);

        res.status(200).json({
            user_id,
            transactions
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server khi lấy lịch sử giao dịch" });
    }
};
