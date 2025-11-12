"use client";
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Switch,
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
  PlayCircleOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import "./ManageReviews.css";

const { Title, Text } = Typography;

const mockReviews = [
  {
    id: 1,
    reviewerName: "John Smith",
    description:
      "Excellent service! The team was professional and delivered beyond expectations. Highly recommended for anyone looking for quality work.",
    isVideo: false,
    mediaUrl: "https://example.com/review1.jpg",
    rating: 5,
    date: "2024-01-15",
  },
  {
    id: 2,
    reviewerName: "Sarah Johnson",
    description:
      "Amazing video review of their services. The quality and attention to detail is outstanding!",
    isVideo: true,
    mediaUrl: "https://youtube.com/watch?v=abc123",
    rating: 4,
    date: "2024-01-12",
  },
  {
    id: 3,
    reviewerName: "Mike Wilson",
    description:
      "Good experience overall. The team was responsive and the work was completed on time.",
    isVideo: false,
    mediaUrl: "https://example.com/review3.jpg",
    rating: 4,
    date: "2024-01-10",
  },
  {
    id: 4,
    reviewerName: "Emily Davis",
    description:
      "Video testimonial - couldn't be happier with the results! The transformation was incredible.",
    isVideo: true,
    mediaUrl: "https://vimeo.com/123456",
    rating: 5,
    date: "2024-01-08",
  },
];

const ManageReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isVideo, setIsVideo] = useState(false);

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
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "isVideo",
      key: "isVideo",
      width: 100,
      render: (isVideo) => (
        <Tag
          color={isVideo ? "blue" : "green"}
          icon={isVideo ? <PlayCircleOutlined /> : <PictureOutlined />}
          className="media-type-tag"
        >
          {isVideo ? "Video" : "Image"}
        </Tag>
      ),
    },
    {
      title: "Media",
      dataIndex: "mediaUrl",
      key: "mediaUrl",
      width: 200,
      render: (url, record) => (
        <div className="media-cell">
          {record.isVideo ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="video-link"
            >
              <PlayCircleOutlined /> Watch Video
            </a>
          ) : (
            <div className="image-preview">
              <img src={url} alt="Review" className="review-image" />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 100,
      render: (rating) => (
        <div className="rating-display">
          <span className="rating-stars">{"★".repeat(rating)}</span>
          <span className="rating-number">({rating})</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
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
    setIsVideo(review.isVideo);
    form.setFieldsValue({
      reviewerName: review.reviewerName,
      description: review.description,
      isVideo: review.isVideo,
      mediaUrl: review.mediaUrl,
      rating: review.rating,
      date: review.date,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this review?",
      content: "This action cannot be undone.",
      onOk() {
        setReviews(reviews.filter((review) => review.id !== id));
        message.success("Review deleted successfully");
      },
    });
  };

  const handleCreate = () => {
    setEditingReview(null);
    setIsVideo(false);
    form.resetFields();
    setFileList([]);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingReview(null);
    setIsVideo(false);
    form.resetFields();
    setFileList([]);
  };

  const handleMediaTypeChange = (checked) => {
    setIsVideo(checked);
    form.setFieldsValue({ mediaUrl: "" });
    setFileList([]);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingReview) {
        setReviews(
          reviews.map((review) =>
            review.id === editingReview.id
              ? {
                  ...review,
                  ...values,
                  mediaUrl:
                    fileList.length > 0
                      ? URL.createObjectURL(fileList[0].originFileObj)
                      : values.mediaUrl,
                }
              : review
          )
        );
        message.success("Review updated successfully");
      } else {
        const newReview = {
          id: reviews.length + 1,
          ...values,
          mediaUrl:
            fileList.length > 0
              ? URL.createObjectURL(fileList[0].originFileObj)
              : values.mediaUrl,
          date: new Date().toISOString().split("T")[0],
        };
        setReviews([...reviews, newReview]);
        message.success("Review created successfully");
      }
      handleModalClose();
    } catch (error) {
      message.error("Failed to save review. Please try again.");
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

  const validateRating = (_, value) => {
    if (!value) return Promise.reject(new Error("Please input rating!"));
    if (value < 1 || value > 5) {
      return Promise.reject(new Error("Rating must be between 1 and 5!"));
    }
    return Promise.resolve();
  };

  const validateMediaUrl = (_, value) => {
    if (!value && fileList.length === 0) {
      return Promise.reject(
        new Error("Please provide either an image upload or media URL!")
      );
    }
    if (value && isVideo) {
      const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(value)) {
        return Promise.reject(new Error("Please enter a valid URL!"));
      }
    }
    return Promise.resolve();
  };

  return (
    <div className="manage-reviews-page">
      <div className="reviews-header">
        <div className="header-content">
          <Title level={2} className="reviews-title">
            <UserOutlined className="title-icon" />
            Manage Reviews
          </Title>
          <Text className="reviews-subtitle">
            Manage customer reviews and testimonials
          </Text>
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
        width={700}
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
            <div className="form-row">
              <Form.Item
                name="reviewerName"
                label="Reviewer Name"
                rules={[
                  { required: true, message: "Please input reviewer name!" },
                  { min: 2, message: "Name must be at least 2 characters!" },
                ]}
                className="form-item-half"
              >
                <Input placeholder="John Smith" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="rating"
                label="Rating (1-5)"
                rules={[
                  { required: true, message: "Please input rating!" },
                  { validator: validateRating },
                ]}
                className="form-item-half"
              >
                <Input type="number" min={1} max={5} placeholder="5" />
              </Form.Item>
            </div>

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

          {/* Media Type */}
          <div className="form-section">
            <div className="section-title">Media Type</div>
            <Form.Item
              name="isVideo"
              label="Media Type"
              valuePropName="checked"
              initialValue={false}
            >
              <div className="media-type-switch">
                <span className={`switch-label ${!isVideo ? "active" : ""}`}>
                  <PictureOutlined /> Image
                </span>
                <Switch
                  checked={isVideo}
                  onChange={handleMediaTypeChange}
                  checkedChildren="Video"
                  unCheckedChildren="Image"
                />
                <span className={`switch-label ${isVideo ? "active" : ""}`}>
                  <PlayCircleOutlined /> Video
                </span>
              </div>
            </Form.Item>
          </div>

          {/* Media Content */}
          <div className="form-section">
            <div className="section-title">Media Content</div>

            {!isVideo ? (
              <>
                <Form.Item label="Upload Review Image" className="upload-item">
                  <Upload {...uploadProps}>
                    {fileList.length >= 1 ? null : (
                      <div className="upload-placeholder">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload Image</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                <div className="upload-or">OR</div>
              </>
            ) : null}

            <Form.Item
              name="mediaUrl"
              label={isVideo ? "Video URL" : "Image URL (if not uploading)"}
              rules={[{ validator: validateMediaUrl }]}
            >
              <Input
                placeholder={
                  isVideo
                    ? "https://youtube.com/watch?v=..."
                    : "https://example.com/image.jpg"
                }
              />
            </Form.Item>

            {isVideo && (
              <div className="video-note">
                <Text type="secondary">
                  Enter the full URL to the video (YouTube, Vimeo, etc.)
                </Text>
              </div>
            )}
          </div>

          {/* Date */}
          {editingReview && (
            <div className="form-section">
              <Form.Item
                name="date"
                label="Review Date"
                rules={[{ required: true, message: "Please select date!" }]}
              >
                <Input type="date" />
              </Form.Item>
            </div>
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
