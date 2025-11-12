"use client";
import { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Tag,
  Row,
  Col,
  message,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./ManageProjects.css";

const ManageProjects = () => {
  // Mock data
  const mockProjects = [
    {
      id: 1,
      name: "Shanila Tower",
      location: "Dhaka",
      priceRange: "5-10 Crore",
      sizeSqft: 2500,
      landArea: "5 Katha",
      status: "Ongoing",
      description: "Luxury residential project",
      amenities: ["Swimming Pool", "Gym", "Parking"],
      projectType: "Residential",
      progressPercentage: 65,
      completionYear: 2025,
      latitude: 23.8103,
      longitude: 90.4125,
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      ],
    },
    {
      id: 2,
      name: "Marine Tower",
      location: "Chittagong",
      priceRange: "8-15 Crore",
      sizeSqft: 3200,
      landArea: "7 Katha",
      status: "Completed",
      description: "Premium commercial complex",
      amenities: ["Conference Room", "Cafeteria", "24/7 Security"],
      projectType: "Commercial",
      progressPercentage: 100,
      completionYear: 2024,
      latitude: 22.3569,
      longitude: 91.7832,
      images: [
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
      ],
    },
  ];
  const [form] = Form.useForm();
  const [projects, setProjects] = useState(mockProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState();
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //   fixed: "left",
      width: 180,
    },
    {
      title: "Type",
      dataIndex: "projectType",
      key: "projectType",
      width: 120,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const color =
          status === "Completed"
            ? "success"
            : status === "Ongoing"
            ? "processing"
            : "default";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Progress",
      dataIndex: "progressPercentage",
      key: "progressPercentage",
      width: 100,
      render: (progress) => `${progress}%`,
    },
    {
      title: "Size (sqft)",
      dataIndex: "sizeSqft",
      key: "sizeSqft",
      width: 120,
      render: (size) => (size ? size.toLocaleString() : "-"),
    },
    {
      title: "Price Range",
      dataIndex: "priceRange",
      key: "priceRange",
      width: 130,
    },
    {
      title: "Completion Year",
      dataIndex: "completionYear",
      key: "completionYear",
      width: 140,
    },
    {
      title: "Actions",
      key: "actions",
      //   fixed: "right",
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="action-btn"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            className="action-btn"
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (project) => {
    setEditingProject(project);
    form.setFieldsValue(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this project?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setProjects(projects.filter((p) => p.id !== id));
        message.success("Project deleted successfully");
      },
    });
  };

  const handleCreate = () => {
    setEditingProject(null);
    form.resetFields();
    form.setFieldsValue({ progressPercentage: 0, amenities: [], images: [] });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingProject) {
        // Update existing project
        setProjects(
          projects.map((p) =>
            p.id === editingProject.id ? { ...values, id: p.id } : p
          )
        );
        message.success("Project updated successfully");
      } else {
        // Create new project
        const newProject = {
          ...values,
          id: Math.max(...projects.map((p) => p.id), 0) + 1,
        };
        setProjects([...projects, newProject]);
        message.success("Project created successfully");
      }

      handleModalClose();
    } catch (error) {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-projects-page">
      <div className="manage-projects-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Manage Projects</h1>
            <p className="page-subtitle">Create and manage all your projects</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
            className="create-btn"
          >
            Create Project
          </Button>
        </div>

        <div className="table-container">
          <Table
            columns={columns}
            dataSource={projects}
            rowKey="id"
            scroll={{ x: 1400 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} projects`,
            }}
          />
        </div>

        <Modal
          title={editingProject ? "Edit Project" : "Create New Project"}
          open={isModalOpen}
          onCancel={handleModalClose}
          footer={null}
          width={800}
          className="project-modal"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="project-form"
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter project name" },
                  ]}
                >
                  <Input placeholder="Enter project name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Type"
                  name="projectType"
                  rules={[
                    { required: true, message: "Please select project type" },
                  ]}
                >
                  <Select
                    placeholder="Select type"
                    options={[
                      { value: "Residential", label: "Residential" },
                      { value: "Commercial", label: "Commercial" },
                      { value: "Mixed Use", label: "Mixed Use" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Location" name="location">
                  <Input placeholder="Enter location" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[{ required: true, message: "Please select status" }]}
                >
                  <Select
                    placeholder="Select status"
                    options={[
                      { value: "Upcoming", label: "Upcoming" },
                      { value: "Ongoing", label: "Ongoing" },
                      { value: "Completed", label: "Completed" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Price Range" name="priceRange">
                  <Input placeholder="e.g., 5-10 Crore" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Size (sqft)" name="sizeSqft">
                  <InputNumber
                    placeholder="Enter size"
                    style={{ width: "100%" }}
                    min={0}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Land Area" name="landArea">
                  <Input placeholder="e.g., 5 Katha" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Progress (%)" name="progressPercentage">
                  <InputNumber
                    placeholder="Enter progress"
                    style={{ width: "100%" }}
                    min={0}
                    max={100}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Completion Year" name="completionYear">
                  <InputNumber
                    placeholder="Enter year"
                    style={{ width: "100%" }}
                    min={2024}
                    max={2050}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Latitude" name="latitude">
                  <InputNumber
                    placeholder="Enter latitude"
                    style={{ width: "100%" }}
                    step={0.0001}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Longitude" name="longitude">
                  <InputNumber
                    placeholder="Enter longitude"
                    style={{ width: "100%" }}
                    step={0.0001}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Map URL" name="mapUrl">
                  <Input placeholder="Enter map URL" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Brochure URL" name="brochureUrl">
                  <Input placeholder="Enter brochure URL" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Amenities" name="amenities">
                  <Select
                    mode="tags"
                    placeholder="Add amenities (press Enter to add)"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Description" name="description">
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter project description"
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  label="Images"
                  name="images"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                  }}
                >
                  <Upload listType="picture-card" beforeUpload={() => false}>
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className="form-actions">
              <Space>
                <Button onClick={handleModalClose}>Cancel</Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {editingProject ? "Update Project" : "Create Project"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ManageProjects;
