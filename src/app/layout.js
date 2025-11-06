import { Inter } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import Header from "../components/Layout/Header";
import { Layout } from "antd";
import "./globals.css";
import PageLoader from "@/components/common/PageLoader";
import Footer from "@/components/Layout/Footer";

import ImagePopup from "@/components/Landing/ImagePopup";
import { ConfigProvider } from "antd";

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
        <ConfigProvider theme={{ hashed: false }}>
          <StyledComponentsRegistry>
            <Layout className="min-h-screen">
              <Header />
              <PageLoader />
              <ImagePopup />

              {children}

              <Footer />
            </Layout>
          </StyledComponentsRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
