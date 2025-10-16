// src/app/employees/create/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  message,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LockOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

export default function CreateEmployee() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Form values:", values);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Employee created successfully!");
      form.resetFields();
      router.push("/employees");
    } catch (error) {
      message.error("Failed to create employee. Please try again.");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-white px-4 py-10">
      <div className="w-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <Title
            level={3}
            className="!text-2xl !font-semibold !mb-1 text-gray-800 tracking-tight"
          >
            <TeamOutlined className="mr-2 text-blue-600" />
            Create New Employee
          </Title>
          <Text className="text-gray-600 text-sm">
            Fill out the form to add a new team member
          </Text>
        </div>

        <Card
          className="shadow-lg border border-gray-100 rounded-2xl"
          style={{ padding: "1.5rem" }}
        >
          <Form
            form={form}
            name="createEmployee"
            onFinish={onFinish}
            layout="vertical"
            size="middle"
            scrollToFirstError
          >
            {/* Personal Info */}
            <Divider orientation="left" className="!text-sm !font-semibold">
              Personal Information
            </Divider>

            <Row gutter={[16, 0]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input employee name!" },
                    { min: 2, message: "Name must be at least 2 characters!" },
                  ]}
                >
                  <Input
                    placeholder="John Doe"
                    prefix={<UserOutlined className="text-gray-400" />}
                  />
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
                    prefix={<MailOutlined className="text-gray-400" />}
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
                    { required: true, message: "Please input contact number!" },
                    { validator: validatePhone },
                  ]}
                >
                  <Input
                    placeholder="+1 234 567 8900"
                    prefix={<PhoneOutlined className="text-gray-400" />}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: "Please select a role!" }]}
                  initialValue="employee"
                >
                  <Select placeholder="Select role">
                    <Option value="admin">Admin</Option>
                    <Option value="employee">Employee</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Address */}
            <Divider orientation="left" className="!text-sm !font-semibold">
              Address
            </Divider>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { min: 5, message: "Address should be at least 5 characters!" },
              ]}
            >
              <TextArea
                rows={2}
                placeholder="123 Main Street, City, Country"
                showCount
                maxLength={255}
              />
            </Form.Item>

            {/* Security */}
            <Divider orientation="left" className="!text-sm !font-semibold">
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
                    prefix={<LockOutlined className="text-gray-400" />}
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
                    prefix={<LockOutlined className="text-gray-400" />}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Additional */}
            <Divider orientation="left" className="!text-sm !font-semibold">
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

            {/* 2FA */}
            <Form.Item
              label="Two-Factor Authentication"
              name="twofaEnabled"
              valuePropName="checked"
              initialValue={false}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    form.setFieldsValue({ twofaEnabled: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm">
                  Enable Two-Factor Authentication
                </span>
              </div>
            </Form.Item>

            {/* Buttons */}
            <Form.Item className="!mb-0">
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-5 border-t border-gray-200">
                <Button
                  size="middle"
                  onClick={() => router.back()}
                  className="min-w-[120px]"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                  className="min-w-[140px] !bg-blue-600 hover:!bg-blue-700 !border-0"
                >
                  Create Employee
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>

        <div className="text-center mt-5">
          <Text className="text-gray-500 text-xs">
            Fields marked with * are required. Credentials will be sent via
            email.
          </Text>
        </div>
      </div>
    </div>
  );
}
