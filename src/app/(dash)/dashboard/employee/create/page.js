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
  message,
  Card,
  Divider,
  Typography,
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

const { Title, Text } = Typography;

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

const ManageEmployees = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const columns = [
    {
      title: "Profile",
      dataIndex: "name",
      key: "profile",
      render: (name, record) => (
        <div className="employee-profile">
          <div className="profile-avatar">
            {record.profileImg ? (
              <img src={record.profileImg} alt={name} />
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
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingEmployee) {
        setEmployees(
          employees.map((employee) =>
            employee.id === editingEmployee.id
              ? {
                  ...employee,
                  ...values,
                  profileImg:
                    fileList.length > 0
                      ? URL.createObjectURL(fileList[0].originFileObj)
                      : employee.profileImg,
                }
              : employee
          )
        );
        message.success("Employee updated successfully");
      } else {
        const newEmployee = {
          id: employees.length + 1,
          ...values,
          profileImg:
            fileList.length > 0
              ? URL.createObjectURL(fileList[0].originFileObj)
              : null,
        };
        setEmployees([...employees, newEmployee]);
        message.success("Employee created successfully");
      }
      handleModalClose();
    } catch (error) {
      message.error("Failed to save employee. Please try again.");
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

  return (
    <div className="manage-employees-page">
      <div className="employees-header">
        <div className="header-content">
          <Title level={2} className="employees-title">
            <TeamOutlined className="title-icon" />
            Manage Employees
          </Title>
          <Text className="employees-subtitle">
            Manage your team members and their information
          </Text>
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
