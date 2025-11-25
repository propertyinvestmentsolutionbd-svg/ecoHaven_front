"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Card,
  Typography,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import "./ManageReviews.css";
import Image from "next/image";
import {
  useGetReviewsQuery,
  useRemoveReviewMutation,
} from "@/redux/api/reviewsApi";
import { toast } from "react-toastify";

const ManageReviews = () => {
  const { data: reviewsData, isLoading, refetch } = useGetReviewsQuery();
  const [removeReview] = useRemoveReviewMutation();
  const [modal, contextHolder] = Modal.useModal();

  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Use actual data from API
  useEffect(() => {
    if (reviewsData?.data) {
      setReviews(reviewsData.data);
    }
  }, [reviewsData]);

  const columns = [
    {
      title: "Reviewer",
      dataIndex: "reviewerName",
      key: "reviewerName",
      width: 150,
      render: (name) => (
        <div className="reviewer-info">
          <UserOutlined className="reviewer-icon" />
          <span className="reviewer-name">{name}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (description) => (
        <div className="description-cell">
          {description?.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type) => (
        <Tag color="blue" className="type-tag">
          {type || "General"}
        </Tag>
      ),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 120,
      render: (imageUrl) =>
        imageUrl ? (
          <div className="image-preview">
            <Image
              src={`http://localhost:5000${imageUrl}`}
              alt="Review"
              width={50}
              height={50}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <span>-</span>
        ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      width: 120,
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

  const handleEdit = (review) => {
    setEditingReview(review);

    // Set existing image in fileList if available
    if (review.imageUrl) {
      setFileList([
        {
          uid: "-1",
          name: "current-image.jpg",
          status: "done",
          url: `http://localhost:5000${review.imageUrl}`,
        },
      ]);
    } else {
      setFileList([]);
    }

    form.setFieldsValue({
      reviewerName: review.reviewerName,
      description: review.description,
      type: review.type || "",
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    modal.confirm({
      title: "Are you sure you want to delete this review?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const result = await removeReview(id).unwrap();
          toast.success(result?.message || "Review deleted successfully");
          refetch();
        } catch (error) {
          console.log("Error deleting review:", error);
          toast.error(error?.data?.message || "Failed to delete review");
        }
      },
    });
  };

  const handleCreate = () => {
    setEditingReview(null);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingReview(null);
    form.resetFields();
    setFileList([]);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append form data
      formData.append("reviewerName", values.reviewerName);
      formData.append("description", values.description);
      if (values.type) formData.append("type", values.type);

      // Append image file if exists and is new
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("reviewImage", fileList[0].originFileObj);
      }

      const url = editingReview
        ? `http://localhost:5000/api/v1/reviews/${editingReview.id}`
        : "http://localhost:5000/api/v1/reviews";

      const method = editingReview ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok && result.success) {
        refetch();
        toast.success(result.message);
        handleModalClose();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error(error.message || "Failed to save review");
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
    onRemove: () => {
      setFileList([]);
      return true;
    },
  };

  return (
    <div className="manage-reviews-page">
      {contextHolder}
      <div className="reviews-header">
        <div className="header-content">
          <Typography.Title level={2} className="reviews-title">
            <UserOutlined className="title-icon" />
            Manage Reviews
          </Typography.Title>
          <Typography.Text className="reviews-subtitle">
            Manage customer reviews and testimonials
          </Typography.Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          className="create-btn"
        >
          Add Review
        </Button>
      </div>

      <div className="table-container">
        <Card className="reviews-card">
          <Table
            columns={columns}
            dataSource={reviews}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} reviews`,
            }}
            scroll={{ x: 1200 }}
            className="reviews-table"
            loading={isLoading}
          />
        </Card>
      </div>

      <Modal
        title={
          <div className="modal-title">
            <UserOutlined className="modal-title-icon" />
            {editingReview ? "Edit Review" : "Add New Review"}
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        className="review-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="review-form"
        >
          {/* Reviewer Information */}
          <div className="form-section">
            <div className="section-title">Reviewer Information</div>

            <Form.Item
              name="reviewerName"
              label="Reviewer Name"
              rules={[
                { required: true, message: "Please input reviewer name!" },
                { min: 2, message: "Name must be at least 2 characters!" },
              ]}
            >
              <Input placeholder="John Smith" prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item name="type" label="Review Type">
              <Input placeholder="e.g., Customer, Client, Partner" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Review Description"
              rules={[
                { required: true, message: "Please input review description!" },
                {
                  min: 10,
                  message: "Description must be at least 10 characters!",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Share your experience with our service..."
                showCount
                maxLength={500}
              />
            </Form.Item>
          </div>

          {/* Image Upload */}
          <div className="form-section">
            <div className="section-title">Review Image</div>

            <Form.Item label="Upload Review Image">
              <Upload {...uploadProps}>
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Image</div>
                  </div>
                )}
              </Upload>
              <div style={{ marginTop: 8, color: "#666", fontSize: "12px" }}>
                {editingReview && fileList[0]?.url
                  ? "Current image shown. Upload new image to replace."
                  : "Upload review image (optional)"}
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
                {editingReview ? "Update Review" : "Create Review"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageReviews;
