"use client";
import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Upload, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "./ManageBlogs.css";

const mockBlogs = [
  {
    id: 1,
    title: "Blog 01",
    type: "Residential",
    tag: "Structure",
    description: "Residential blog description",
    image: "drive.com",
  },
  {
    id: 2,
    title: "Blog 01",
    type: "Residential",
    tag: "Structure",
    description: "Residential blog description",
    image: "drive.com",
  },
  {
    id: 3,
    title: "Blog 01",
    type: "Residential",
    tag: "Structure",
    description: "Residential blog description",
    image: "drive.com",
  },
];

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [descriptionCount, setDescriptionCount] = useState(0);

  const columns = [
    {
      title: "Blog Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
            edit
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
    form.setFieldsValue({
      title: blog.title,
      type: blog.type,
      tag: blog.tag,
      description: blog.description,
    });
    setDescriptionCount(blog.description.length);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this blog?",
      onOk() {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        message.success("Blog deleted successfully");
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

  const handleSubmit = (values) => {
    // Simulate API call
    setTimeout(() => {
      if (editingBlog) {
        setBlogs(
          blogs.map((blog) =>
            blog.id === editingBlog.id
              ? { ...blog, ...values, image: "drive.com" }
              : blog
          )
        );
        message.success("Blog updated successfully");
      } else {
        const newBlog = {
          id: blogs.length + 1,
          ...values,
          image: "drive.com",
        };
        setBlogs([...blogs, newBlog]);
        message.success("Blog created successfully");
      }
      handleModalClose();
    }, 500);
  };

  const uploadProps = {
    fileList,
    onChange: ({ fileList }) => setFileList(fileList),
    beforeUpload: () => false,
    listType: "picture-card",
  };

  return (
    <div className="manage-blogs-page">
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
            showTotal: (total) => `Total ${total} items`,
          }}
          scroll={{ x: 800 }}
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
              label="Blogs Title"
              rules={[{ required: true, message: "Please enter blog title" }]}
              className="form-item-half"
            >
              <Input placeholder="Enter Blog Name" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Blogs Type"
              rules={[{ required: true, message: "Please enter blog type" }]}
              className="form-item-half"
            >
              <Input placeholder="Enter Blogs Type" />
            </Form.Item>
          </div>

          <Form.Item name="tag" label="Blog Tag">
            <Input placeholder="Enter Blog tag" />
          </Form.Item>

          <Form.Item name="description" label="Blogs Description">
            <Input.TextArea
              placeholder="Enter Blogs Description"
              rows={4}
              maxLength={1000}
              showCount={{
                formatter: ({ count }) => {
                  setDescriptionCount(count);
                  return `${count}/1000 words`;
                },
              }}
            />
          </Form.Item>

          <Form.Item label="Blog Image">
            <Upload {...uploadProps}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item className="form-actions">
            <Button type="primary" htmlType="submit" className="submit-btn">
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBlogs;
