"use client";

import { Layout, Menu, Button, Space } from "antd";
import { useRouter, usePathname } from "next/navigation";
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "/about",
      icon: <InfoCircleOutlined />,
      label: "About",
    },
  ];

  return (
    <AntHeader style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          marginRight: "24px",
        }}
      >
        MyApp
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={menuItems}
        style={{ flex: 1 }}
        onSelect={({ key }) => router.push(key)}
      />

      <Space>
        <Button type="primary" icon={<UserOutlined />}>
          Login
        </Button>
      </Space>
    </AntHeader>
  );
}
