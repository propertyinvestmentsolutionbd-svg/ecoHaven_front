"use client";

import React, { useState } from "react";
import { Input, Drawer } from "antd";
import { SearchOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import "./Header.css";
import Link from "next/link";

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
        <Link href="/">Home</Link>
        <Link href="#">About</Link>
        <Link href="#">Projects</Link>
        <Link href="#">Contact</Link>
      </nav>

      {/* Right - Login and Search */}
      <div className={"rightSection"}>
        <Link href="/login" className={"loginBtn"}>
          Login
        </Link>
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
          <Link href="#" onClick={closeDrawer}>
            About
          </Link>
          <Link href="#" onClick={closeDrawer}>
            Projects
          </Link>
          <Link href="#" onClick={closeDrawer}>
            Contact
          </Link>
          <Link href="/login" onClick={closeDrawer}>
            Login
          </Link>
        </div>
      </Drawer>
    </header>
  );
}
