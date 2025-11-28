"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Upload, Image } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "./ManageBlogs.css";
import { toast } from "react-toastify";
import { useGetBlogsQuery, useRemoveBlogsMutation } from "@/redux/api/blogsApi";
import { fetchWithAuth } from "@/utils/fetchAuth";

const ManageBlogs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [modal, contextHolder] = Modal.useModal();
  const { data: blogsData, refetch, isLoading } = useGetBlogsQuery();
  const [removeBlogs] = useRemoveBlogsMutation();

  // Use actual data from API
  const blogs = blogsData?.data || [];

  const columns = [
    {
      title: "Blog Name",
      dataIndex: "title",
      key: "title",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (description) => (
        <div className="description-preview">
          {description?.substring(0, 100)}...
        </div>
      ),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "image",
      width: 120,
      render: (imageUrl) =>
        imageUrl ? (
          <Image
            width={50}
            height={50}
            src={`http://localhost:5000${imageUrl}`}
            alt="Blog"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span>-</span>
        ),
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      width: 120,
      render: (tag) => tag || "-",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type) => type || "-",
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

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setDescriptionCount(blog.description?.length || 0);

    // Set existing image in fileList if available
    if (blog.imageUrl) {
      setFileList([
        {
          uid: "-1",
          name: "current-image.jpg",
          status: "done",
          url: `http://localhost:5000${blog.imageUrl}`,
        },
      ]);
    } else {
      setFileList([]);
    }

    form.setFieldsValue({
      title: blog.title,
      type: blog.type || "",
      tag: blog.tag || "",
      description: blog.description,
    });

    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    modal.confirm({
      title: "Are you sure you want to delete this blog?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const result = await removeBlogs(id).unwrap();

          if (result.success) {
            refetch();
            toast.success("Blog deleted successfully");
          } else {
            toast.error(result.message || "Failed to delete blog");
          }
        } catch (error) {
          console.log("Error deleting blog:", error);
          toast.error(error?.data?.message || "Failed to delete blog");
        }
      },
    });
  };

  const handleCreate = () => {
    setEditingBlog(null);
    form.resetFields();
    setFileList([]);
    setDescriptionCount(0);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingBlog(null);
    form.resetFields();
    setFileList([]);
    setDescriptionCount(0);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      // Append form data
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.type) formData.append("type", values.type);
      if (values.tag) formData.append("tag", values.tag);

      // Append image file if exists and is new (has originFileObj)
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("blogImage", fileList[0].originFileObj);
      }

      const url = editingBlog
        ? `http://localhost:5000/api/v1/blogs/${editingBlog.id}`
        : "http://localhost:5000/api/v1/blogs";

      const method = editingBlog ? "put" : "post";

      console.log("Submitting blog data:", {
        editing: !!editingBlog,
        title: values.title,
        hasImage: fileList.length > 0,
        isNewImage: fileList[0]?.originFileObj ? true : false,
      });
      // const response = await fetch(url, {
      //   method,
      //   body: formData,
      //   credentials: "include",
      //   headers: {
      //     Authorization: acToken,
      //   },
      // });
      const response = await fetchWithAuth[method](url, formData);

      const result = await response.json();

      if (response.ok && result.success) {
        refetch();
        toast.success(result.message);
        handleModalClose();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error(error.message || "Failed to save blog");
    }
  };

  const handleDescriptionChange = (e) => {
    setDescriptionCount(e.target.value.length);
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
    <div className="manage-blogs-page">
      {contextHolder}
      <div className="page-header">
        <h1 className="page-title">Manage Blogs</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          className="create-btn"
        >
          Create Blog
        </Button>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={blogs}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} blogs`,
          }}
          scroll={{ x: 800 }}
          loading={isLoading}
        />
      </div>

      <Modal
        title={editingBlog ? "Edit Blog" : "Create Blog"}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
        className="blog-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="blog-form"
        >
          <div className="form-row">
            <Form.Item
              name="title"
              label="Blog Title"
              rules={[{ required: true, message: "Please enter blog title" }]}
              className="form-item-half"
            >
              <Input placeholder="Enter blog title" />
            </Form.Item>

            <Form.Item name="type" label="Blog Type" className="form-item-half">
              <Input placeholder="Enter blog type" />
            </Form.Item>
          </div>

          <Form.Item name="tag" label="Blog Tag">
            <Input placeholder="Enter blog tag" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Blog Description"
            rules={[
              { required: true, message: "Please enter blog description" },
            ]}
          >
            <Input.TextArea
              placeholder="Enter blog description"
              rows={4}
              maxLength={1000}
              showCount={{
                formatter: ({ count, maxLength }) =>
                  `${count}/${maxLength} characters`,
              }}
              onChange={handleDescriptionChange}
            />
          </Form.Item>

          <Form.Item label="Blog Image">
            <Upload {...uploadProps}>
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <div style={{ marginTop: 8, color: "#666", fontSize: "12px" }}>
              {editingBlog && fileList[0]?.url
                ? "Current image shown. Upload new image to replace."
                : "Upload blog image (optional)"}
            </div>
          </Form.Item>

          <Form.Item className="form-actions">
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="submit-btn">
                {editingBlog ? "Update Blog" : "Create Blog"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBlogs;
