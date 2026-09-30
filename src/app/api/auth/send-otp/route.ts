import { NextResponse } from "next/server";
import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration to 10 minutes from now
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP to the database
    await db.insert(verificationTokens).values({
      identifier: email,
      token: otp,
      expires,
    });

    // In a real application, you'd send an email here using your provider.
    // For local development without SMTP, we'll just log it.
    if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
      const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Your Valence Sign In Code",
        text: `Your sign in code is: ${otp}`,
        html: `<p>Your sign in code is: <strong>${otp}</strong></p>`,
      });
    } else {
      console.log(`[DEV MODE] OTP for ${email} is: ${otp}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
