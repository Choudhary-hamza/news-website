import connectDb from "@/lib/database";
import OtpModel from "@/model/otp.model";
import personModel from "@/model/person.model";
import sessionModel from "@/model/session.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDb();

    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }
    const alreadyExisted = await personModel.findOne({ email });
    if (alreadyExisted) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const otpRecord = await OtpModel.findOne({ email });
    if (!otpRecord) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    const isValidOtp = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValidOtp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
    }
    const hashedPassword = await bcrypt.hash(otpRecord.password, 11);
    const user = await personModel.create({
      name: otpRecord.name,
      email: otpRecord.email,
      password: hashedPassword,
      role: otpRecord.role,
    });
    const session = await sessionModel.create({ userId: user._id });
    const sessionPayload = {
      sessionId: session._id.toString(),
      role: user.role,
    };
    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(sessionPayload), {
      httpOnly: true,
      sameSite: "lax",
    });
    await OtpModel.deleteOne({ email: user.email });
    return NextResponse.json(
      { message: "User Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /register error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
