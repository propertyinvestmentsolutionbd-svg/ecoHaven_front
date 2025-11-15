export const getBaseUrl = () => {
  return "http://localhost:5000/api/v1";
};
export const storeUserInfo = ({ accessToken }) => {
  return setToLocalStorage("accessToken", accessToken);
};
