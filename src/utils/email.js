// src/utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (to, name, verificationLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verifica tu cuenta - TP Final',
    html: `
      <h2>¡Hola ${name}!</h2>
      <p>Gracias por registrarte. Por favor, haz clic en el enlace para verificar tu cuenta:</p>
      <a href="${verificationLink}" target="_blank">Verificar mi cuenta</a>
      <p>Si no te registraste, ignora este mensaje.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };