"use client";

import React, { useState } from "react";
import { Input, Drawer } from "antd";
import { SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import "./Header.css";

export default function Header() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const showDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className={"header"}>
      {/* Left - Logo */}
      <div className={"logo"}>
        <Image src="/logo.png" alt="Logo" width={90} height={45} />
      </div>

      {/* Center - Navigation (Desktop) */}
      <nav className={"nav"}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Projects</a>
        <a href="#">Contact</a>
      </nav>

      {/* Right - Login and Search */}
      <div className={"rightSection"}>
        <a href="#" className={"loginBtn"}>
          Login
        </a>
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
          <a href="#" onClick={closeDrawer}>
            Home
          </a>
          <a href="#" onClick={closeDrawer}>
            About
          </a>
          <a href="#" onClick={closeDrawer}>
            Projects
          </a>
          <a href="#" onClick={closeDrawer}>
            Contact
          </a>
          <a href="#" onClick={closeDrawer}>
            Login
          </a>
        </div>
      </Drawer>
    </header>
  );
}
