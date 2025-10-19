import { Inter } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import Header from "../components/Layout/Header";
import { Layout } from "antd";
import "./globals.css";
import PageLoader from "@/components/common/PageLoader";
import Footer from "@/components/Layout/Footer";
import Partners from "@/components/Landing/Partners";
import StatsSection from "@/components/Landing/Stats";
import YouTubeSection from "@/components/Landing/Video";
import ImagePopup from "@/components/Landing/ImagePopup";
import Hero from "@/components/Landing/Hero";

const { Content } = Layout;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Employee Registration",
  description: "Employee registration system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Layout className="min-h-screen">
            <Header />
            <PageLoader />
            <Hero />
            <ImagePopup />
            {children}
            <YouTubeSection />
            <StatsSection />
            <Partners />
            <Footer />
          </Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
