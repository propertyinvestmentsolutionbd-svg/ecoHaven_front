"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout, Menu, Avatar, Button, ConfigProvider } from "antd";
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
import "./dashboard/Dashboard.css";
import StyledComponentsRegistry from "@/lib/registry";
import { Inter } from "next/font/google";

const { Sider, Content } = Layout;
const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { key: "/dashboard", icon: <HomeOutlined />, label: "Home" },
    { key: "/dashboard/profile", icon: <HomeOutlined />, label: "Profile" },
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
    {
      key: "/dashboard/employee/create",
      icon: <TeamOutlined />,
      label: "Employee",
    },
    {
      key: "/dashboard/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    { key: "/dashboard/blogs", icon: <ReadOutlined />, label: "Blogs" },
  ];

  const handleMenuClick = ({ key }) => {
    router.push(key);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleOverlayClick = () => {
    setCollapsed(true);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider theme={{ hashed: false }}>
          <StyledComponentsRegistry>
            <Layout className="dashboard-layout">
              {/* Overlay for mobile */}
              {isMobile && !collapsed && (
                <div className="sidebar-overlay" onClick={handleOverlayClick} />
              )}

              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                className="dashboard-sider"
                breakpoint="lg"
                collapsedWidth={isMobile ? 0 : 80}
                width={220}
                trigger={null}
              >
                <div className="sidebar-content">
                  <div className="logo-section">
                    <h2 className="logo-text">
                      {collapsed && !isMobile ? "D" : "Dashboard"}
                    </h2>
                  </div>

                  <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["/"]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    className="sidebar-menu"
                  />

                  <div className="user-profile">
                    <Avatar size={40} icon={<UserOutlined />} />
                    {!collapsed && !isMobile && (
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
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={handleToggle}
                    className="trigger-button"
                  />
                </div>
                <Content className="dashboard-content">{children}</Content>
              </Layout>
            </Layout>
          </StyledComponentsRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
