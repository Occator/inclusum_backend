const nodemailer = require("nodemailer");

const sendEmail = (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      logger: true,
      debug: true,
      auth: {
        user: "inclusum2023@gmail.com",
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;
