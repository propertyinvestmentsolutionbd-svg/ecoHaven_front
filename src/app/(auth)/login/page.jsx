"use client";

import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import { useRouter } from "next/navigation";
import { useUserLoginMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { getUserInfo, storeUserInfo } from "@/utils/helper";

const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLogin] = useUserLoginMutation();
  const data = getUserInfo();
  console.log({ data });
  const onFinish = async (values) => {
    setLoading(true);
    setError("");

    try {
      console.log("Login attempt:", values);

      // Simulate API call
      const response = await userLogin(values).unwrap();
      console.log({ response });
      //   ((resolve) =>
      //   setTimeout(
      //     () =>
      //       resolve({
      //         success: true,
      //         requires2FA: Math.random() > 0.5,
      //         tempToken: "temp-token-123",
      //       }),
      //     1500
      //   )
      // );
      if (response?.token) {
        toast.success("User logged in successfully!");
        router.push("/dashboard");
        storeUserInfo({
          accessToken: response?.token,
          menus: JSON.stringify(response?.menus?.permissions),
        });
      }
      if (response.twoFa) {
        router.push(`/login/verify-2fa?tempToken=${response.tempToken}`);
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Building Image
      <div className="login-image-section">
        <Image
          src={"/loginBg.png"}
          alt="Modern Architecture"
          className="login-building-image"
          fill
        />
      </div> */}

      {/* Right Side - Login Form */}
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h1 className="login-title">Welcome To EcoHaven</h1>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              className="login-alert"
              onClose={() => setError("")}
            />
          )}

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            className="login-form"
          >
            <Form.Item
              label={<span className="form-label">User Name or Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="David Roy"
                prefix={<MailOutlined className="input-icon" />}
                className="form-input"
              />
            </Form.Item>

            <Form.Item
              label={<span className="form-label">Password</span>}
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="••••••••••"
                prefix={<LockOutlined className="input-icon" />}
                className="form-input"
              />
            </Form.Item>

            <div className="forgot-password-wrapper">
              <a href="#" className="forgot-password-link">
                Forget Password
              </a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                className="signin-button"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </Form.Item>
          </Form>

          {/* <div className="divider-wrapper">
            <span className="divider-line"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line"></span>
          </div> */}

          {/* <Button
            block
            className="google-signin-button"
            onClick={handleGoogleSignIn}
          >
            <GoogleOutlined className="google-icon" />
            Sign In With Google
          </Button> */}

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
    </div>
  );
};

export default Login;
