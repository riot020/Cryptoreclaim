import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "bebito0923@gmail.com", // Use environment variables in Vercel
      pass: "loszhsmnmxuwnfaj",
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "bebito0923@gmail.com", // Or another inbox to receive messages
    subject: "New Form Submission",
    text: `From: ${name} <${email}>\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
}

GMAIL_USER=
GMAIL_PASS=
