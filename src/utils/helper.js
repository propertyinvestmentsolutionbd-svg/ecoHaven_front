import { jwtDecode } from "jwt-decode";

export const getBaseUrl = () => {
  return "http://localhost:5000/api/v1";
};

export const decodedToken = (token) => {
  return jwtDecode(token);
};
export const storeUserInfo = ({ accessToken }) => {
  return setToLocalStorage("accessToken", accessToken);
};
export const getUserInfo = () => {
  const authToken = getFromLocalStorage("accessToken");
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};
export const setToLocalStorage = (key, token) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
