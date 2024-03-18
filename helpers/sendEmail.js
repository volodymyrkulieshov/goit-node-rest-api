import "dotenv/config";
import nodemailer from "nodemailer";


const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const sendEmail = async ({ to, subject, html }) => {
    try {
      await transport.sendMail({
        from: "vovkul@gmail.com",
        to,
        subject,
        html,
      });
    } catch (error) {
      throw error;
    }
  };
  
  export default sendEmail;

// await transport.sendMail({
//     to: email,
//     from: "vovkul@gmail.com",
//     subject: "Digital PhoneBook Verifying your email",
//     html: `To confirm you registration please click on the <a target="_blank" href="http://localhost:3000/api/auth/verify/${verifyToken}">Verify email</a>`,
//     text: `To confirm you registration please open the link http://localhost:3000/api/auth/verify/${verifyToken}`,
//   });


// export default sendEmail;