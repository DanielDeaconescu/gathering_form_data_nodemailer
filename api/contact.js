import nodemailer from "nodemailer";

export default async (req, res) => {
  // Parse JSON data
  const data = await new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(JSON.parse(body)));
  });

  const name = data["full-name"];
  const email = data.email;
  const message = data.message;

  // Send email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: "New Message",
    text: `Name: ${name} \nEmail: ${email}\n Message: ${message}`,
  });

  res.status(200).send("OK");
};
