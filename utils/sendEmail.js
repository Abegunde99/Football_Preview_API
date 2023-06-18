const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
   service: process.env.EMAIL_SERVICE,
   host: process.env.EMAIL_HOST,
   port: 465,
   secure: true,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_PASSWORD
    }
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.MESSAGE_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
