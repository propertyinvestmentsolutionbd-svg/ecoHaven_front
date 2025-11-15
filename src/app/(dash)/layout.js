"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout, Menu, Avatar, Button } from "antd";
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
import { ImProfile } from "react-icons/im";
import { MdFactCheck } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";

import "./dashboard/Dashboard.css";
import { getMenus, getUserInfo } from "@/utils/helper";

const { Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userName, setUserName] = useState("");
  const [menus, setMenus] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  // Create an icon mapping object
  const iconComponents = {
    HomeOutlined: <HomeOutlined />,
    ProjectOutlined: <ProjectOutlined />,
    PictureOutlined: <PictureOutlined />,
    ContactsOutlined: <ContactsOutlined />,
    DollarOutlined: <DollarOutlined />,
    TeamOutlined: <TeamOutlined />,
    SettingOutlined: <SettingOutlined />,
    ReadOutlined: <ReadOutlined />,
    UserOutlined: <UserOutlined />,
    ImProfile: <ImProfile />,
    MdFactCheck: <MdFactCheck />,
    MdManageAccounts: <MdManageAccounts />,
    MenuFoldOutlined: <MenuFoldOutlined />,
    MenuUnfoldOutlined: <MenuUnfoldOutlined />,
  };

  useEffect(() => {
    setMounted(true);

    // Client-side only code
    const userInfo = getUserInfo();
    const menu = getMenus();
    const modifiedMenu = menu.map((i) => {
      const iconComponent = iconComponents[i?.menuIcon] || <HomeOutlined />;

      return {
        // ...i,
        key: i?.menuPath,
        icon: iconComponent,
        label: i?.menuName,
      };
    });
    setUserName(userInfo?.name || "User");
    setMenus(modifiedMenu);
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setCurrentTime(time);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // const menuItems = [
  //   { key: "/dashboard", icon: <HomeOutlined />, label: "Home" },
  //   { key: "/dashboard/profile", icon: <ImProfile />, label: "Profile" },
  //   {
  //     key: "/dashboard/menu_permission",
  //     icon: <MdFactCheck />,
  //     label: "Permission",
  //   },
  //   { key: "/dashboard/account", icon: <MdManageAccounts />, label: "Account" },
  //   {
  //     key: "/dashboard/manage_projects",
  //     icon: <ProjectOutlined />,
  //     label: "Projects",
  //   },
  //   {
  //     key: "/dashboard/manage_gallery",
  //     icon: <PictureOutlined />,
  //     label: "Gallery",
  //   },
  //   {
  //     key: "/dashboard/contacts",
  //     icon: <ContactsOutlined />,
  //     label: "Contact",
  //   },
  //   {
  //     key: "/dashboard/manage_career",
  //     icon: <DollarOutlined />,
  //     label: "Career",
  //   },
  //   {
  //     key: "/dashboard/employee/create",
  //     icon: <TeamOutlined />,
  //     label: "Employee",
  //   },
  //   {
  //     key: "/dashboard/manage_reviews",
  //     icon: <SettingOutlined />,
  //     label: "Reviews",
  //   },
  //   { key: "/dashboard/manage_blogs", icon: <ReadOutlined />, label: "Blogs" },
  // ];

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

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <Layout className="dashboard-layout">
        <Sider className="dashboard-sider" collapsedWidth={80} width={220}>
          <div className="sidebar-content">
            <div className="logo-section">
              <h2 className="logo-text">Dashboard</h2>
            </div>
          </div>
        </Sider>
        <Layout>
          <Content className="dashboard-content">
            <div style={{ padding: 24 }}>Loading...</div>
          </Content>
        </Layout>
      </Layout>
    );
  }

  return (
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
            items={menus}
            onClick={handleMenuClick}
            className="sidebar-menu"
          />

          <div className="user-profile">
            <Avatar size={40} icon={<UserOutlined />} />
            {!collapsed && !isMobile && (
              <div className="user-info">
                <div className="user-name">{userName}</div>
                <div className="user-status">Login at {currentTime}</div>
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
            onClick={handleToggle}
            className="trigger-button"
          />
        </div>
        <Content className="dashboard-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
