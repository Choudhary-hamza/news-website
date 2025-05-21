const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = ({ to, subject, html }) => {
  return transporter.sendMail({
    to: to,
    subject: subject,
    html: html,
  });
};

export default sendEmail;
