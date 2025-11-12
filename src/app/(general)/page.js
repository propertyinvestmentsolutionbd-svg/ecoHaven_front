"use client";

import { Typography } from "antd";

import Hero from "@/components/Landing/Hero";
import ReviewSection from "@/components/Landing/Review";
import ServicesSection from "@/components/Landing/Service";
import YouTubeSection from "@/components/Landing/Video";
import StatsSection from "@/components/Landing/Stats";
import Partners from "@/components/Landing/Partners";
import RoyalStandard from "@/components/Landing/PhotoSlider";
import GalleriesSection from "@/components/Landing/Gallery";

export default function Employees() {
  return (
    <>
      <Hero />
      <RoyalStandard />
      <ReviewSection />
      <ServicesSection />
      <GalleriesSection />

      <YouTubeSection />
      <StatsSection />
      <Partners />
    </>
  );
}
