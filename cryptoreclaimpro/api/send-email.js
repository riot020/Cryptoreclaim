import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const {
    firstName,
    lastName,
    phone,
    altPhone,
    email,
    scamType,
    investment,
    message,
  } = req.body;

  const fullName = `${firstName} ${lastName}`;

  const formattedMessage = `
New Case Submission:

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Alternate Phone: ${altPhone}
Scam Type: ${scamType}
Investment: ${investment}

Message:
${message}
  `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "bebito0923@gmail.com",
      pass: "loszhsmnmxuwnfaj",
    },
  });

  const mailOptions = {
    from: `"${fullName}" <${email}>`,
    to: "bebito0923@gmail.com", // You receive the message
    subject: "New Scam Case Submission",
    text: formattedMessage,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).send("Failed to send email.");
  }
}
