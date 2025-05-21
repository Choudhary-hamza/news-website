import bcrypt from "bcryptjs";
import OtpModel from "@/model/otp.model";
import personModel from "@/model/person.model";
import sendEmail from "@/lib/nodemailer";
import connectDb from "@/lib/database"; // Import the database connection
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDb(); // Ensure the database is connected

  const { email, name, password, role } = await request.json();

  try {
    const alreadyExisted = await personModel.findOne({ email });
    if (alreadyExisted) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 12);
    const temporaryData = await OtpModel.create({
      email,
      name,
      password,
      role,
      otp: hashedOtp,
    });
    if (temporaryData) {
      await sendEmail({
        to: email,
        subject: "Your OTP for Email Verification",
        html: generateOtpEmailTemplate(otp),
      });
      return NextResponse.json(
        { message: "OTP sent successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed please try again" },
        { status: 500 }
      );
    }
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
