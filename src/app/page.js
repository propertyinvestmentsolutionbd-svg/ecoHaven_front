"use client";

import { Button, Card, Row, Col, Typography, Space } from "antd";
import {
  TeamOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Hero from "@/components/Landing/Hero";
import ReviewSection from "@/components/Landing/Review";
import ServicesSection from "@/components/Landing/Service";
import ImagePopup from "@/components/Landing/ImagePopup";
import YouTubeSection from "@/components/Landing/Video";
import StatsSection from "@/components/Landing/Stats";
import Partners from "@/components/Landing/Partners";
import RoyalStandard from "@/components/Landing/PhotoSlider";

const { Title, Paragraph } = Typography;

export default function Employees() {
  const router = useRouter();

  return (
    <>
      <Hero />
      <RoyalStandard />
      <ReviewSection />
      <ServicesSection />
      <YouTubeSection />
      <StatsSection />
      <Partners />
    </>
  );
}
