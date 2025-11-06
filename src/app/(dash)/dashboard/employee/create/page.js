"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./AddEmployee.css";
const { Title, Text } = Typography;

const AddEmployee = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Form values:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // message.success("Employee created successfully!");
      form.resetFields();
      // navigate("/dashboard");
    } catch (error) {
      // message.error("Failed to create employee. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const validatePhone = (_, value) => {
    if (!value)
      return Promise.reject(new Error("Please input contact number!"));
    const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
    return phoneRegex.test(value)
      ? Promise.resolve()
      : Promise.reject(new Error("Please enter a valid phone number!"));
  };

  const validatePassword = (_, value) => {
    if (!value) return Promise.reject(new Error("Please input password!"));
    if (value.length < 6)
      return Promise.reject(
        new Error("Password must be at least 6 characters!")
      );
    return Promise.resolve();
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value)
        return Promise.resolve();
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  return (
    <div className="add-employee-layout">
      <div className="add-employee-content">
        <div className="form-container">
          {/* Header */}
          <div className="form-header">
            <Title level={3} className="form-title">
              <TeamOutlined className="title-icon" />
              Create New Employee
            </Title>
            <Text className="form-subtitle">
              Fill out the form to add a new team member
            </Text>
          </div>

          <Card className="employee-form-card">
            <Form
              form={form}
              name="createEmployee"
              onFinish={onFinish}
              layout="vertical"
              size="middle"
              scrollToFirstError
            >
              {/* Personal Info */}
              <Divider orientation="left" className="section-divider">
                Personal Information
              </Divider>

              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input employee name!",
                      },
                      {
                        min: 2,
                        message: "Name must be at least 2 characters!",
                      },
                    ]}
                  >
                    <Input placeholder="John Doe" prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: "Please input email!" },
                      { type: "email", message: "Enter a valid email!" },
                    ]}
                  >
                    <Input
                      placeholder="john.doe@company.com"
                      prefix={<MailOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Contact Number"
                    name="contactNo"
                    rules={[
                      {
                        required: true,
                        message: "Please input contact number!",
                      },
                      { validator: validatePhone },
                    ]}
                  >
                    <Input
                      placeholder="+1 234 567 8900"
                      prefix={<PhoneOutlined />}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                      { required: true, message: "Please select a role!" },
                    ]}
                    initialValue="employee"
                  >
                    <Select
                      options={[
                        { value: "admin", label: "admin" },
                        { value: "employee", label: "employee" },
                      ]}
                      placeholder="Select role"
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Address */}
              <Divider orientation="left" className="section-divider">
                Address
              </Divider>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    min: 5,
                    message: "Address should be at least 5 characters!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={2}
                  placeholder="123 Main Street, City, Country"
                  showCount
                  maxLength={255}
                />
              </Form.Item>

              {/* Security */}
              <Divider orientation="left" className="section-divider">
                Account Security
              </Divider>

              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please input password!" },
                      { validator: validatePassword },
                    ]}
                  >
                    <Input.Password
                      placeholder="Enter password"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      { required: true, message: "Please confirm password!" },
                      validateConfirmPassword,
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm password"
                      prefix={<LockOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Additional */}
              <Divider orientation="left" className="section-divider">
                Additional Information
              </Divider>

              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="LinkedIn Profile"
                    name="linkedinUrl"
                    rules={[{ type: "url", message: "Enter a valid URL!" }]}
                  >
                    <Input placeholder="https://linkedin.com/in/username" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Profile Image URL"
                    name="profileImg"
                    rules={[{ type: "url", message: "Enter a valid URL!" }]}
                  >
                    <Input placeholder="https://example.com/profile.jpg" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Buttons */}
              <Form.Item className="form-actions">
                <div className="button-group">
                  <Button
                    size="middle"
                    onClick={() => navigate("/dashboard")}
                    className="cancel-button"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="middle"
                    loading={loading}
                    className="submit-button"
                  >
                    Create Employee
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>

          <div className="form-footer">
            <Text className="footer-text">
              Fields marked with * are required. Credentials will be sent via
              email.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
