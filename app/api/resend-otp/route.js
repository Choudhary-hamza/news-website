import { NextResponse } from "next/server";
import connectDb from "@/lib/database";
import bcrypt from "bcryptjs";
import OtpModel from "@/model/otp.model";
import sendEmail from "@/lib/nodemailer";

export async function POST(request) {
  await connectDb();
  const { email } = await request.json();
  const hasEmail = await OtpModel.findOne({ email });
  if (!hasEmail) {
    return NextResponse.redirect("http://localhost:3000/signup");
  }
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 12);
  const userData = await OtpModel.findOneAndUpdate(
    { email },
    { otp: hashedOtp },
    { new: true }
  );
  try {
    await sendEmail({
      to: email,
      subject: "Your OTP for Email Verification",
      html: generateOtpEmailTemplate(otp),
    });
    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error while sending otp", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
function generateOtpEmailTemplate(otp) {
  return `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">Verify Your Email Address</h2>
        <p>Thank you for signing up! Please use the OTP below to verify your email address:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #007bff;">${otp}</div>
        <p>This OTP will expire in 2 minutes.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <br/>
        <p style="color: #555;">- The Team</p>
      </div>
    `;
}
