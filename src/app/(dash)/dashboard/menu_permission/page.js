"use client";
import React, { useState, useEffect } from "react";
import { Layout, Select, Table, Checkbox, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import "./MenuPermissions.css";
import { useGetMenuPermissionByUserQuery } from "@/redux/api/permissionApi";
import {
  useGetEmpDropdownQuery,
  useUpdatePermissionsMutation,
} from "@/redux/api/userApi";
import { toast } from "react-toastify";

const { Content } = Layout;

const MenuPermissions = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [menuPermissions, setMenuPermissions] = useState([]);
  const [initialPermissions, setInitialPermissions] = useState(new Set());

  // RTK Query hooks
  const { data: employeesData, isLoading: loadingEmployees } =
    useGetEmpDropdownQuery();
  const {
    data: permissionsData,
    isLoading: loadingPermissions,
    refetch: refetchPermissions,
  } = useGetMenuPermissionByUserQuery(selectedEmployee, {
    skip: !selectedEmployee, // Only fetch when employee is selected
  });

  const [updatePermissions, { isLoading: saving }] =
    useUpdatePermissionsMutation();

  // Use actual data from API
  const employees = employeesData?.data || [];

  // Update menu permissions when permissions data changes
  useEffect(() => {
    if (permissionsData?.success && permissionsData.data) {
      const data = permissionsData.data;

      // Transform the API response to match our table structure
      const permissions =
        data.availableMenus?.map((menu) => ({
          id: menu.menuId,
          menuName: menu.menuName,
          menuDescription: menu.menuDescription,
          hasPermission: menu.isAssigned,
        })) || [];

      setMenuPermissions(permissions);

      // Store initial permissions for change detection
      const permissionSet = new Set(
        permissions.filter((p) => p.hasPermission).map((p) => p.id)
      );
      setInitialPermissions(permissionSet);
    }
  }, [permissionsData]);

  const handleEmployeeChange = (employeeId) => {
    setSelectedEmployee(employeeId);
    // Permissions will be automatically fetched via RTK Query
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
      toast.warning("Please select an employee first");
      return;
    }

    try {
      // Prepare permissions data for API
      const permissionsData = menuPermissions.map((menu) => ({
        menuId: menu.id,
        canView: menu.hasPermission,
        canEdit: false, // Set based on your requirements
        canDelete: false, // Set based on your requirements
      }));

      const result = await updatePermissions({
        userId: selectedEmployee,
        permissions: permissionsData,
      }).unwrap();

      if (result.success) {
        toast.success("Menu permissions updated successfully");

        // Update initial permissions to match current state
        const permissionSet = new Set(
          menuPermissions.filter((m) => m.hasPermission).map((m) => m.id)
        );
        setInitialPermissions(permissionSet);

        // Refresh permissions data
        refetchPermissions();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log("Error saving permissions:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to update permissions"
      );
    }
  };

  const hasChanges = () => {
    if (!selectedEmployee) return false;

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
      // width: 120,
    },
    // {
    //   title: "Description",
    //   dataIndex: "menuDescription",
    //   key: "menuDescription",
    //   width: 300,
    //   render: (description) => description || "-",
    // },
    {
      title: "Permission",
      key: "permission",
      // width: 50,
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
            options={employees}
            loading={loadingEmployees}
            filterOption={(input, option) => {
              const label = option?.label || "";
              return label.toLowerCase().includes(input.toLowerCase());
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
                loading={loadingPermissions}
                pagination={false}
                scroll={{ x: 670 }}
                className="permissions-table"
                locale={{
                  emptyText: "No menu permissions found",
                }}
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
