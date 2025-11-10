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
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./profile.css";

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    country: "United States",
  });

  const handleEdit = () => {
    form.setFieldsValue(userProfile);
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
      setUserProfile(values);
      setIsEditing(false);
      console.log("Profile updated:", values);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        {/* <div className="profile-header">
          <Title level={2} className="profile-title">
            My Profile
          </Title>
          <Text className="profile-subtitle">
            Manage your personal information
          </Text>
        </div> */}

        <Card className="profile-card">
          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <Avatar
              size={100}
              icon={<UserOutlined />}
              className="profile-avatar"
            />
            <Title level={4} className="profile-name">
              {userProfile.name}
            </Title>
            <Text className="profile-email-badge">{userProfile.email}</Text>
          </div>

          <Divider />

          {!isEditing ? (
            // View Mode
            <div className="profile-view-mode">
              <div className="profile-edit-header">
                <Title level={5}>Personal Information</Title>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  className="edit-button"
                >
                  Edit Profile
                </Button>
              </div>

              <Row gutter={[24, 24]} className="profile-info-grid">
                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <UserOutlined className="profile-info-icon" />
                    <div>
                      <Text className="profile-info-label">Full Name</Text>
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
                      <Text className="profile-info-label">Email Address</Text>
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
                      <Text className="profile-info-label">Phone Number</Text>
                      <div className="profile-info-value">
                        {userProfile.phone}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <HomeOutlined className="profile-info-icon" />
                    <div>
                      <Text className="profile-info-label">Address</Text>
                      <div className="profile-info-value">
                        {userProfile.address}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <HomeOutlined className="profile-info-icon" />
                    <div>
                      <Text className="profile-info-label">City</Text>
                      <div className="profile-info-value">
                        {userProfile.city}
                      </div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="profile-info-item">
                    <HomeOutlined className="profile-info-icon" />
                    <div>
                      <Text className="profile-info-label">Country</Text>
                      <div className="profile-info-value">
                        {userProfile.country}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            // Edit Mode
            <div className="profile-edit-mode">
              <div className="profile-edit-header">
                <Title level={5}>Edit Information</Title>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                size="large"
                initialValues={userProfile}
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
                      label="Phone Number"
                      name="phone"
                      rules={[
                        { required: true, message: "Please enter your phone" },
                      ]}
                    >
                      <Input
                        placeholder="Enter your phone number"
                        prefix={<PhoneOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Address"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your address"
                        prefix={<HomeOutlined className="form-icon" />}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="City"
                      name="city"
                      rules={[
                        { required: true, message: "Please enter your city" },
                      ]}
                    >
                      <Input placeholder="Enter your city" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your country",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your country" />
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
