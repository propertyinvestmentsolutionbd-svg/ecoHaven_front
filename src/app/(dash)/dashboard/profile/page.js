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
  Upload,
  message,
  Select,
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
  PlusOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import "./profile.css";
import { getUserInfo } from "@/utils/helper";
import { useUserProfileQuery } from "@/redux/api/userApi";
import { toast } from "react-toastify";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [removeProfileImage, setRemoveProfileImage] = useState(false);

  const { userId } = getUserInfo();

  // Fetch user profile data
  const { data, isLoading } = useUserProfileQuery(userId);

  const userProfile = data?.data;

  // Country options
  const countryOptions = [
    { value: "United States", label: "United States" },
    { value: "Canada", label: "Canada" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Australia", label: "Australia" },
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
    { value: "Japan", label: "Japan" },
    { value: "South Korea", label: "South Korea" },
    { value: "India", label: "India" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Singapore", label: "Singapore" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
  ];

  // Designation options
  const designationOptions = [
    { value: "CEO", label: "Chief Executive Officer (CEO)" },
    { value: "CTO", label: "Chief Technology Officer (CTO)" },
    { value: "CFO", label: "Chief Financial Officer (CFO)" },
    { value: "COO", label: "Chief Operating Officer (COO)" },
    { value: "Manager", label: "Manager" },
    { value: "Team Lead", label: "Team Lead" },
    { value: "Senior Developer", label: "Senior Developer" },
    { value: "Developer", label: "Developer" },
    { value: "Designer", label: "Designer" },
    { value: "Marketing Specialist", label: "Marketing Specialist" },
    { value: "Sales Executive", label: "Sales Executive" },
    { value: "HR Manager", label: "HR Manager" },
    { value: "Project Manager", label: "Project Manager" },
    { value: "Data Analyst", label: "Data Analyst" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "QA Engineer", label: "QA Engineer" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "Business Analyst", label: "Business Analyst" },
  ];

  const handleEdit = () => {
    if (userProfile) {
      form.setFieldsValue({
        name: userProfile.name,
        email: userProfile.email,
        contactNo: userProfile.contactNo,
        address: userProfile.address,
        country: userProfile.country || "",
        designation: userProfile.designation || "",
        linkedinUrl: userProfile.linkedinUrl || "",
        profileDescription: userProfile.profileDescription || "",
        agentDescription: userProfile.agentDescription || "",
        isActive: userProfile.isActive,
        isFeatured: userProfile.isFeatured,
        isAgent: userProfile.isAgent,
        twofaEnabled: userProfile.twofaEnabled,
      });

      // Set current profile image if exists
      if (userProfile.profileImg) {
        setFileList([
          {
            uid: "-1",
            name: "current-profile.jpg",
            status: "done",
            url: `http://localhost:5000${userProfile.profileImg}`,
          },
        ]);
      }

      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFileList([]);
    setRemoveProfileImage(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Prepare user data
      const userData = {
        ...values,
        removeProfileImage: removeProfileImage && fileList.length === 0,
      };

      // Append userData as JSON
      formData.append("userData", JSON.stringify(userData));

      // Append new file if selected
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("profileImg", fileList[0].originFileObj);
      }

      // Call update API with fetch
      const response = await fetch(
        `http://localhost:5000/api/v1/${userId}/with-image`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to update profile");
      }

      if (result.success) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        setFileList([]);
        setRemoveProfileImage(false);

        // Refetch data to get updated information
        window.location.reload(); // Simple refresh to get updated data
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.log("Error updating profile:", { error });
      toast.error(
        error.message || "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    fileList,
    onChange: ({ fileList: newFileList }) => setFileList(newFileList),
    beforeUpload: () => false,
    listType: "picture-card",
    accept: "image/*",
    maxCount: 1,
    onRemove: () => {
      setRemoveProfileImage(true);
    },
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
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
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

            {/* Designation Badge */}
            {userProfile.designation && (
              <div className="designation-badge">
                <CrownOutlined /> {userProfile.designation}
              </div>
            )}

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

          {/* EDIT BUTTON - Always visible */}
          <div className="profile-edit-header">
            <Typography.Title level={5}>Personal Information</Typography.Title>
            {!isEditing ? (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
                className="edit-button"
              >
                Edit Profile
              </Button>
            ) : (
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
                  onClick={() => form.submit()}
                  icon={<SaveOutlined />}
                  loading={loading}
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
                    <CrownOutlined className="profile-info-icon" />
                    <div>
                      <Typography.Text className="profile-info-label">
                        Designation
                      </Typography.Text>
                      <div className="profile-info-value">
                        {userProfile.designation || "Not provided"}
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
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                size="large"
              >
                {/* Profile Image Upload in Edit Mode */}
                <Form.Item label="Profile Image">
                  <Upload {...uploadProps}>
                    {fileList.length >= 1 ? null : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>
                          {userProfile?.profileImg
                            ? "Change Photo"
                            : "Upload Photo"}
                        </div>
                      </div>
                    )}
                  </Upload>
                  {userProfile?.profileImg &&
                    fileList.length === 0 &&
                    !removeProfileImage && (
                      <Typography.Text
                        type="secondary"
                        style={{ display: "block", marginTop: 8 }}
                      >
                        Current photo will be kept
                      </Typography.Text>
                    )}
                  {removeProfileImage && (
                    <Typography.Text
                      type="warning"
                      style={{ display: "block", marginTop: 8 }}
                    >
                      Photo will be removed
                    </Typography.Text>
                  )}
                </Form.Item>

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
                    <Form.Item label="Designation" name="designation">
                      <Select
                        placeholder="Select your designation"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {designationOptions.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
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
                      <Select
                        placeholder="Select your country"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {countryOptions.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
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
                  <Col xs={0} sm={12}></Col>
                  {/* Boolean Fields */}
                  <Col xs={24} sm={6}>
                    <Form.Item
                      label="Active Status"
                      name="isActive"
                      layout="horizontal"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={6}>
                    <Form.Item
                      label="Featured"
                      name="isFeatured"
                      layout="horizontal"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={6}>
                    <Form.Item
                      layout="horizontal"
                      label="Is Agent"
                      name="isAgent"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Form.Item
                      layout="horizontal"
                      label="Enable 2FA"
                      name="twofaEnabled"
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
              </Form>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile;
