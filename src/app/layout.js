import { Inter } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import Header from "../components/Layout/Header";
import { Layout } from "antd";
import "./globals.css";

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
            {children}
          </Layout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
