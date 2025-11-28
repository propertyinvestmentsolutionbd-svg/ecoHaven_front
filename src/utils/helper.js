import { jwtDecode } from "jwt-decode";
import { instance } from "./axiosInstance";

export const getBaseUrl = () => {
  return "http://localhost:5000/api/v1";
};

export const storeUserInfo = ({ accessToken, menus }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("menus", menus);
  }
};

export const getUserInfo = () => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        return decoded;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
  }
  return null;
};
export const getMenus = () => {
  if (typeof window !== "undefined") {
    const menus = localStorage.getItem("menus");
    console.log({ menus });
    if (menus?.length > 0) {
      try {
        return JSON.parse(menus);
      } catch (error) {
        console.error("Error :", error);
        return null;
      }
    }
  }
  return null;
};

export const removeUserInfo = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }
};
export const getNewAccessToken = async () => {
  return await instance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
