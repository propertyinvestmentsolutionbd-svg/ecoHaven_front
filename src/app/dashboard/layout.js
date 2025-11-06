"use client";
import React from "react";
import { useState } from "react";
import { Layout, Card, Table, Menu, Avatar, Button } from "antd";
import {
  HomeOutlined,
  ProjectOutlined,
  PictureOutlined,
  ContactsOutlined,
  DollarOutlined,
  TeamOutlined,
  SettingOutlined,
  ReadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Dashboard.css";
import Link from "next/link";
import StyledComponentsRegistry from "@/lib/registry";
import Footer from "@/components/Layout/Footer";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const { Sider, Content } = Layout;
const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const menuItems = [
    { key: "/dashboard", icon: <HomeOutlined />, label: "Home" },
    {
      key: "/dashboard/projects",
      icon: <ProjectOutlined />,
      label: "Projects",
    },
    { key: "/dashboard/gallery", icon: <PictureOutlined />, label: "Gallery" },
    { key: "/dashboard/contact", icon: <ContactsOutlined />, label: "Contact" },
    {
      key: "/dashboard/accounting",
      icon: <DollarOutlined />,
      label: "Accounting",
    },
    { key: "/dashboard/employee", icon: <TeamOutlined />, label: "Employee" },
    {
      key: "/dashboard/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    { key: "/dashboard/blogs", icon: <ReadOutlined />, label: "Blogs" },
  ];

  return (
    <Layout className="dashboard-layout" style={{ marginTop: "4.2rem" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="dashboard-sider"
        breakpoint="lg"
        collapsedWidth={80}
        width={220}
        trigger={null}
      >
        <div className="sidebar-content">
          <div className="logo-section">
            <h2 className="logo-text">{collapsed ? "D" : "Dashboard"}</h2>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            items={menuItems}
            onClick={({ key }) => router.push(key)}
            className="sidebar-menu"
          />

          <div className="user-profile">
            <Avatar size={40} icon={<UserOutlined />} />
            {!collapsed && (
              <div className="user-info">
                <div className="user-name">Rafiq</div>
                <div className="user-status">Login at 2:30 AM</div>
              </div>
            )}
          </div>
        </div>
      </Sider>

      <Layout>
        <div className="dashboard-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger-button"
          />
        </div>
        <Content className="dashboard-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
