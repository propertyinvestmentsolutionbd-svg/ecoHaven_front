"use client";
import React, { useState, useEffect } from "react";
import { Layout, Select, Table, Checkbox, Button, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import "./MenuPermissions.css";

const { Content } = Layout;

// Mock data for employees
const mockEmployees = [
  { id: 1, name: "John Doe", email: "john.doe@company.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@company.com" },
  { id: 3, name: "Mike Johnson", email: "mike.johnson@company.com" },
  { id: 4, name: "Sarah Williams", email: "sarah.williams@company.com" },
];

// Mock data for all available menus
const mockMenus = [
  { id: 1, menuName: "Dashboard", route: "/dashboard", category: "Main" },
  {
    id: 2,
    menuName: "Projects",
    route: "/dashboard/projects",
    category: "Main",
  },
  { id: 3, menuName: "Gallery", route: "/dashboard/gallery", category: "Main" },
  { id: 4, menuName: "Blogs", route: "/dashboard/blogs", category: "Main" },
  { id: 5, menuName: "Add Employee", route: "/employee/add", category: "HR" },
  { id: 6, menuName: "Profile", route: "/profile", category: "User" },
  { id: 7, menuName: "Account", route: "/account", category: "User" },
  {
    id: 8,
    menuName: "Menu Permissions",
    route: "/dashboard/menu-permissions",
    category: "Admin",
  },
];

const MenuPermissions = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [menuPermissions, setMenuPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialPermissions, setInitialPermissions] = useState(new Set());

  // Simulate API call to fetch menu permissions for selected employee
  const fetchMenuPermissions = async (employeeId) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock: Randomly assign some permissions
      const permissions = mockMenus.map((menu) => ({
        ...menu,
        hasPermission: Math.random() > 0.5,
      }));

      setMenuPermissions(permissions);
      const permissionSet = new Set(
        permissions.filter((p) => p.hasPermission).map((p) => p.id)
      );
      setInitialPermissions(permissionSet);
    } catch (error) {
      message.error("Failed to load menu permissions");
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeChange = (employeeId) => {
    setSelectedEmployee(employeeId);
    fetchMenuPermissions(employeeId);
  };

  const handlePermissionChange = (menuId, checked) => {
    setMenuPermissions((prev) =>
      prev.map((menu) =>
        menu.id === menuId ? { ...menu, hasPermission: checked } : menu
      )
    );
  };

  const handleSave = async () => {
    if (!selectedEmployee) {
      message.warning("Please select an employee first");
      return;
    }

    setSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedPermissions = menuPermissions.filter((m) => m.hasPermission);

      // In real implementation, send to API:
      // await updateMenuPermissions(selectedEmployee, updatedPermissions);

      message.success("Menu permissions updated successfully");

      // Update initial permissions to match current state
      const permissionSet = new Set(updatedPermissions.map((p) => p.id));
      setInitialPermissions(permissionSet);
    } catch (error) {
      message.error("Failed to update permissions");
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = () => {
    const currentPermissions = new Set(
      menuPermissions.filter((m) => m.hasPermission).map((m) => m.id)
    );

    if (currentPermissions.size !== initialPermissions.size) return true;

    for (const id of currentPermissions) {
      if (!initialPermissions.has(id)) return true;
    }

    return false;
  };

  const columns = [
    {
      title: "Menu Name",
      dataIndex: "menuName",
      key: "menuName",
      width: 200,
    },
    {
      title: "Route",
      dataIndex: "route",
      key: "route",
      width: 250,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
    {
      title: "Permission",
      key: "permission",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Checkbox
          checked={record.hasPermission}
          onChange={(e) => handlePermissionChange(record.id, e.target.checked)}
        />
      ),
    },
  ];

  return (
    <Layout className="menu-permissions-layout">
      <Content className="menu-permissions-content">
        <div className="menu-permissions-header">
          <h1>Menu Permissions Management</h1>
          <p>
            Select an employee to view and manage their menu access permissions
          </p>
        </div>

        <div className="employee-selection-section">
          <label htmlFor="employee-select">Select Employee:</label>
          <Select
            id="employee-select"
            placeholder="Choose an employee"
            onChange={handleEmployeeChange}
            value={selectedEmployee}
            className="employee-select"
            showSearch
            options={mockEmployees.map((employee) => {
              return {
                value: employee.id,
                label: employee.name,
              };
            })}
            // optionFilterProp="children"
            filterOption={(input, option) => {
              const children = option?.children;
              return String(children)
                .toLowerCase()
                .includes(input.toLowerCase());
            }}
          />
        </div>

        {selectedEmployee && (
          <>
            <div className="permissions-table-wrapper">
              <Table
                columns={columns}
                dataSource={menuPermissions}
                rowKey="id"
                loading={loading}
                pagination={false}
                scroll={{ x: 720 }}
                className="permissions-table"
              />
            </div>

            <div className="permissions-actions">
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
                loading={saving}
                disabled={!hasChanges()}
                size="large"
              >
                Save Permissions
              </Button>
            </div>
          </>
        )}

        {!selectedEmployee && (
          <div className="empty-state">
            <p>Please select an employee to view and manage menu permissions</p>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default MenuPermissions;
