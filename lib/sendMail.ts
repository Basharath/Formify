import nodemailer from 'nodemailer';

const sendMail = (to: string, html: string) => {
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
    // text: 'this is some text',
    html,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) console.log('Something went wrong', err);
    else console.log('Success', info);
  });
};

export default sendMail;
