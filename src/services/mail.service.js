const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// Hàm gửi mail chung
const sendMail = async ({ to, subject, html }) => {
    return await transporter.sendMail({
        from: `"Website Đông Văn" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
    });
};

// Template cho yêu cầu hỗ trợ
const supportRequestTemplate = ({ name, email, title, issue, description, fileUrl }) => `
  <div style="font-family:Arial,sans-serif;padding:20px;border:1px solid #eee;border-radius:8px;background:#f9f9f9;">
    <h2 style="color:#007bff;">📩 Yêu cầu hỗ trợ mới</h2>
    <p><b>Người gửi:</b> ${name} (${email})</p>
    <p><b>Tiêu đề:</b> ${title}</p>
    <p><b>Loại vấn đề:</b> ${issue}</p>
    <p><b>Mô tả:</b><br/>${description}</p>
    ${fileUrl ? `<p><b>Tệp đính kèm:</b> <a href="${fileUrl}" target="_blank">Xem tệp</a></p>` : ""}
    <hr/>
    <small>Email này được gửi tự động từ hệ thống.</small>
  </div>
`;
const formatDate = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes} ${day}-${month}-${year}`;
};

const rechargeRequestTemplate = ( userId, amount, coin , date  = new Date() ) =>
`
  <div style="max-width:600px;margin:0 auto;padding:20px;
              font-family:Arial,sans-serif;border:1px solid #eee;
              border-radius:8px;background:#f9f9f9;">
    <div style="text-align:center;border-bottom:1px solid #ddd;padding-bottom:15px;">
      <img src="https://res.cloudinary.com/djr4f7ceu/image/upload/v1759043930/logo-BXFcQiJj_ksj3ve.png" 
           alt="Logo" style="height:50px;">
      <h2 style="color:#28a745;">Thanh toán thành công!</h2>
    </div>
    <div style="padding:20px;">
      <p>[User${userId}] vừa thực hiện giao dịch nạp tang diệp</p>
      <table style="width:100%;border-collapse:collapse;margin-top:15px;">
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Mã đơn hàng</td>
          <td style="padding:8px;border:1px solid #ddd;"><b>DH12345</b></td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Ngày thanh toán</td>
          <td style="padding:8px;border:1px solid #ddd;">${formatDate(date)}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Số tiền</td>
          <td style="padding:8px;border:1px solid #ddd;color:#28a745;"><b>${amount} VND</b></td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Số tang diệp</td>
          <td style="padding:8px;border:1px solid #ddd;">${coin}</td>
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid #ddd;">Phương thức thanh toán</td>
          <td style="padding:8px;border:1px solid #ddd;">Chuyển khoản</td>
        </tr>
      </table>
      <p style="margin-top:20px;text-align:center;">
        <a href="http://dongvan.net/payment-approval" 
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

module.exports = { sendMail, supportRequestTemplate, rechargeRequestTemplate };
