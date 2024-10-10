import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email, subject, message } = await req.json();

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: "mlbbcc1410@gmail.com", // Sender address
      to: email, // List of recipients
      subject: subject,
      html: `
        <h1>${subject}</h1>
        <p>Thank you for contacting us!</p>
        <p>New message submitted:</p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email." });
  }
}
