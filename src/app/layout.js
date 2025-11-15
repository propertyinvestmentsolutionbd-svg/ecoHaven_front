import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import StyledComponentsRegistry from "@/lib/registry";
import Providers from "@/lib/Providers";
import ToastProvider from "@/components/common/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EcoHaven",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <ConfigProvider theme={{ hashed: false }}>
            <StyledComponentsRegistry>
              {children}
              <ToastProvider />
            </StyledComponentsRegistry>
          </ConfigProvider>
        </body>
      </html>
    </Providers>
  );
}
