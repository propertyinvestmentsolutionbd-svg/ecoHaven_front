"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Avatar,
  Row,
  Col,
  Divider,
  Switch,
  Checkbox,
  Spin,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  GlobalOutlined,
  InfoOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import "./profile.css";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/utils/helper";

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = getUserInfo();
  const { data, isLoading } = useUserProfileQuery(userId);

  const userProfile = data?.data;

  const handleEdit = () => {
    if (userProfile) {
      form.setFieldsValue({
        name: userProfile.name,
        email: userProfile.email,
        contactNo: userProfile.contactNo,
        address: userProfile.address,
        country: userProfile.country || "",
        linkedinUrl: userProfile.linkedinUrl || "",
        profileDescription: userProfile.profileDescription || "",
        agentDescription: userProfile.agentDescription || "",
        isActive: userProfile.isActive,
        isFeatured: userProfile.isFeatured,
        isAgent: userProfile.isAgent,
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
      // TODO: Replace with actual API call to update user
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // setUserProfile(values); // You'll update this with your actual update mutation
      setIsEditing(false);
      console.log("Profile updated:", values);
      // Add your update API call here
      // const res = await updateUserProfile(values).unwrap();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="profile-content">
          <Card className="profile-card">
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Spin size="large" />
              <div style={{ marginTop: "16px" }}>Loading profile...</div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Show error state if no data
  if (!userProfile) {
    return (
      <div className="profile-container">
        <div className="profile-content">
          <Card className="profile-card">
            <div style={{ textAlign: "center", padding: "50px" }}>
              <Typography.Text type="danger">
                Failed to load profile data
              </Typography.Text>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <Card className="profile-card">
          {/* Avatar Section */}
          <div className="profile-avatar-section">
            {userProfile.profileImg ? (
              <div className="profile-image-container">
                <Image
                  src={`http://localhost:5000${userProfile.profileImg}`}
                  alt={userProfile.name}
                  width={100}
                  height={100}
                  className="profile-image"
                />
              </div>
            ) : (
              <Avatar
                size={100}
                icon={<UserOutlined />}
                className="profile-avatar"
              />
            )}
            <Typography.Title level={4} className="profile-name">
              {userProfile.name}
            </Typography.Title>
            <Typography.Text className="profile-email-badge">
              {userProfile.email}
            </Typography.Text>

            {/* Status Badges */}
            <div className="profile-status-badges">
              {userProfile.isActive && (
                <div className="status-badge active">
                  <CheckCircleOutlined /> Active
                </div>
              )}
              {userProfile.isFeatured && (
                <div className="status-badge featured">
                  <StarOutlined /> Featured
                </div>
              )}
              {userProfile.isAgent && (
                <div className="status-badge agent">
                  <TeamOutlined /> Agent
                </div>
              )}
            </div>
          </div>

          <Divider />
          <div className="profile-edit-header">
            <Typography.Title level={5}>Personal Information</Typography.Title>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEdit}
              className="edit-button"
            >
              Edit Profile
            </Button>
          </div>
          {!isEditing ? (
            // View Mode
            <div className="profile-view-mode">
              <Row gutter={[24, 24]} className="profile-info-grid">
                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <UserOutlined className="profile-info-icon" />
                    <div>
                      <Typography.Text className="profile-info-label">
                        Full Name
                      </Typography.Text>
                      <div className="profile-info-value">
                        {userProfile.name}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <MailOutlined className="profile-info-icon" />
                    <div>
                      <Typography.Text className="profile-info-label">
                        Email Address
                      </Typography.Text>
                      <div className="profile-info-value">
                        {userProfile.email}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <PhoneOutlined className="profile-info-icon" />
                    <div>
                      <Typography.Text className="profile-info-label">
                        Contact Number
                      </Typography.Text>
                      <div className="profile-info-value">
                        {userProfile.contactNo}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <HomeOutlined className="profile-info-icon" />
                    <div>
                      <Typography.Text className="profile-info-label">
                        Address
                      </Typography.Text>
                      <div className="profile-info-value">
                        {userProfile.address || "Not provided"}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <HomeOutlined className="profile-info-icon" />
                    <div>
                      <Typography.Text className="profile-info-label">
                        Country
                      </Typography.Text>
                      <div className="profile-info-value">
                        {userProfile.country || "Not provided"}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <GlobalOutlined className="profile-info-icon" />
                    <div>
                      <Typography.Text className="profile-info-label">
                        LinkedIn
                      </Typography.Text>
                      <div className="profile-info-value">
                        {userProfile.linkedinUrl ? (
                          <a
                            href={userProfile.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linkedin-link"
                          >
                            View Profile
                          </a>
                        ) : (
                          "Not provided"
                        )}
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Profile Description */}
                <Col xs={24}>
                  <div className="profile-info-item">
                    <InfoOutlined className="profile-info-icon" />
                    <div>
                      <Typography.Text className="profile-info-label">
                        Profile Description
                      </Typography.Text>
                      <div className="profile-info-value description-text">
                        {userProfile.profileDescription ||
                          "No description provided"}
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Agent Description */}
                {userProfile.isAgent && (
                  <Col xs={24}>
                    <div className="profile-info-item">
                      <TeamOutlined className="profile-info-icon" />
                      <div>
                        <Typography.Text className="profile-info-label">
                          Agent Description
                        </Typography.Text>
                        <div className="profile-info-value description-text">
                          {userProfile.agentDescription ||
                            "No agent description provided"}
                        </div>
                      </div>
                    </div>
                  </Col>
                )}

                {/* Status Flags */}
                <Col xs={24}>
                  <div className="profile-status-flags">
                    <div className="status-flag">
                      <Typography.Text strong>Active Status: </Typography.Text>
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
                    <div className="status-flag">
                      <Typography.Text strong>Featured: </Typography.Text>
                      <span
                        className={
                          userProfile.isFeatured
                            ? "status-featured"
                            : "status-not-featured"
                        }
                      >
                        {userProfile.isFeatured ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="status-flag">
                      <Typography.Text strong>Agent: </Typography.Text>
                      <span
                        className={
                          userProfile.isAgent
                            ? "status-agent"
                            : "status-not-agent"
                        }
                      >
                        {userProfile.isAgent ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="status-flag">
                      <Typography.Text strong>2FA Enabled: </Typography.Text>
                      <span
                        className={
                          userProfile.twofaEnabled
                            ? "status-active"
                            : "status-inactive"
                        }
                      >
                        {userProfile.twofaEnabled ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </Col>

                {/* Additional Info */}
                <Col xs={24}>
                  <div className="profile-additional-info">
                    <div className="info-item">
                      <Typography.Text strong>Role: </Typography.Text>
                      <span className="role-badge">{userProfile.role}</span>
                    </div>
                    <div className="info-item">
                      <Typography.Text strong>Member since: </Typography.Text>
                      <span>
                        {new Date(userProfile.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="info-item">
                      <Typography.Text strong>Last updated: </Typography.Text>
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
            <div className="profile-edit-mode">
              <div className="profile-edit-header">
                <Typography.Title level={5}>Edit Information</Typography.Title>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                size="large"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input
                        placeholder="Enter your full name"
                        prefix={<UserOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
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

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Contact Number"
                      name="contactNo"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your contact number",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your contact number"
                        prefix={<PhoneOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item label="Address" name="address">
                      <Input
                        placeholder="Enter your address"
                        prefix={<HomeOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item label="Country" name="country">
                      <Input placeholder="Enter your country" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="LinkedIn URL"
                      name="linkedinUrl"
                      rules={[
                        {
                          type: "url",
                          message: "Please enter a valid URL",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter LinkedIn profile URL"
                        prefix={<GlobalOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  {/* Boolean Fields */}
                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Active Status"
                      name="isActive"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Featured"
                      name="isFeatured"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={8}>
                    <Form.Item
                      label="Is Agent"
                      name="isAgent"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>

                  {/* Text Areas */}
                  <Col xs={24}>
                    <Form.Item
                      label="Profile Description"
                      name="profileDescription"
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="Enter your profile description"
                        maxLength={500}
                        showCount
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item
                      label="Agent Description"
                      name="agentDescription"
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="Enter your agent description"
                        maxLength={500}
                        showCount
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="profile-form-actions">
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

export default Profile;
