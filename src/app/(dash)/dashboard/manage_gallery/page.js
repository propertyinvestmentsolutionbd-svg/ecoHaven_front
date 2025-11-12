"use client";
import { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./ManageGallery.css";

const ManageGallery = () => {
  // Mock projects for dropdown
  const mockProjects = [
    {
      id: 1,
      name: "Shanila Tower",
      type: "Residential",
      location: "Dhaka",
      brochureUrl: "Bn1",
    },
    {
      id: 2,
      name: "Marine Tower",
      type: "Commercial",
      location: "Chittagong",
      brochureUrl: "Bn2",
    },
    {
      id: 3,
      name: "Arifa Tower",
      type: "Residential",
      location: "Jalkhuri",
      brochureUrl: "Bn1",
    },
  ];

  // Mock gallery data
  const mockGalleries = [
    {
      id: 1,
      projectId: 3,
      projectName: "Arifa Tower",
      projectType: "Residential",
      galleryTitle: "Exterior Views",
      galleryType: "Exterior",
      images: ["drive.com"],
      address: "Jalkhuri",
      brochureUrl: "Bn1",
    },
    {
      id: 2,
      projectId: 3,
      projectName: "Arifa Tower",
      projectType: "Residential",
      galleryTitle: "Interior Design",
      galleryType: "Interior",
      images: ["drive.com"],
      address: "Jalkhuri",
      brochureUrl: "Bn1",
    },
  ];
  const [form] = Form.useForm();
  const [galleries, setGalleries] = useState(mockGalleries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: 150,
    },
    {
      title: "Project Type",
      dataIndex: "projectType",
      key: "projectType",
      width: 130,
    },
    {
      title: "Gallery Title",
      dataIndex: "galleryTitle",
      key: "galleryTitle",
      width: 150,
    },
    {
      title: "Gallery Type",
      dataIndex: "galleryType",
      key: "galleryType",
      width: 130,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      width: 120,
      render: (images) => images[0] || "-",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 120,
    },
    {
      title: "Brochure",
      dataIndex: "brochureUrl",
      key: "brochureUrl",
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="action-btn edit-btn"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            className="action-btn delete-btn"
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (gallery) => {
    setEditingGallery(gallery);
    form.setFieldsValue({
      projectId: gallery.projectId,
      galleryTitle: gallery.galleryTitle,
      galleryType: gallery.galleryType,
      images: gallery.images,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this gallery?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setGalleries(galleries.filter((g) => g.id !== id));
        message.success("Gallery deleted successfully");
      },
    });
  };

  const handleCreate = () => {
    setEditingGallery(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingGallery(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const selectedProject = mockProjects.find(
        (p) => p.id === values.projectId
      );

      if (editingGallery) {
        setGalleries(
          galleries.map((g) =>
            g.id === editingGallery.id
              ? {
                  ...g,
                  projectId: values.projectId,
                  projectName: selectedProject?.name || "",
                  projectType: selectedProject?.type || "",
                  galleryTitle: values.galleryTitle,
                  galleryType: values.galleryType,
                  images: values.images || [],
                  address: selectedProject?.location || "",
                  brochureUrl: selectedProject?.brochureUrl,
                }
              : g
          )
        );
        message.success("Gallery updated successfully");
      } else {
        const newGallery = {
          id: Math.max(...galleries.map((g) => g.id), 0) + 1,
          projectId: values.projectId,
          projectName: selectedProject?.name || "",
          projectType: selectedProject?.type || "",
          galleryTitle: values.galleryTitle,
          galleryType: values.galleryType,
          images: values.images || [],
          address: selectedProject?.location || "",
          brochureUrl: selectedProject?.brochureUrl,
        };
        setGalleries([...galleries, newGallery]);
        message.success("Gallery created successfully");
      }

      handleModalClose();
    } catch (error) {
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-gallery-page">
      <div className="manage-gallery-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Manage Gallery</h1>
            <p className="page-subtitle">Upload and manage project galleries</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
            className="create-btn"
          >
            Add Gallery
          </Button>
        </div>

        <div className="table-container">
          <Table
            columns={columns}
            dataSource={galleries}
            rowKey="id"
            scroll={{ x: 1000 }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} galleries`,
            }}
          />
        </div>

        <Modal
          title={editingGallery ? "Edit Gallery" : "Create New Gallery"}
          open={isModalOpen}
          onCancel={handleModalClose}
          footer={null}
          width={600}
          className="gallery-modal"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="gallery-form"
          >
            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item
                  label="Select Project"
                  name="projectId"
                  rules={[
                    { required: true, message: "Please select a project" },
                  ]}
                >
                  <Select
                    placeholder="Choose project"
                    size="large"
                    options={mockProjects?.map((project) => {
                      return {
                        value: project.id,
                        label: project.name,
                      };
                    })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Gallery Title"
                  name="galleryTitle"
                  rules={[
                    { required: true, message: "Please enter gallery title" },
                  ]}
                >
                  <Input placeholder="Enter Gallery Name" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Gallery Type"
                  name="galleryType"
                  rules={[
                    { required: true, message: "Please enter gallery type" },
                  ]}
                >
                  <Input placeholder="Enter Gallery Type" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  label="Upload Images"
                  name="images"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                  }}
                >
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                    multiple
                  >
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
                <Button onClick={handleModalClose} size="large">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                >
                  {editingGallery ? "Update Gallery" : "Create Gallery"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ManageGallery;
