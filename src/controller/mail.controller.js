// controllers/mail.controller.js
const nodemailer = require("nodemailer");
const { uploadToCloudinary } = require("../helpers/upload");
const pool = require("../config/config.db");
const { sendMail, supportRequestTemplate, rechargeRequestTemplate } = require("../services/mail.service");
exports.sendMail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    // Tạo transporter
    let transporter = nodemailer.createTransport({
      service: "gmail", // hoặc smtp khác
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let htmlContent = `
  <div style="max-width:600px;margin:0 auto;padding:20px;
              font-family:Arial,sans-serif;border:1px solid #eee;
              border-radius:8px;background:#f9f9f9;">
    <div style="text-align:center;border-bottom:1px solid #ddd;padding-bottom:15px;">
      <img src="https://res.cloudinary.com/djr4f7ceu/image/upload/v1759043930/logo-BXFcQiJj_ksj3ve.png" 
           alt="Logo" style="height:50px;">
      <h2 style="color:#28a745;">Thanh toán thành công!</h2>
    </div>
    <div style="padding:20px;">
      <p>User102562 vừa thực hiện giao dịch nạp tang diệp</p>
      <table style="width:100%;border-collapse:collapse;margin-top:15px;">
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Mã đơn hàng</td>
          <td style="padding:8px;border:1px solid #ddd;"><b>DH12345</b></td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Ngày thanh toán</td>
          <td style="padding:8px;border:1px solid #ddd;">28-09-2025</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Số tiền</td>
          <td style="padding:8px;border:1px solid #ddd;color:#28a745;"><b>100,000 VND</b></td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Số tang diệp</td>
          <td style="padding:8px;border:1px solid #ddd;">1.1000</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Phương thức thanh toán</td>
          <td style="padding:8px;border:1px solid #ddd;">Chuyển khoản Techcombank</td>
        </tr>
      </table>
      <p style="margin-top:20px;text-align:center;">
        <a href="http://localhost:5173/orders/DH12345" 
           style="padding:12px 25px;background:#28a745;color:#fff;
                  text-decoration:none;border-radius:6px;font-size:16px;">
          Xác nhận đơn hàng để duyệt tang diệp
        </a>
      </p>
    </div>
    <div style="text-align:center;color:#999;font-size:12px;border-top:1px solid #ddd;padding-top:10px;">
      Đây là email tự động, vui lòng không trả lời.
    </div>
  </div>
    `;

    // Gửi mail
    let info = await transporter.sendMail({
      from: `"Website Đông Văn" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html: htmlContent,
    });

    res.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.supportRequest = async (req, res) => {
  try {
    const { name, email, title, issue, description } = req.body;

    if (!name || !email || !title || !issue || !description) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let fileUrl = null;
    if (req.file) {
      fileUrl = await uploadToCloudinary(req.file.buffer, "support_files");
    }

    const [result] = await pool.query(
      `INSERT INTO SupportRequests (name, email, title, issue, description, file_url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, title, issue, description, fileUrl]
    );
    const html = supportRequestTemplate({ name, email, title, issue, description, fileUrl });

    await sendMail({
      to: ["minhdeptrai1711@gmail.com","mvhdongminhtanvan@gmail.com"], // gửi cho admin, // gửi cho admin
      subject: `Yêu cầu hỗ trợ mới từ ${name}`,
      html,
    });

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: "Support request created",
      file: fileUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
exports.getSupportRequest = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM SupportRequests ORDER BY created_at DESC");
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
exports.createRequest = async (req, res) => {
  try {
    const { user_id, amount, coin } = req.body;
    console.log(req.body);

    if (!user_id || !amount || !coin) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const [result] = await pool.query(
      `INSERT INTO RequestsTransactions (user_id, amount, coin) 
       VALUES (?, ?, ?)`,
      [user_id, amount, coin]
    );
    const now = new Date();
    const { formatted } = now.getHours().toString().padStart(2, "0") + ":" +
      now.getMinutes().toString().padStart(2, "0") + " " +
      now.getDate().toString().padStart(2, "0") + "-" +
      (now.getMonth() + 1).toString().padStart(2, "0") + "-" +
      now.getFullYear();
    const html = rechargeRequestTemplate(user_id, amount, coin)
    await sendMail({
      to: ["minhdeptrai1711@gmail.com","mvhdongminhtanvan@gmail.com"], // gửi cho admin
      subject: `Yêu cầu duyệt giao dịch`,
      html,
    });

    res.status(201).json({
      success: true,
      message: "Yêu cầu nạp coin đã được tạo, chờ duyệt",
      request_id: result.insertId,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
exports.getPaymentRequest = async (req, res) => {
  try {
    let { page = 1, startDate, endDate } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    // base query
    let query = `SELECT * FROM RequestsTransactions WHERE 1=1`;
    let params = [];

    // filter theo ngày
    if (startDate) {
      query += " AND created_att >= ?";
      params.push(startDate + " 00:00:00");
    }
    if (endDate) {
      query += " AND created_at <= ?";
      params.push(endDate + " 23:59:59");
    }

    // sort + phân trang
    query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);

    // lấy tổng bản ghi cho pagination
    let countQuery = `SELECT COUNT(*) as total FROM RequestsTransactions WHERE 1=1`;
    let countParams = [];
    if (startDate) {
      countQuery += " AND created_at >= ?";
      countParams.push(startDate + " 00:00:00");
    }
    if (endDate) {
      countQuery += " AND created_at <= ?";
      countParams.push(endDate + " 23:59:59");
    }
    const [countResult] = await pool.query(countQuery, countParams);
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      page: Number(page),
      total,
      totalPages,
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
exports.approveTrantion = async (req, res) => {
  try {
    const { id } = req.params;

    // Lấy giao dịch
    const [rows] = await pool.query(
      "SELECT user_id, coin, is_duyet FROM RequestsTransactions WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    const transaction = rows[0];

    if (transaction.is_duyet === 1) {
      return res.status(400).json({ success: false, message: "Transaction already approved" });
    }

    // Update trạng thái giao dịch
    await pool.query(
      "UPDATE RequestsTransactions SET is_duyet = 1 WHERE id = ?",
      [id]
    );

    // Cộng coin vào user
    await pool.query(
      "UPDATE Users SET coin_balance = coin_balance + ? WHERE user_id = ?",
      [transaction.coin, transaction.user_id]
    );

    res.json({ success: true, message: "Transaction approved and coins added" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}