"use client";
import { useState, useEffect } from "react";
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
  Spin,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  SafetyCertificateOutlined,
  EyeInvisibleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./Account.css";
import { getUserInfo } from "@/utils/helper";
import {
  useUserProfileQuery,
  useUserPassChangeMutation,
} from "@/redux/api/userApi";
import { toast } from "react-toastify";

const Account = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = getUserInfo();

  // Fetch user profile data
  const { data, isLoading, refetch } = useUserProfileQuery(userId);
  // Password change mutation
  const [userPassChange] = useUserPassChangeMutation();

  const userProfile = data?.data;

  // Reset form when userProfile changes and we're in edit mode
  useEffect(() => {
    if (isEditing && userProfile) {
      form.setFieldsValue({
        email: userProfile.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twofaEnabled: userProfile.twofaEnabled || false,
      });
    }
  }, [userProfile, isEditing, form]);

  const handleEdit = () => {
    if (userProfile) {
      form.setFieldsValue({
        email: userProfile.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twofaEnabled: userProfile.twofaEnabled || false,
      });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      if (values.newPassword) {
        const passwordPayload = {
          id: userId,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        };

        const res = await userPassChange(passwordPayload).unwrap();
        if (res.success) {
          toast.success(res.message || "Password changed successfully");
          setIsEditing(false);
          refetch();
        }
      }
    } catch (error) {
      console.log("Error updating account:", { error });
      toast.error(
        error.message || "Failed to update account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="account-container">
        <div className="account-content">
          <Card className="account-card">
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
              <div style={{ marginTop: "16px" }}>Loading account...</div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Show error state if no data
  if (!userProfile) {
    return (
      <div className="account-container">
        <div className="account-content">
          <Card className="account-card">
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Typography.Text type="danger">
                Failed to load account data
              </Typography.Text>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-content">
        <Card className="account-card">
          {/* EDIT BUTTON - Always visible */}
          <div className="account-edit-header">
            <Typography.Title level={5}>
              Credential Information
            </Typography.Title>
            {!isEditing ? (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
                className="edit-button"
              >
                Edit Credentials
              </Button>
            ) : (
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
                  onClick={() => form.submit()}
                  icon={<SaveOutlined />}
                  // loading={loading || isChangingPassword}
                  size="large"
                  className="save-button"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>

          {!isEditing ? (
            // View Mode
            <div className="account-view-mode">
              <Row gutter={[24, 24]} className="account-info-grid">
                <Col xs={24} sm={12}>
                  <div className="account-info-item">
                    <MailOutlined className="account-info-icon" />
                    <div>
                      <Typography.Text className="account-info-label">
                        Email Address
                      </Typography.Text>
                      <div className="account-info-value">
                        {userProfile.email}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="account-info-item">
                    <LockOutlined className="account-info-icon" />
                    <div>
                      <Typography.Text className="account-info-label">
                        Password
                      </Typography.Text>
                      <div className="account-info-value password-masked">
                        <EyeInvisibleOutlined className="password-icon" />
                        ••••••••
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24}>
                  <div className="account-info-item">
                    <SafetyCertificateOutlined className="account-info-icon" />
                    <div className="two-factor-info">
                      <div>
                        <Typography.Text className="account-info-label">
                          Two-Factor Authentication
                        </Typography.Text>
                        <div className="account-info-value">
                          {userProfile.twofaEnabled ? (
                            <div className="status-badge enabled">
                              <CheckCircleOutlined /> Enabled
                            </div>
                          ) : (
                            <div className="status-badge disabled">
                              <CloseCircleOutlined /> Disabled
                            </div>
                          )}
                        </div>
                      </div>
                      <Typography.Text className="two-factor-description">
                        {userProfile.twofaEnabled
                          ? "Your account is protected with two-factor authentication"
                          : "Enable 2FA for enhanced security protection"}
                      </Typography.Text>
                    </div>
                  </div>
                </Col>

                {/* Additional Account Info */}
                <Col xs={24}>
                  <Divider />
                  <div className="account-additional-info">
                    <div className="info-item">
                      <Typography.Text strong>Account Status: </Typography.Text>
                      <span
                        className={
                          userProfile.isActive
                            ? "status-active"
                            : "status-inactive"
                        }
                      >
                        {userProfile.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="info-item">
                      <Typography.Text strong>Role: </Typography.Text>
                      <span className="role-badge">{userProfile.role}</span>
                    </div>
                    <div className="info-item">
                      <Typography.Text strong>
                        Last Password Update:{" "}
                      </Typography.Text>
                      <span>
                        {new Date(userProfile.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            // Edit Mode
            <div className="account-edit-mode">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                size="large"
                initialValues={
                  {
                    // email: userProfile.email,
                    // twofaEnabled: userProfile.twofaEnabled || false,
                  }
                }
              >
                <Row gutter={16}>
                  {/* <Col xs={24}>
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
                  </Col> */}

                  <Col xs={24}>
                    <Divider orientation="left">
                      Change Password
                      {/* (Optional) */}
                    </Divider>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      label="Current Password"
                      name="currentPassword"
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (getFieldValue("newPassword") && !value) {
                              return Promise.reject(
                                new Error(
                                  "Current password is required to change password"
                                )
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        placeholder="Enter your current password"
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
                            if (value && value.length < 6) {
                              return Promise.reject(
                                new Error(
                                  "Password must be at least 6 characters"
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

                  {/* <Col xs={24}>
                    <Form.Item
                      label="Two-Factor Authentication"
                      name="twofaEnabled"
                      valuePropName="checked"
                    >
                      <div className="two-factor-toggle">
                        <Switch />
                        <Typography.Text className="two-factor-toggle-text">
                          Enable two-factor authentication for enhanced security
                        </Typography.Text>
                      </div>
                    </Form.Item>
                  </Col> */}
                </Row>
              </Form>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Account;
