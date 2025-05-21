"use client";
import { useState, useEffect, useRef } from "react";
import style from "./otp.module.css";
import { useSearchParams } from "next/navigation";
import NotFound from "@/app/404";
import { useRouter } from "next/navigation";

export default function OTPVerification() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const email = searchParam.get("email");

  const [isValid, setIsValid] = useState(null);
  const [timer, setTimer] = useState(120);
  const [isExpired, setIsExpired] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // ✅ Check email query param and validate it
  useEffect(() => {
    if (!email) return setIsValid(false);

    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/email-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        setIsValid(data.valid);
      } catch (error) {
        setIsValid(false);
      }
    };

    verifyEmail();
  }, [email]);

  // ✅ Timer Countdown Logic
  useEffect(() => {
    let interval = null;
    if (timer > 0 && !isExpired) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsExpired(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, isExpired]);

  // ✅ OTP Change Handler
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value) || isExpired) return;

    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ✅ Keyboard Navigation (Backspace)
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ✅ Resend OTP Handler
  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      await fetch("/api/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setTimer(120);
      setIsExpired(false);
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    } finally {
      setIsResending(false);
    }
  };

  // ✅ Format Timer
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ✅ Verify OTP Code
  const verifyCode = async () => {
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      alert("Please enter the full 6-digit code.");
      return;
    }

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.status === 201) {
        router.push("/");
      } else {
        const data = await res.json();
        alert(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  // ✅ Conditional Rendering
  if (isValid === false) return <NotFound />;
  if (isValid === null) return <div>Checking email…</div>;

  return (
    <div className={style.otp_container}>
      <div className={style.otp_card}>
        <div className={style.otp_header}>
          <h1>Email Verification</h1>
          <p className={style.email_info}>
            We've sent a code to <span>{email}</span>
          </p>
        </div>

        <div className={style.timer_container}>
          {!isExpired ? (
            <p>
              Code expires in{" "}
              <span className={style.timer}>{formatTime(timer)}</span>
            </p>
          ) : (
            <p className={style.expired_message}>
              Code expired. Please request a new one.
            </p>
          )}
        </div>

        <div className={style.otp_inputs}>
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isExpired}
              autoFocus={index === 0}
              className={isExpired ? style.disabled : ""}
            />
          ))}
        </div>

        <div className={style.actions}>
          {isExpired ? (
            <button
              className={style.resend_button}
              onClick={handleResendOTP}
              disabled={isResending}
            >
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          ) : (
            <button className={style.verify_button} onClick={verifyCode}>
              Verify Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
