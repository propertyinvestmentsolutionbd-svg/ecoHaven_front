"use client";
import { Layout, Card, Table } from "antd";
import "./Dashboard.css";
import { useGetContactsQuery } from "@/redux/api/contactApi";
import { useGetStatsQuery } from "@/redux/api/projectApi";

const Dashboard = () => {
  const columns = [
    {
      title: "Guest user Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact No",
      dataIndex: "phone",
      key: "phone",
    },
    // {
    //   title: "Message",
    //   dataIndex: "message",
    //   key: "message",
    // },
  ];

  // Mock data - will be replaced with API data
  // const statsData = [
  //   { id: 1, value: "5", label: "Total Properties Listed" },
  //   { id: 2, value: "200000/-", label: "Total Sales" },
  //   { id: 3, value: "2", label: "Ongoing Project" },
  //   { id: 4, value: "3", label: "Total Project Completed" },
  //   { id: 5, value: "800000/-", label: "Total Investment" },
  //   { id: 6, value: "6250", label: "Total Clients / Leads" },
  //   { id: 7, value: "15", label: "Total Employee" },
  //   { id: 8, value: "80000", label: "Total site visit" },
  //   { id: 9, value: "250", label: "Total Agents" },
  //   { id: 10, value: "22", label: "Total Landowner" },
  // ];

  // const messageRequests = [
  //   {
  //     key: 1,
  //     guestName: "Abdullah al-mamun",
  //     email: "abdullah@gmail.com",
  //     contact: "01xxxxxxxxx",
  //     message: "Lorem ipsum is simply dummy text of the printing...",
  //   },
  //   {
  //     key: 2,
  //     guestName: "Abdullah al-mamun",
  //     email: "abdullah@gmail.com",
  //     contact: "01xxxxxxxxx",
  //     message: "Lorem ipsum is simply dummy text of the printing...",
  //   },
  // ];
  const { data } = useGetContactsQuery();
  const { data: statsData, isLoading: statsLoading } = useGetStatsQuery();
  const stats = statsData?.data || [];

  const messageRequests = data?.data?.contacts || [];
  // Show loading state
  if (statsLoading) {
    return (
      <div className="stats-grid">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index} className="stat-card loading">
            <div className="stat-value">Loading...</div>
            <div className="stat-label">Loading...</div>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="stats-grid">
        {stats.map((stat) => (
          <Card key={stat.id} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Message Request Section */}
      <div className="message-section">
        <h2 className="section-title">Message Request</h2>
        <Table
          columns={columns}
          dataSource={messageRequests}
          pagination={false}
          className="message-table"
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default Dashboard;
