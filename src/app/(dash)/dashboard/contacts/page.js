"use client";
import React from "react";
import { Table, Tag } from "antd";
import "./contacts.css";

const mockContacts = [
  {
    id: 1,
    name: "Abdullah al manun",
    email: "abdullah@gmail.com",
    contactNo: "Otxx8563.46",
    message:
      "Lorem ipsum is simple, dummy text of the printing and typesetting industry.",
    status: "pending reply",
  },
  {
    id: 2,
    name: "Abdullah al manun",
    email: "abdullah@gmail.com",
    contactNo: "Otxx8563.48",
    message:
      "Lorem ipsum is simple, dummy text of the printing and typesetting industry.",
    status: "pending reply",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    contactNo: "+1234567890",
    message: "Interested in your services, please contact me back.",
    status: "replied",
  },
  {
    id: 4,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    contactNo: "+1987654321",
    message: "Need more information about your products and pricing.",
    status: "pending reply",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    contactNo: "+1122334455",
    message: "Thank you for your quick response to my previous inquiry.",
    status: "replied",
  },
];

const ManageContacts = () => {
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
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
      width: 130,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: 300,
      render: (text) => (
        <div className="message-cell">
          {text.length > 100 ? `${text.substring(0, 100)}...` : text}
        </div>
      ),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   width: 120,
    //   render: (status) => (
    //     <Tag
    //       color={status === "replied" ? "green" : "orange"}
    //       className="status-tag"
    //     >
    //       {status.toUpperCase()}
    //     </Tag>
    //   ),
    // },
  ];

  return (
    <div className="manage-contacts-page">
      <div className="contacts-header">
        <h1 className="contacts-title">Manage Contacts</h1>
        <div className="contacts-summary">
          <span className="total-contacts">
            Total Contacts: {mockContacts.length}
          </span>
          <span className="pending-contacts">
            Pending:{" "}
            {
              mockContacts.filter(
                (contact) => contact.status === "pending reply"
              ).length
            }
          </span>
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={mockContacts}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} contacts`,
            showQuickJumper: true,
          }}
          scroll={{ x: 900 }}
          className="contacts-table"
        />
      </div>
    </div>
  );
};

export default ManageContacts;
