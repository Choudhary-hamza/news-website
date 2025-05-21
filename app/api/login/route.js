import personModel from "@/model/person.model";
import sessionModel from "@/model/session.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDb from "@/lib/database";
export async function POST(Request) {
  await connectDb();
  const { email, password } = await Request.json();
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }
  const user = await personModel.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "Invalid user or password" },
      { status: 401 }
    );
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return NextResponse.json(
      { message: "Invalid user or password" },
      { status: 401 }
    );
  }
  var session = await sessionModel.findOne({ userId: user._id });
  if (!session) {
    session = await sessionModel.create({
      userId: user._id,
    });
  }
  const sessionPayload = {
    sessionId: session._id.toString(),
    role: user.role,
  };
  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify(sessionPayload), {
    httpOnly: true,
    sameSite: "lax",
  });
  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
