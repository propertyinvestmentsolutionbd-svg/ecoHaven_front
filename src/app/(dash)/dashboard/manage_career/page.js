"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Card,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CalendarOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

import "./ManageCareers.css";
import {
  useAddCareerMutation,
  useGetCareersQuery,
  useRemoveCareerMutation,
  useUpdateCareerMutation,
} from "@/redux/api/careerApi";
import { toast } from "react-toastify";
import moment from "moment";
import dayjs from "dayjs";
// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});
export default function ManageCareers() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");
  const { data: careersData, refetch, isLoading } = useGetCareersQuery();
  const [removeCareer] = useRemoveCareerMutation();
  const [addCareer] = useAddCareerMutation();
  const [updateCareer] = useUpdateCareerMutation();
  const [modal, contextHolder] = Modal.useModal();

  // Use actual data from API
  const careers = careersData?.data || [];

  const careerTypes = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (title, record) => (
        <div className="job-title-cell">
          <div className="job-title">{title}</div>
          <div className="job-type">
            {careerTypes.find((t) => t.value === record.type)?.label ||
              record.type}
          </div>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (description) => (
        <div
          className="description-preview"
          dangerouslySetInnerHTML={{
            __html: description?.substring(0, 100) + "..." || "",
          }}
        />
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type) => (
        <span className={`type-tag type-${type}`}>
          {careerTypes.find((t) => t.value === type)?.label || type}
        </span>
      ),
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      width: 120,
      render: (deadline, record) => (
        <div className="deadline-cell">
          <CalendarOutlined className="deadline-icon" />
          <span className={record.status === "expired" ? "expired-date" : ""}>
            {deadline}
          </span>
          {record.status === "expired" && (
            <span className="expired-badge">Expired</span>
          )}
        </div>
      ),
    },
    {
      title: "Application Link",
      dataIndex: "redirectLink",
      key: "redirectLink",
      width: 150,
      render: (link) => (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="application-link"
        >
          <LinkOutlined /> Apply Now
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <span className={`status-badge status-${status}`}>
          {status?.charAt(0)?.toUpperCase() + status?.slice(1) || "Active"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
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

  // React Quill modules configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "link",
    "image",
  ];

  const handleEdit = (career) => {
    setEditingCareer(career);
    setDescription(career.description || "");
    form.setFieldsValue({
      title: career.title,
      type: career.type,
      deadline: career.deadline ? dayjs(career.deadline) : null,
      redirectLink: career.redirectLink,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    modal.confirm({
      title: "Are you sure you want to delete this career posting?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const result = await removeCareer(id).unwrap();

          if (result.success) {
            refetch();
            toast.success("Job Post deleted successfully");
          } else {
            toast.error(result.message || "Failed to delete Job Post");
          }
        } catch (error) {
          console.log("Error deleting career:", error);
          toast.error(error?.data?.message || "Failed to delete Job Post");
        }
      },
    });
  };

  const handleCreate = () => {
    setEditingCareer(null);
    setDescription("");
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingCareer(null);
    setDescription("");
    form.resetFields();
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const careerData = {
        title: values.title,
        description: description,
        type: values.type,
        deadline: values.deadline ? values.deadline.format("YYYY-MM-DD") : null,
        redirectLink: values.redirectLink,
      };

      let result;

      if (editingCareer) {
        result = await updateCareer({
          id: editingCareer.id,
          ...careerData,
        }).unwrap();
      } else {
        result = await addCareer(careerData).unwrap();
      }

      if (result.success) {
        refetch();
        toast.success(result.message);
        handleModalClose();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error saving career:", error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to save career posting"
      );
    } finally {
      setLoading(false);
    }
  };

  const validateRedirectLink = (_, value) => {
    if (!value)
      return Promise.reject(new Error("Please input application link!"));
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(value)) {
      return Promise.reject(new Error("Please enter a valid URL!"));
    }
    return Promise.resolve();
  };

  const disabledDate = (current) => {
    // Can not select days before today
    return current && current < moment().startOf("day");
  };

  return (
    <div className="manage-careers-page">
      {contextHolder}

      <div className="manageCareer-header">
        <div className="header-content">
          <Typography.Title level={2} className="manageCareer-title">
            <CalendarOutlined className="title-icon" />
            Manage Careers
          </Typography.Title>
          <Typography.Text className="manageCareer-subtitle">
            Create and manage job postings and career opportunities
          </Typography.Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          className="create-btn"
        >
          Add Job Posting
        </Button>
      </div>

      <div className="table-container">
        <Card className="careers-card">
          <Table
            columns={columns}
            dataSource={careers}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} job postings`,
            }}
            scroll={{ x: 1200 }}
            className="careers-table"
            loading={isLoading}
          />
        </Card>
      </div>

      <Modal
        title={
          <div className="modal-title">
            <CalendarOutlined className="modal-title-icon" />
            {editingCareer ? "Edit Job Posting" : "Add New Job Posting"}
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        className="career-modal"
        style={{ top: 20 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="career-form"
        >
          {/* Basic Information */}
          <div className="form-section">
            <div className="section-title">Basic Information</div>
            <div className="form-row">
              <Form.Item
                name="title"
                label="Job Title"
                rules={[
                  { required: true, message: "Please input job title!" },
                  { min: 5, message: "Title must be at least 5 characters!" },
                ]}
                className="form-item-half"
              >
                <Input placeholder="e.g., Senior Frontend Developer" />
              </Form.Item>

              <Form.Item
                name="type"
                label="Employment Type"
                rules={[
                  { required: true, message: "Please select employment type!" },
                ]}
                className="form-item-half"
              >
                <Select
                  placeholder="Select employment type"
                  options={careerTypes}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="redirectLink"
              label="Application Link"
              rules={[
                { required: true, message: "Please input application link!" },
                { validator: validateRedirectLink },
              ]}
            >
              <Input
                placeholder="https://company.com/careers/job-title"
                prefix={<LinkOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="deadline"
              label="Application Deadline"
              rules={[
                {
                  required: true,
                  message: "Please select application deadline!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={disabledDate}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </div>

          {/* Job Description */}
          <div className="form-section">
            <div className="section-title">Job Description</div>
            <Form.Item
              label="Job Description"
              rules={[
                {
                  validator: (_, value) => {
                    if (
                      !description ||
                      description === "<p><br></p>" ||
                      description.trim() === ""
                    ) {
                      return Promise.reject(
                        new Error("Please enter job description!")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <div className="quill-editor-container">
                <ReactQuill
                  value={description}
                  onChange={handleDescriptionChange}
                  modules={quillModules}
                  formats={quillFormats}
                  theme="snow"
                  placeholder="Enter detailed job description, requirements, responsibilities, and benefits..."
                />
              </div>
            </Form.Item>
          </div>

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
                {editingCareer ? "Update Job Posting" : "Create Job Posting"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
