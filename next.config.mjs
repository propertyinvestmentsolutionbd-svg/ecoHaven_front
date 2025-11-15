/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // port and pathname are optional, but included for clarity
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        // port and pathname are optional, but included for clarity
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        // port and pathname are optional, but included for clarity
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
