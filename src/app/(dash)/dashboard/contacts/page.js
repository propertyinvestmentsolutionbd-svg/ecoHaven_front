"use client";
import React, { useState } from "react";
import { Table, Tag, Button, Modal, message, Popconfirm, Space } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./contacts.css";
import {
  useGetContactsQuery,
  useMarkContactsMutation,
  useRemoveContactsMutation,
} from "@/redux/api/contactApi";
import { toast } from "react-toastify";

const ManageContacts = () => {
  const { data: contactsData, refetch } = useGetContactsQuery();
  const [removeContacts] = useRemoveContactsMutation();
  const [markContacts] = useMarkContactsMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Get actual contacts from API response
  const contacts = contactsData?.data?.contacts || [];

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setIsModalVisible(true);

    // Mark as read when viewing details if not already read
    if (!contact.read) {
      console.log({ contact });
      handleMarkAsRead(contact.id);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markContacts(id).unwrap();
      toast.success("Contact marked as read");
      refetch();
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeContacts(id).unwrap();
      toast.success("Contact deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  // const handleMarkAsReplied = async (id) => {
  //   try {
  //     await markContacts({ id, replied: true }).unwrap();
  //     toast.success("Contact marked as replied");
  //     refetch();
  //   } catch (error) {
  //     toast.error("Failed to mark as replied");
  //   }
  // };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 130,
      render: (phone) => phone || "N/A",
    },
    // {
    //   title: "Message",
    //   dataIndex: "message",
    //   key: "message",
    //   width: 250,
    //   render: (text) => (
    //     <div className="message-cell">
    //       {text && text.length > 100 ? `${text.substring(0, 100)}...` : text}
    //     </div>
    //   ),
    // },
    {
      title: "Status",
      key: "status",
      width: 120,
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Tag
            color={record.read ? "blue" : "red"}
            icon={record.read ? <CheckCircleOutlined /> : null}
          >
            {record.read ? "Read" : "Unread"}
          </Tag>
          {/* <Tag
            color={record.replied ? "green" : "orange"}
            icon={record.replied ? <CheckCircleOutlined /> : null}
          >
            {record.replied ? "Replied" : "Pending"}
          </Tag> */}
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>

          {/* {!record.replied && (
            <Button
              type="default"
              icon={<MailOutlined />}
              size="small"
              onClick={() => handleMarkAsReplied(record.id)}
            >
              Mark Replied
            </Button>
          )} */}

          <Popconfirm
            title="Delete this contact?"
            description="Are you sure you want to delete this contact?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="manage-contacts-page">
      <div className="contacts-header">
        <h1 className="contacts-title">Manage Contacts</h1>
        <div className="contacts-summary">
          <span className="total-contacts">
            Total Contacts: {contacts.length}
          </span>
          <span className="pending-contacts">
            Unread: {contacts.filter((contact) => !contact.read).length}
          </span>
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={contacts}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} contacts`,
            showQuickJumper: true,
          }}
          scroll={{ x: 1200 }}
          className="contacts-table"
        />
      </div>

      {/* Contact Details Modal */}
      <Modal
        title="Contact Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedContact && (
          <div className="contact-details">
            <div className="detail-row">
              <label>Name:</label>
              <span>{selectedContact.name}</span>
            </div>
            <div className="detail-row">
              <label>Email:</label>
              <span>
                <a href={`mailto:${selectedContact.email}`}>
                  {selectedContact.email}
                </a>
              </span>
            </div>
            <div className="detail-row">
              <label>Phone:</label>
              <span>{selectedContact.phone || "N/A"}</span>
            </div>
            <div className="detail-row">
              <label>Date:</label>
              <span>
                {new Date(selectedContact.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="detail-row">
              <label>Status:</label>
              <span>
                <Tag color={selectedContact.read ? "blue" : "red"}>
                  {selectedContact.read ? "Read" : "Unread"}
                </Tag>
              </span>
            </div>
            <div className="detail-row full-width">
              <label>Message:</label>
              <div className="message-content">{selectedContact.message}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageContacts;
