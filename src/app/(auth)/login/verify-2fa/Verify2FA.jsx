"use client";
import { useState, useEffect } from "react";
import { Form, Input, Button, Alert } from "antd";
import {
  SafetyCertificateOutlined,
  MailOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";

const Verify2FA = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [codeSent, setCodeSent] = useState(false);

  const tempToken = searchParams.get("tempToken");

  useEffect(() => {
    if (!tempToken) {
      router.push("/login");
      return;
    }

    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [tempToken]);

  const onFinish = async (values) => {
    setLoading(true);
    setError("");

    try {
      console.log("Verifying 2FA code:", values);

      // Simulate API verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo, accept any 6-digit code
      if (values.code.length === 6) {
        navigate("/dashboard");
      } else {
        throw new Error("Invalid code");
      }
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = () => {
    setCodeSent(true);
    setTimeLeft(300); // Reset to 5 minutes
    setError("");

    // Show success message
    setTimeout(() => {
      setCodeSent(false);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!tempToken) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="verify2fa-form-section">
      <div className="verify2fa-form-wrapper">
        <div className="verify2fa-header">
          <div className="verify2fa-icon-wrapper">
            <SafetyCertificateOutlined className="verify2fa-icon" />
          </div>
          <h1 className="verify2fa-title">Two-Factor Authentication</h1>
          <p className="verify2fa-subtitle">Enter your verification code</p>
        </div>

        {/* Instructions */}
        <div className="verify2fa-instructions">
          <MailOutlined className="instruction-icon" />
          <p className="instruction-text">
            We've sent a 6-digit verification code to your email address.
          </p>
          <p className="instruction-subtext">
            Enter the code below to complete your login.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="countdown-timer">
          <ClockCircleOutlined className="timer-icon" />
          <span className="timer-value">{formatTime(timeLeft)}</span>
          <span className="timer-label">remaining</span>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            className="verify2fa-alert"
            onClose={() => setError("")}
          />
        )}

        {codeSent && (
          <Alert
            message="New code sent successfully!"
            type="success"
            showIcon
            className="verify2fa-alert"
          />
        )}

        <Form
          form={form}
          name="verify2fa"
          onFinish={onFinish}
          layout="vertical"
          className="verify2fa-form"
        >
          <Form.Item
            label={<span className="form-label">Verification Code</span>}
            name="code"
            rules={[
              {
                required: true,
                message: "Please input the verification code!",
              },
              { len: 6, message: "Code must be 6 digits!" },
              {
                pattern: /^\d+$/,
                message: "Code must contain only numbers!",
              },
            ]}
          >
            <Input.OTP length={6} size="large" className="otp-input" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              disabled={timeLeft === 0}
              className="verify-button"
            >
              {loading ? "VERIFYING..." : "VERIFY CODE"}
            </Button>
          </Form.Item>
        </Form>

        {/* Resend Code Section */}
        {/* <div className="resend-section">
          <p className="resend-text">Didn't receive the code?</p>
          <Button
            type="link"
            icon={<ReloadOutlined />}
            onClick={resendCode}
            disabled={timeLeft > 240} // Can resend after 1 minute
            className="resend-button"
          >
            Send new code
          </Button>
        </div> */}

        {/* Back to Login */}
        <div className="back-to-login">
          <Button
            type="link"
            onClick={() => navigate("/login")}
            className="back-link"
          >
            Back to login
          </Button>
        </div>

        {/* City Skyline */}
        <div className="city-skyline">
          <div className="building building-1"></div>
          <div className="building building-2"></div>
          <div className="building building-3"></div>
          <div className="building building-4"></div>
          <div className="building building-5"></div>
          <div className="building building-6"></div>
          <div className="building building-7"></div>
        </div>
      </div>
    </div>
  );
};

export default Verify2FA;
