"use client";

import { Button, Card, Row, Col, Typography, Space } from "antd";
import {
  TeamOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Paragraph } = Typography;

export default function Employees() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* <Card>
          <Space direction="vertical" size="large" className="w-full">
            <div className="text-center">
              <Title level={1} className="!text-2xl sm:!text-3xl">
                <TeamOutlined className="mr-2" />
                Employee Management
              </Title>
              <Paragraph className="text-gray-600">
                Manage your team members and their access permissions
              </Paragraph>
            </div>

            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  className="text-center h-full border-2 border-dashed border-gray-200 hover:border-blue-300"
                  onClick={() => router.push("/dashboard/employee/create")}
                >
                  <PlusOutlined className="text-4xl text-gray-400 mb-4" />
                  <Title level={4} className="!text-gray-700">
                    Register New Employee
                  </Title>
                  <Paragraph className="text-gray-500 text-sm">
                    Add a new team member to the system
                  </Paragraph>
                </Card>
              </Col>
            </Row>

            <div className="text-center pt-4">
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push("/")}
              >
                Back to Home
              </Button>
            </div>
          </Space>
        </Card> */}
      </div>
    </div>
  );
}
