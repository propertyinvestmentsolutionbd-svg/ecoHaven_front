"use client";

import { useEffect, useState } from "react";
import { Form, Input, Button, Alert, Modal } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";
import { useRouter } from "next/navigation";
import {
  useForgetPassMutation,
  useUserLoginMutation,
} from "@/redux/api/userApi";
import { toast } from "react-toastify";
import { getUserInfo, storeUserInfo } from "@/utils/helper";

const Login = () => {
  const [form] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState("");
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState(false);

  const [userLogin] = useUserLoginMutation();
  const [forgetPass] = useForgetPassMutation();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo?.userId) {
      router.replace("/");
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    setError("");

    try {
      console.log("Login attempt:", values);

      const response = await userLogin(values).unwrap();
      console.log({ response });

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

  const handleForgotPassword = () => {
    setIsForgotPasswordModalVisible(true);
    setForgotPasswordError("");
    setForgotPasswordSuccess("");
    forgotPasswordForm.resetFields();
  };

  const handleForgotPasswordCancel = () => {
    setIsForgotPasswordModalVisible(false);
    setForgotPasswordError("");
    setForgotPasswordSuccess("");
    forgotPasswordForm.resetFields();
  };

  const onForgotPasswordFinish = async (values) => {
    setForgotPasswordLoading(true);
    setForgotPasswordError("");
    setForgotPasswordSuccess("");

    try {
      console.log("Forgot password attempt:", values);

      // Simulate API call - replace with actual forgot password API
      const res = await forgetPass(values).unwrap();
      // This would be your actual API call
      setForgotPasswordSuccess(res.message || "Password reset successfully!");

      // Reset form after success
      setTimeout(() => {
        setIsForgotPasswordModalVisible(false);
        forgotPasswordForm.resetFields();
      }, 3000);
    } catch (err) {
      setForgotPasswordError(
        "Failed to process password reset. Please try again."
      );
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="login-container">
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
              <a
                href="#"
                className="forgot-password-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleForgotPassword();
                }}
              >
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

      {/* Forgot Password Modal */}
      <Modal
        title="Reset Your Password"
        open={isForgotPasswordModalVisible}
        onCancel={handleForgotPasswordCancel}
        footer={null}
        className="forgot-password-modal"
        width={400}
        centered
      >
        <div className="forgot-password-content">
          {forgotPasswordError && (
            <Alert
              message={forgotPasswordError}
              type="error"
              showIcon
              closable
              className="forgot-password-alert"
              onClose={() => setForgotPasswordError("")}
            />
          )}

          {forgotPasswordSuccess && (
            <Alert
              message={forgotPasswordSuccess}
              type="success"
              showIcon
              className="forgot-password-alert"
            />
          )}

          <Form
            form={forgotPasswordForm}
            name="forgotPassword"
            onFinish={onForgotPasswordFinish}
            layout="vertical"
            className="forgot-password-form"
          >
            <Form.Item
              label={<span className="form-label">Email Address</span>}
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                prefix={<MailOutlined className="input-icon" />}
                className="form-input"
              />
            </Form.Item>

            <Form.Item
              label={<span className="form-label">New Password</span>}
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                placeholder="Enter new password"
                prefix={<LockOutlined className="input-icon" />}
                className="form-input"
              />
            </Form.Item>

            <Form.Item
              label={<span className="form-label">Confirm Password</span>}
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm your password"
                prefix={<LockOutlined className="input-icon" />}
                className="form-input"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={forgotPasswordLoading}
                block
                className="reset-password-button"
              >
                {forgotPasswordLoading ? "RESETTING..." : "RESET PASSWORD"}
              </Button>
            </Form.Item>
          </Form>

          <div className="forgot-password-footer">
            <p className="forgot-password-note">
              Enter your email address and we'll help you reset your password.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
