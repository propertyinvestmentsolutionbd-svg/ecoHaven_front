// src/app/login/verify-2fa/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Alert,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  SafetyCertificateOutlined,
  MailOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Countdown } = Statistic;

export default function Verify2FAPage() {
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
  }, [tempToken, router]);

  const onFinish = async (values) => {
    setLoading(true);
    setError("");

    try {
      console.log("Verifying 2FA code:", values);

      // Simulate API verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo, accept any 6-digit code
      if (values.code.length === 6) {
        router.push("/dashboard");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <SafetyCertificateOutlined className="text-3xl text-white" />
          </div>
          <Title level={2} className="!mb-2 !text-gray-800">
            Two-Factor Authentication
          </Title>
          <Text className="text-gray-600 text-lg">
            Enter your verification code
          </Text>
        </div>

        <Card
          className="shadow-xl border-0 rounded-2xl"
          style={{ padding: "40px" }}
        >
          {/* Instructions */}
          <div className="text-center mb-6">
            <MailOutlined className="text-2xl text-blue-500 mb-3" />
            <Paragraph className="!mb-3 text-gray-700">
              We've sent a 6-digit verification code to your email address.
            </Paragraph>
            <Text className="text-sm text-gray-500">
              Enter the code below to complete your login.
            </Text>
          </div>

          {/* Countdown Timer */}
          <div className="text-center mb-6 p-3 bg-blue-50 rounded-lg">
            <Row gutter={16} justify="center" align="middle">
              <Col>
                <ClockCircleOutlined className="text-blue-500 text-lg" />
              </Col>
              <Col>
                <Text className="text-blue-700 font-mono text-lg">
                  {formatTime(timeLeft)}
                </Text>
              </Col>
              <Col>
                <Text className="text-blue-600 text-sm">remaining</Text>
              </Col>
            </Row>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              className="mb-6 rounded-lg"
              onClose={() => setError("")}
            />
          )}

          {codeSent && (
            <Alert
              message="New code sent successfully!"
              type="success"
              showIcon
              className="mb-6 rounded-lg"
            />
          )}

          <Form
            form={form}
            name="verify2fa"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="Verification Code"
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
              className="!mb-6"
            >
              <Input.OTP
                length={6}
                size="large"
                className="justify-center"
                inputType="numeric"
                formatter={(str) => str.toUpperCase()}
              />
            </Form.Item>

            <Form.Item className="!mb-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                disabled={timeLeft === 0}
                className="h-12 rounded-lg text-base font-semibold bg-blue-600 hover:bg-blue-700 border-0 shadow-sm"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
            </Form.Item>
          </Form>

          {/* Resend Code Section */}
          <div className="text-center pt-4 border-t border-gray-200">
            <Text className="text-gray-600 text-sm block mb-3">
              Didn't receive the code?
            </Text>
            <Button
              type="link"
              icon={<ReloadOutlined />}
              onClick={resendCode}
              disabled={timeLeft > 240} // Can resend after 1 minute
              className="text-blue-600 font-medium"
            >
              Send new code
            </Button>
          </div>
        </Card>

        {/* Security Information */}
        <div className="text-center mt-8">
          <Text className="text-gray-500 text-sm">
            For security reasons, this code will expire in 5 minutes.
          </Text>
          <div className="mt-2">
            <Button
              type="link"
              size="small"
              onClick={() => router.push("/login")}
              className="text-gray-500"
            >
              Back to login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
