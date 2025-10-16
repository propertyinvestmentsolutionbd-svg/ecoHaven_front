// src/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography, Alert, Divider } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    setError("");

    try {
      console.log("Login attempt:", values);

      // Simulate API call
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              success: true,
              requires2FA: Math.random() > 0.5, // Randomly require 2FA for demo
              tempToken: "temp-token-123",
            }),
          1500
        )
      );

      if (response.requires2FA) {
        // Redirect to 2FA page with temp token
        router.push(`/login/verify-2fa?tempToken=${response.tempToken}`);
      } else {
        // Regular login successful
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <UserOutlined className="text-2xl text-white" />
          </div>
          <Title level={2} className="!mb-2 !text-gray-800">
            Welcome Back
          </Title>
          <Text className="text-gray-600 text-lg">Sign in to your account</Text>
        </div>

        <Card
          className="shadow-xl border-0 rounded-2xl"
          style={{ padding: "40px" }}
        >
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

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
              className="!mb-6"
            >
              <Input
                placeholder="your.email@company.com"
                prefix={<MailOutlined className="text-gray-400" />}
                className="rounded-lg h-12"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="!mb-8"
            >
              <Input.Password
                placeholder="Enter your password"
                prefix={<LockOutlined className="text-gray-400" />}
                className="rounded-lg h-12"
              />
            </Form.Item>

            <Form.Item className="!mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="h-12 rounded-lg text-base font-semibold bg-blue-600 hover:bg-blue-700 border-0 shadow-sm"
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>
          </Form>

          <Divider className="!my-6">or</Divider>

          <div className="text-center">
            <Button type="link" className="text-blue-600 font-medium">
              Forgot your password?
            </Button>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="text-center mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <SafetyCertificateOutlined className="text-green-500 text-lg mb-2" />
          <Paragraph className="!mb-0 text-sm text-gray-600">
            Your security is our priority. We use advanced encryption and
            optional two-factor authentication.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
