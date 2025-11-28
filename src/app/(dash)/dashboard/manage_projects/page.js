"use client";
import { useState, useEffect } from "react";
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
  Image,
  Descriptions,
} from "antd";
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./ManageProjects.css";
import {
  useAllProjectsQuery,
  useRemoveProjectMutation,
} from "@/redux/api/projectApi";
import { toast } from "react-toastify";
import { fetchWithAuth } from "@/utils/fetchAuth";

const ManageProjects = () => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { data, isLoading, refetch } = useAllProjectsQuery();
  const [removeProject] = useRemoveProjectMutation();
  const [modal, contextHolder] = Modal.useModal();

  // Set projects data when API response comes
  useEffect(() => {
    if (data?.data?.projects) {
      setProjects(data.data.projects);
    }
  }, [data]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="edit-btn"
            title="Edit Project"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            className="delete-btn"
            title="Delete Project"
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (project) => {
    setEditingProject(project);

    // Set form values for editing
    form.setFieldsValue({
      name: project.name,
      projectType: project.projectType,
      location: project.location,
      status: project.status, // Convert to lowercase for form
      priceRange: project.priceRange,
      sizeSqft: project.sizeSqft,
      landArea: project.landArea,
      progressPercentage: project.progressPercentage,
      completionYear: project.completionYear,
      latitude: project.latitude,
      longitude: project.longitude,
      mapUrl: project.mapUrl,
      brochureUrl: project.brochureUrl,
      virtualTourUrl: project.virtualTourUrl,
      amenities: project.amenities || [],
      description: project.description,
    });

    // Set file list for existing images
    if (project.images && project.images.length > 0) {
      const existingFiles = project.images.map((image, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: "done",
        url: `http://localhost:5000${image.imageUrl}`,
      }));
      setFileList(existingFiles);
    } else {
      setFileList([]);
    }

    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    modal.confirm({
      title: "Are you sure you want to delete this project?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const res = await removeProject(id).unwrap();
          toast.success(res?.message || "Project deleted successfully");
          refetch();
        } catch (error) {
          console.log("Error deleting employee:", { error });
          toast.error(error.data?.message || "Failed to delete Project");
        }
      },
    });
  };

  const handleCreate = () => {
    setEditingProject(null);
    form.resetFields();
    setFileList([]);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    form.resetFields();
    setFileList([]);
  };

  // const handleSubmit = async (values) => {
  //   setLoading(true);
  //   try {
  //     const formData = new FormData();

  //     // Validate required fields on frontend
  //     if (!values.name || !values.status || !values.projectType) {
  //       message.error(
  //         "Please fill all required fields: Name, Status, and Project Type"
  //       );
  //       setLoading(false);
  //       return;
  //     }

  //     // Prepare project data with proper null handling
  //     const projectPayload = {
  //       name: values.name,
  //       mapUrl: values.mapUrl || null,
  //       location: values.location || null,
  //       priceRange: values.priceRange || null,
  //       sizeSqft: values.sizeSqft || null,
  //       landArea: values.landArea || null,
  //       status: values.status,
  //       description: values.description || null,
  //       amenities: values.amenities || [],
  //       projectType: values.projectType,
  //       progressPercentage: values.progressPercentage || 0,
  //       completionYear: values.completionYear || null,
  //       brochureUrl: values.brochureUrl || null,
  //       virtualTourUrl: values.virtualTourUrl || null,
  //       latitude: values.latitude || null,
  //       longitude: values.longitude || null,
  //     };

  //     console.log("Project payload:", projectPayload);
  //     console.log("Number of images:", fileList.length);

  //     // Append project data as JSON
  //     formData.append("projectData", JSON.stringify(projectPayload));

  //     // Append project images (optional - works with 0 images)
  //     if (fileList.length > 0) {
  //       fileList.forEach((file) => {
  //         if (file.originFileObj) {
  //           formData.append("projectImages", file.originFileObj);
  //           console.log("Added project image:", file.name);
  //         }
  //       });
  //     } else {
  //       console.log("No images provided - creating project without images");
  //     }

  //     // Debug: Log FormData contents
  //     console.log("=== FORM DATA SUMMARY ===");
  //     for (let [key, value] of formData.entries()) {
  //       if (value instanceof File) {
  //         console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
  //       } else {
  //         console.log(
  //           `${key}: ${
  //             typeof value === "string"
  //               ? value.substring(0, 100) + "..."
  //               : value
  //           }`
  //         );
  //       }
  //     }

  //     // Determine API endpoint based on create/edit
  //     const url = editingProject
  //       ? `http://localhost:5000/api/v1/projects/${editingProject.id}/update` // You'll need to create this endpoint
  //       : "http://localhost:5000/api/v1/createProject/with-files"; // Fixed URL path

  //     const method = editingProject ? "PUT" : "POST";

  //     console.log(`Calling ${method} ${url}`);

  //     // Call the API
  //     const response = await fetch(url, {
  //       method,
  //       body: formData,
  //       credentials: "include",
  //     });

  //     const result = await response.json();

  //     if (response.ok && result.success) {
  //       const successMessage = editingProject
  //         ? "Project updated successfully"
  //         : fileList.length > 0
  //         ? "Project created with images successfully"
  //         : "Project created successfully";

  //       toast.success(successMessage);

  //       // Refresh the projects list
  //       refetch();

  //       handleModalClose();
  //     } else {
  //       throw new Error(result.message || "Failed to save project");
  //     }
  //   } catch (error) {
  //     console.log("Error saving project:", error);
  //     toast.error(error.message || "Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Validate required fields
      if (!values.name || !values.status || !values.projectType) {
        message.error(
          "Please fill all required fields: Name, Status, and Project Type"
        );
        setLoading(false);
        return;
      }

      // Filter only NEW images (those with originFileObj)
      const newImages = fileList.filter((file) => file.originFileObj);
      const hasNewImages = newImages.length > 0;
      const hasExistingImages = editingProject?.images?.length > 0;

      console.log("File list analysis:", {
        totalFiles: fileList.length,
        newImages: newImages.length,
        existingImages: editingProject?.images?.length,
      });

      // Prepare project data
      const projectPayload = {
        name: values.name,
        mapUrl: values.mapUrl || null,
        location: values.location || null,
        priceRange: values.priceRange || null,
        sizeSqft: values.sizeSqft || null,
        landArea: values.landArea || null,
        status: values.status,
        description: values.description || null,
        amenities: values.amenities || [],
        projectType: values.projectType,
        progressPercentage: values.progressPercentage || 0,
        completionYear: values.completionYear || null,
        brochureUrl: values.brochureUrl || null,
        virtualTourUrl: values.virtualTourUrl || null,
        latitude: values.latitude || null,
        longitude: values.longitude || null,
        // FIX: Set removeProfileImage to true when we have new images to replace old ones
        removeProfileImage: editingProject ? hasNewImages : false,
      };

      console.log("Project payload:", projectPayload);
      console.log("New images to upload:", newImages.length);

      // Append project data as JSON
      formData.append("projectData", JSON.stringify(projectPayload));

      // Append ONLY new project images
      if (hasNewImages) {
        newImages.forEach((file) => {
          formData.append("projectImages", file.originFileObj);
          console.log("Added new project image:", file.name);
        });
      } else {
        console.log("No new project images to upload");
      }

      // Determine API endpoint based on create/edit
      const url = editingProject
        ? `http://localhost:5000/api/v1/project/${editingProject.id}/update/with-files`
        : "http://localhost:5000/api/v1/createProject/with-files";

      const method = editingProject ? "put" : "post";

      console.log(`Calling ${method} ${url}`);

      // Call the API
      // const response = await fetch(url, {
      //   method,
      //   body: formData,
      //   credentials: "include",
      // });
      const response = await fetchWithAuth[method](url, formData);

      const result = await response.json();

      if (response.ok && result.success) {
        const successMessage = editingProject
          ? hasNewImages
            ? "Project updated with new images successfully"
            : "Project updated successfully"
          : "Project created successfully";

        toast.success(successMessage);

        // Refresh the projects list
        refetch();

        handleModalClose();
      } else {
        throw new Error(result.message || "Failed to save project");
      }
    } catch (error) {
      console.log("Error saving project:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
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
    maxCount: 10,
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading projects...
      </div>
    );
  }

  return (
    <div className="manage-projects-page">
      {contextHolder}

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
            loading={isLoading}
          />
        </div>

        {/* Create/Edit Modal */}
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
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[{ required: true, message: "Please enter location" }]}
                >
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

              {/* ... rest of your form fields remain the same ... */}
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

              <Col xs={24} md={12}>
                <Form.Item label="Virtual Tour URL" name="virtualTourUrl">
                  <Input placeholder="Enter virtual tour URL" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Amenities" name="amenities">
                  <Select
                    mode="tags"
                    options={[
                      { value: "Parking", label: "Parking" },
                      { value: "Park", label: "Park" },
                      { value: "Swimming Pool", label: "Swimming Pool" },
                      { value: "Gym", label: "Gym" },
                      { value: "Security", label: "Security" },
                    ]}
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
                <Form.Item label="Project Images">
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
                    {editingProject
                      ? "Upload new images to replace existing ones"
                      : "Upload up to 10 images. First image will be set as featured."}
                  </div>
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

        {/* View Modal */}
      </div>
    </div>
  );
};

export default ManageProjects;
