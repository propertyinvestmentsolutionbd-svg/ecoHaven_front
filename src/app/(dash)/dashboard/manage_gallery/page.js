"use client";
import { useState, useEffect } from "react";
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
  Tag,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./ManageGallery.css";
import {
  useAllProjectsQuery,
  useGetProjectDropDownQuery,
  useRemoveProjectGalleryItemMutation,
} from "@/redux/api/projectApi";
import { toast } from "react-toastify";

const ManageGallery = () => {
  const [form] = Form.useForm();
  const [galleries, setGalleries] = useState([]);
  const [projectsWithGallery, setProjectsWithGallery] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { data: dropdownData } = useGetProjectDropDownQuery();
  const { data: projectData, isLoading, refetch } = useAllProjectsQuery();
  const [removeProjectGalleryItem] = useRemoveProjectGalleryItemMutation();
  const [modal, contextHolder] = Modal.useModal();

  // Filter projects that have gallery items and set galleries
  useEffect(() => {
    if (projectData?.data?.projects) {
      const projects = projectData.data.projects;

      // Filter projects that have gallery items
      const projectsWithGalleryItems = projects.filter(
        (project) => project.galleryItems && project.galleryItems.length > 0
      );

      setProjectsWithGallery(projectsWithGalleryItems);

      // Flatten all gallery items from all projects
      const allGalleryItems = projectsWithGalleryItems.flatMap((project) =>
        project.galleryItems.map((item) => ({
          ...item,
          project: {
            // Include project info with each gallery item
            id: project.id,
            name: project.name,
            projectType: project.projectType,
            location: project.location,
          },
        }))
      );

      setGalleries(allGalleryItems);
    }
  }, [projectData]);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "project",
      key: "projectName",
      width: 150,
      render: (project) => project?.name || "-",
    },
    {
      title: "Project Type",
      dataIndex: "project",
      key: "projectType",
      width: 130,
      render: (project) => (
        <Tag color={project?.projectType === "Commercial" ? "blue" : "green"}>
          {project?.projectType || "-"}
        </Tag>
      ),
    },
    {
      title: "Project Location",
      dataIndex: "project",
      key: "location",
      width: 150,
      render: (project) => project?.location || "-",
    },
    {
      title: "Gallery Title",
      dataIndex: "title",
      key: "title",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 130,
      render: (category) => <Tag color="purple">{category || "general"}</Tag>,
    },
    {
      title: "Media",
      dataIndex: "imageUrl",
      key: "media",
      width: 120,
      render: (imageUrl, record) => (
        <div style={{ textAlign: "center" }}>
          {imageUrl ? (
            <span style={{ color: "#52c41a" }}>📷 Image</span>
          ) : record.videoUrl ? (
            <span style={{ color: "#1890ff" }}>🎥 Video</span>
          ) : (
            <span style={{ color: "#999" }}>-</span>
          )}
        </div>
      ),
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
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            className="action-btn delete-btn"
            title="Delete Gallery Item"
          />
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    modal.confirm({
      title: "Are you sure you want to delete this gallery item?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const response = await removeProjectGalleryItem(id).unwrap();
          const result = await response;

          if (result.success) {
            // Remove the deleted item from state
            setGalleries(galleries.filter((g) => g.id !== id));

            // Refresh projects data to update the list
            refetch();

            toast.success("Gallery item deleted successfully");
          } else {
            toast.error(result.message || "Failed to delete gallery item");
          }
        } catch (error) {
          console.log("Error deleting gallery item:", { error });
          toast.error("Failed to delete gallery item");
        }
      },
    });
  };

  const handleCreate = () => {
    form.resetFields();
    setFileList([]);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append gallery data
      const galleryPayload = {
        titles: [values.title || "Gallery Item"],
        categories: [values.category || "general"],
      };

      formData.append("titles", JSON.stringify(galleryPayload.titles));
      formData.append("categories", JSON.stringify(galleryPayload.categories));

      // Append files
      if (fileList.length > 0) {
        fileList.forEach((file) => {
          if (file.originFileObj) {
            formData.append("galleryMedia", file.originFileObj);
          }
        });
      } else {
        message.error("Please upload at least one file");
        setLoading(false);
        return;
      }

      console.log("Submitting gallery data:", {
        projectId: values.projectId,
        title: values.title,
        category: values.category,
        files: fileList.length,
      });

      // Call the API
      const response = await fetch(
        `http://localhost:5000/api/v1/project/${values.projectId}/gallery-items`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        message.success(result.message || "Gallery items added successfully");

        // Refresh projects data to show the new gallery items
        refetch();

        handleModalClose();
      } else {
        throw new Error(result.message || "Failed to add gallery items");
      }
    } catch (error) {
      console.error("Error adding gallery items:", error);
      message.error(error.message || "Something went wrong. Please try again.");
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
    multiple: true,
    onRemove: (file) => {
      const newFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(newFileList);
      return true;
    },
  };

  return (
    <div className="manage-gallery-page">
      {contextHolder}
      <div className="manage-gallery-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Manage Gallery</h1>
            <p className="page-subtitle">
              Manage project galleries - Showing {projectsWithGallery.length}{" "}
              projects with gallery items
            </p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            size="large"
            className="create-btn"
          >
            Add Gallery Items
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
              showTotal: (total) =>
                `Total ${total} gallery items across ${projectsWithGallery.length} projects`,
            }}
            loading={isLoading}
          />
        </div>

        <Modal
          title="Add Gallery Items"
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
                    options={dropdownData?.data || []}
                    loading={!dropdownData}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: "Please enter title" }]}
                >
                  <Input placeholder="Enter title" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: "Please enter category" }]}
                >
                  <Input placeholder="Enter category" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  label="Upload Media Files"
                  required
                  rules={[
                    {
                      validator: () => {
                        if (fileList.length === 0) {
                          return Promise.reject(
                            new Error("Please upload at least one file")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Upload {...uploadProps}>
                    {fileList.length >= 10 ? null : (
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                  <div
                    style={{ marginTop: 8, color: "#666", fontSize: "12px" }}
                  >
                    Upload images or videos. Multiple files allowed.
                  </div>
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
                  Add Gallery Items
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
