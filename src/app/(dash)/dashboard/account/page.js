"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Divider,
  Switch,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  SafetyCertificateOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "./Account.css";

const { Title, Text } = Typography;

const Account = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock account data
  const [accountData, setAccountData] = useState({
    email: "john.doe@company.com",
    password: "********",
    twoFactorEnabled: true,
  });

  const handleEdit = () => {
    form.setFieldsValue({
      email: accountData.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: accountData.twoFactorEnabled,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedData = {
        email: values.email,
        password: values.newPassword ? "********" : accountData.password,
        twoFactorEnabled: values.twoFactorEnabled,
      };

      setAccountData(updatedData);
      setIsEditing(false);
      console.log("Account updated:", values);
    } catch (error) {
      console.error("Error updating account:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-container">
      <div className="account-content">
        {/* <div className="account-header">
          <Title level={2} className="account-title">
            Account Security
          </Title>
          <Text className="account-subtitle">
            Manage your login credentials and security settings
          </Text>
        </div> */}

        <Card className="account-card">
          {!isEditing ? (
            // View Mode
            <div className="account-view-mode">
              <div className="account-edit-header">
                <Title level={5}>Credential Information</Title>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  className="edit-button"
                >
                  Edit Credentials
                </Button>
              </div>

              <Row gutter={[24, 24]} className="account-info-grid">
                <Col xs={24} sm={12}>
                  <div className="account-info-item">
                    <MailOutlined className="account-info-icon" />
                    <div>
                      <Text className="account-info-label">Email Address</Text>
                      <div className="account-info-value">
                        {accountData.email}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="account-info-item">
                    <LockOutlined className="account-info-icon" />
                    <div>
                      <Text className="account-info-label">Password</Text>
                      <div className="account-info-value password-masked">
                        <EyeInvisibleOutlined className="password-icon" />
                        {accountData.password}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24}>
                  <div className="account-info-item">
                    <SafetyCertificateOutlined className="account-info-icon" />
                    <div className="two-factor-info">
                      <div>
                        <Text className="account-info-label">
                          Two-Factor Authentication
                        </Text>
                        <div className="account-info-value">
                          {accountData.twoFactorEnabled ? (
                            <span className="status-badge enabled">
                              Enabled
                            </span>
                          ) : (
                            <span className="status-badge disabled">
                              Disabled
                            </span>
                          )}
                        </div>
                      </div>
                      <Text className="two-factor-description">
                        {accountData.twoFactorEnabled
                          ? "Your account is protected with two-factor authentication"
                          : "Enable 2FA for enhanced security protection"}
                      </Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            // Edit Mode
            <div className="account-edit-mode">
              <div className="account-edit-header">
                <Title level={5}>Edit Credentials</Title>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                size="large"
              >
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your email"
                        prefix={<MailOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Divider orientation="left">
                      Change Password (Optional)
                    </Divider>
                  </Col>

                  <Col xs={24}>
                    <Form.Item label="Current Password" name="currentPassword">
                      <Input.Password
                        placeholder="Enter current password"
                        prefix={<LockOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (getFieldValue("currentPassword") && !value) {
                              return Promise.reject(
                                new Error("Please enter new password")
                              );
                            }
                            if (value && value.length < 8) {
                              return Promise.reject(
                                new Error(
                                  "Password must be at least 8 characters"
                                )
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter new password"
                        prefix={<LockOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Confirm New Password"
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (getFieldValue("newPassword") && !value) {
                              return Promise.reject(
                                new Error("Please confirm your password")
                              );
                            }
                            if (
                              value &&
                              getFieldValue("newPassword") !== value
                            ) {
                              return Promise.reject(
                                new Error("Passwords do not match")
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm new password"
                        prefix={<LockOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Divider />
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      label="Two-Factor Authentication"
                      name="twoFactorEnabled"
                      valuePropName="checked"
                    >
                      <div className="two-factor-toggle">
                        <Switch />
                        <Text className="two-factor-toggle-text">
                          Enable two-factor authentication for enhanced security
                        </Text>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>

                <div className="account-form-actions">
                  <Button
                    icon={<CloseOutlined />}
                    onClick={handleCancel}
                    size="large"
                    className="cancel-button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={loading}
                    size="large"
                    className="save-button"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Account;
