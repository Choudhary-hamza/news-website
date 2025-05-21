import OtpModel from "@/model/otp.model";
import connectDb from "@/lib/database";
export default async function emailVerification(email) {
  await connectDb();
  const isValidEmail = await OtpModel.findOne({ email });
  if (!isValidEmail) {
    return false;
  }
  return true;
}
