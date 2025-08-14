import nodemailer from "nodemailer";

export default async (req, res) => {
  // Parse form data
  const formData = await new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(new URLSearchParams(body)));
  });
  // Extract fields
  const name = formData.get("full-name");
  const email = formData.get("email");
  const message = formData.get("message");

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
