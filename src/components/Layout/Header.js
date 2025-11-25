"use client";

import React, { useEffect, useState } from "react";
import { Input, Drawer, Button } from "antd";
import { SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import "./Header.css";
import Link from "next/link";
import { getUserInfo, removeUserInfo } from "@/utils/helper";

export default function Header() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  const showDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
  }, []);

  console.log({ user });

  return (
    <header className={"header"}>
      {/* Left - Logo */}
      <div className={"logo"}>
        <Image src="/logoNew.jpeg" alt="Logo" width={90} height={45} />
      </div>

      {/* Center - Navigation (Desktop) */}
      <nav className={"nav"}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/management">Management</Link>
        <Link href="/design_philosophy">Design Philosophy</Link>
        <Link href="/career">Career</Link>
        <Link href="/nrb">NRB</Link>
        {user?.userId && <Link href="/dashboard">Dashboard</Link>}
      </nav>

      {/* Right - Login and Search */}
      <div className={"rightSection"}>
        {!user?.userId ? (
          <Link href="/login" className={"loginBtn"}>
            Login
          </Link>
        ) : (
          <Button
            // className={"loginBtn"}
            type="text"
            onClick={() => {
              removeUserInfo("accessToken");
              setUser(null);
            }}
          >
            Logout
          </Button>
        )}
        <div className={"searchWrapper"}>
          {searchVisible && (
            <Input
              placeholder="Search..."
              className={"searchInput"}
              size="middle"
              autoFocus
              onBlur={() => setSearchVisible(false)}
            />
          )}
          <SearchOutlined
            className={"searchIcon"}
            onClick={() => setSearchVisible(!searchVisible)}
          />
        </div>

        {/* Mobile Menu Button */}
        <MenuOutlined className="menuBtn" onClick={showDrawer} />
      </div>

      {/* Drawer Menu for Mobile */}
      <Drawer
        title={
          <div className={"drawerHeader"}>
            <span>Menu</span>
            <CloseOutlined onClick={closeDrawer} className={"closeIcon"} />
          </div>
        }
        placement="right"
        closable={false}
        onClose={closeDrawer}
        open={drawerOpen}
        className={"drawer"}
      >
        <div className={"drawerContent"}>
          <Link href="/" onClick={closeDrawer}>
            Home
          </Link>
          <Link href="/about" onClick={closeDrawer}>
            About
          </Link>
          <Link href="/projects" onClick={closeDrawer}>
            Projects
          </Link>
          <Link href="/contact" onClick={closeDrawer}>
            Contact
          </Link>
          <Link href="/management">Management</Link>
          <Link href="/design_philosophy">Design Philosophy</Link>
          <Link href="/career">Career</Link>
          <Link href="/nrb">NRB</Link>
          {user?.userId && <Link href="/dashboard">Dashboard</Link>}
          {!user?.userId && (
            <Link href="/login" onClick={closeDrawer}>
              Login
            </Link>
          )}
        </div>
      </Drawer>
    </header>
  );
}
