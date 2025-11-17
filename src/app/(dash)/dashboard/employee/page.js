"use client";
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Card,
  Divider,
  Typography,
  Switch,
  Checkbox,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./AddEmployee.css";
import Image from "next/image";
import { useUserCreateMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";

const ManageEmployees = () => {
  const mockEmployees = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      contactNo: "+1 234 567 8900",
      role: "employee",
      address: "123 Main Street, City, Country",
      linkedinUrl: "https://linkedin.com/in/johndoe",
      profileImg: "https://example.com/profile1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      contactNo: "+1 234 567 8901",
      role: "admin",
      address: "456 Oak Avenue, City, Country",
      linkedinUrl: "https://linkedin.com/in/janesmith",
      profileImg: "https://example.com/profile2.jpg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      contactNo: "+1 234 567 8902",
      role: "employee",
      address: "789 Pine Road, City, Country",
      linkedinUrl: "https://linkedin.com/in/mikejohnson",
      profileImg: "https://example.com/profile3.jpg",
    },
  ];
  const [employees, setEmployees] = useState(mockEmployees);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isAgent, setIsAgent] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [userCreate] = useUserCreateMutation();

  const columns = [
    {
      title: "Profile",
      dataIndex: "name",
      key: "profile",
      render: (name, record) => (
        <div className="employee-profile">
          <div className="profile-avatar">
            {record.profileImg ? (
              <Image src={record.profileImg} alt={name} fill />
            ) : (
              <UserOutlined />
            )}
          </div>
          <div className="profile-info">
            <div className="employee-name">{name}</div>
            <div className="employee-role">{record.role}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <div className="address-cell">
          {address && address.length > 50
            ? `${address.substring(0, 50)}...`
            : address}
        </div>
      ),
    },
    {
      title: "LinkedIn",
      dataIndex: "linkedinUrl",
      key: "linkedinUrl",
      render: (url) =>
        url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            View Profile
          </a>
        ) : (
          <span className="no-link">Not provided</span>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="action-buttons">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="edit-btn"
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            className="delete-btn"
          />
        </div>
      ),
    },
  ];

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    form.setFieldsValue({
      name: employee.name,
      email: employee.email,
      contactNo: employee.contactNo,
      role: employee.role,
      address: employee.address,
      linkedinUrl: employee.linkedinUrl,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this employee?",
      content: "This action cannot be undone.",
      onOk() {
        setEmployees(employees.filter((employee) => employee.id !== id));
        message.success("Employee deleted successfully");
      },
    });
  };

  const handleCreate = () => {
    setEditingEmployee(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingEmployee(null);
    form.resetFields();
    setFileList([]);
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
    if (!value && !editingEmployee)
      return Promise.reject(new Error("Please input password!"));
    if (value && value.length < 6)
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

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append individual fields
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("contactNo", values.contactNo);
      formData.append("role", values.role || "employee");
      formData.append("designation", values.designation || "");
      formData.append("address", values.address || "");
      formData.append("linkedinUrl", values.linkedinUrl || "");
      formData.append("profileDescription", values.profileDescription || "");
      formData.append("agentDescription", values.agentDescription || "");
      formData.append("isFeatured", isFeatured.toString());
      formData.append("isAgent", isAgent.toString());
      formData.append("isActive", "true");
      formData.append("twofaEnabled", "true");

      if (!editingEmployee && values.password) {
        formData.append("password", values.password);
      }

      // DEBUG: Check the file object
      console.log("FileList[0]:", fileList[0]);
      console.log("Is File instance?", fileList[0] instanceof File);
      console.log("File object keys:", Object.keys(fileList[0]));

      // Handle file upload properly
      if (fileList.length > 0) {
        let fileToSend = fileList[0];

        // If it's not a File instance, we need to convert it
        if (!(fileToSend instanceof File)) {
          console.log("File is not a File instance, converting...");

          // Method 1: If it has originFileObj, use that
          if (fileToSend.originFileObj) {
            fileToSend = fileToSend.originFileObj;
            console.log("Using originFileObj:", fileToSend);
          }
          // Method 2: If it has thumbUrl, fetch and convert
          else if (fileToSend.thumbUrl) {
            console.log("Converting from thumbUrl...");
            const response = await fetch(fileToSend.thumbUrl);
            const blob = await response.blob();
            fileToSend = new File([blob], fileToSend.name, { type: blob.type });
          }
          // Method 3: If it's the Ant Design file object with uid, etc.
          else if (fileToSend.uid && fileToSend.name) {
            console.log("Ant Design file object detected, but no file content");
            // We need to get the actual file content
          }
        }

        // Only append if it's a proper File
        if (fileToSend instanceof File) {
          formData.append("profileImg", fileToSend);
          console.log(
            "Appended file:",
            fileToSend.name,
            fileToSend.size,
            "bytes"
          );
        } else {
          toast.warn("Cannot append file - not a File instance:", fileToSend);
        }
      }

      // Debug: Log ALL FormData entries
      console.log("=== FORM DATA ENTRIES ===");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: File - ${value.name} (${value.size} bytes, ${value.type})`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      // Use fetch
      const response = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Employee created successfully");
        handleModalClose();
      } else {
        throw new Error(result.message || "Request failed");
      }
    } catch (error) {
      toast.error("Error creating employee:", error);
      toast.error("Failed to save employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    fileList,
    onChange: ({ fileList }) => setFileList(fileList),
    beforeUpload: () => false,
    listType: "picture-card",
    accept: "image/*",
    maxCount: 1,
  };
  const handleMediaTypeChange = (checked) => {
    setIsAgent(checked?.target?.checked);
    form.setFieldsValue({ agentDescription: "" });
  };
  return (
    <div className="manage-employees-page">
      <div className="employees-header">
        <div className="header-content">
          <Typography.Title level={2} className="employees-title">
            <TeamOutlined className="title-icon" />
            Manage Employees
          </Typography.Title>
          <Typography.Text className="employees-subtitle">
            Manage your team members and their information
          </Typography.Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          className="create-btn"
        >
          Add Employee
        </Button>
      </div>

      <div className="table-container">
        <Card className="employees-card">
          <Table
            columns={columns}
            dataSource={employees}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} employees`,
            }}
            scroll={{ x: 1000 }}
            className="employees-table"
          />
        </Card>
      </div>

      <Modal
        title={
          <div className="modal-title">
            <TeamOutlined className="modal-title-icon" />
            {editingEmployee ? "Edit Employee" : "Add New Employee"}
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={700}
        className="employee-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="employee-form"
        >
          {/* Personal Information */}
          <Divider orientation="left" className="section-divider">
            Personal Information
          </Divider>

          <div className="form-row">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please input employee name!" },
                { min: 2, message: "Name must be at least 2 characters!" },
              ]}
              className="form-item-half"
            >
              <Input placeholder="John Doe" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email", message: "Enter a valid email!" },
              ]}
              className="form-item-half"
            >
              <Input
                placeholder="john.doe@company.com"
                prefix={<MailOutlined />}
              />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              name="contactNo"
              label="Contact Number"
              rules={[
                { required: true, message: "Please input contact number!" },
                { validator: validatePhone },
              ]}
              className="form-item-half"
            >
              <Input placeholder="+1 234 567 8900" prefix={<PhoneOutlined />} />
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select a role!" }]}
              initialValue="employee"
              className="form-item-half"
            >
              <Select
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "employee", label: "Employee" },
                ]}
                placeholder="Select role"
              />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item
              name="designation"
              label="Designation"
              rules={[
                { required: true, message: "Please select a designation!" },
              ]}
              initialValue=""
              className="form-item-half"
            >
              <Select
                options={[
                  { value: "HR", label: "HR" },
                  { value: "CEO", label: "CEO" },
                ]}
                placeholder="Select Designation"
              />
            </Form.Item>
            <Form.Item
              name="isAgent"
              label="Is Agent"
              valuePropName="checked"
              initialValue={false}
              layout="horizontal"
              style={{
                marginTop: "2rem",
              }}
            >
              <Checkbox checked={isAgent} onChange={handleMediaTypeChange} />
            </Form.Item>
            <Form.Item
              name="isFeatured"
              label="Is Featured"
              valuePropName="checked"
              initialValue={false}
              layout="horizontal"
              style={{
                marginTop: "2rem",
              }}
            >
              <Checkbox
                onChange={() => {
                  setIsFeatured(!isFeatured);
                }}
              />
            </Form.Item>
          </div>

          {/* Address */}
          <Divider orientation="left" className="section-divider">
            Address
          </Divider>

          <Form.Item
            name="address"
            label="Address"
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
          {/* BIO */}
          <Divider orientation="left" className="section-divider">
            Bio
          </Divider>

          <Form.Item
            name="profileDescription"
            label="Bio"
            rules={[
              {
                min: 5,
                message: "Bio should be at least 5 characters!",
              },
            ]}
          >
            <Input.TextArea rows={2} placeholder="" showCount maxLength={255} />
          </Form.Item>
          {/* Agent */}
          {isAgent && (
            <Divider orientation="left" className="section-divider">
              Agent
            </Divider>
          )}

          {isAgent && (
            <Form.Item
              name="agentDescription"
              label="Agent Bio"
              rules={[
                {
                  min: 5,
                  message: "Agent Bio should be at least 5 characters!",
                },
              ]}
            >
              <Input.TextArea
                rows={2}
                placeholder=""
                showCount
                maxLength={255}
              />
            </Form.Item>
          )}

          {/* Profile Image */}
          <Divider orientation="left" className="section-divider">
            Profile Image
          </Divider>

          <Form.Item label="Upload Profile Photo">
            <Upload {...uploadProps}>
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* LinkedIn */}
          <Divider orientation="left" className="section-divider">
            Additional Information
          </Divider>

          <Form.Item
            name="linkedinUrl"
            label="LinkedIn Profile"
            rules={[{ type: "url", message: "Enter a valid URL!" }]}
          >
            <Input placeholder="https://linkedin.com/in/username" />
          </Form.Item>

          {/* Account Security - Only for new employees */}
          {!editingEmployee && (
            <>
              <Divider orientation="left" className="section-divider">
                Account Security
              </Divider>

              <div className="form-row">
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ validator: validatePassword }]}
                  className="form-item-half"
                >
                  <Input.Password
                    placeholder="Enter password"
                    prefix={<LockOutlined />}
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[validateConfirmPassword]}
                  className="form-item-half"
                >
                  <Input.Password
                    placeholder="Confirm password"
                    prefix={<LockOutlined />}
                  />
                </Form.Item>
              </div>
            </>
          )}

          {/* Form Actions */}
          <Form.Item className="form-actions">
            <div className="button-group">
              <Button
                onClick={handleModalClose}
                disabled={loading}
                className="cancel-button"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="submit-button"
              >
                {editingEmployee ? "Update Employee" : "Create Employee"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageEmployees;
