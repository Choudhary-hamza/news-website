import { NextResponse } from "next/server";
import connectDb from "@/lib/database";
import OtpModel from "@/model/otp.model";
export async function POST(Request) {
  try {
    const { email } = await Request.json();
    await connectDb();
    const exists = await OtpModel.findOne({ email });
    return NextResponse.json({ valid: !!exists });
  } catch (error) {
    console.error("DB check failed", error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
