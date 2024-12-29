const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmailhandler = async (email, subject, text) => {
  try {
    console.log("inside mail sender");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,

      auth: {
        user: "sakshithakare121@gmail.com",
        pass: "lzaa qpmj qagd kxf",
      },
      authentication: "plain",
      enable_starttls_auto: true,
    });
    console.log("sending mail", process.env.EMAIL_KEY);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

module.exports = { sendEmailhandler };
