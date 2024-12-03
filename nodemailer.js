const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  port: 465,
  auth: {
    user: 'santiagoscar2@gmail.com',
    pass: 'pmmp lekp dxnj gvdg'
  }
});

async function mail() {
  const info = await transporter.sendMail({
    from: 'santiagoscar2@gmail.com', // sender address
    to: "santiagomonsalve7030@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello Santi?", // plain text body
    html: "<b>Hello santi</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

mail().catch(console.error);
