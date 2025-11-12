import { Inter } from "next/font/google";
import Header from "../../components/Layout/Header";
import { Layout } from "antd";
import "../globals.css";
import "./login/login.css";
import Footer from "@/components/Layout/Footer";

import { ConfigProvider } from "antd";
import "../../components/Landing/landing.css";
import StyledComponentsRegistry from "@/lib/registry";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login",
  description: "",
};

export default function GeneralLayout({ children }) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>
    //     <ConfigProvider theme={{ hashed: false }}>
    //       <StyledComponentsRegistry>
    <Layout className="">
      <Header />
      <div className="login-container">
        {/* Left Side - Building Image */}
        <div className="login-image-section">
          <Image
            src={"/loginBg.png"}
            alt="Modern Architecture"
            className="login-building-image"
            fill
          />
        </div>

        {children}
      </div>

      <Footer />
    </Layout>
    //       </StyledComponentsRegistry>
    //     </ConfigProvider>
    //   </body>
    // </html>
  );
}
