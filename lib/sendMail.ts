import nodemailer from 'nodemailer';

const sendMail = async (to: string, html: string) => {
  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Formify <${process.env.EMAIL_ID}>`,
    to,
    subject: 'New submission using Formify',
    html,
  };
  return smtpTransport.sendMail(mailOptions);
};

export default sendMail;
