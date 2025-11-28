import axios from "axios";
import { getNewAccessToken } from "./helper";
import config from "../../postcss.config.mjs";
const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 6000;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
  //   { synchronous: true, runWhen: () => /* This function returns true */}
);

// Add a response interceptor
// Add a response interceptor
instance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error) {
    console.log({ error });

    // Handle refresh token failure
    if (
      error?.config?.url?.includes("refresh-token") &&
      error?.response?.status === 403
    ) {
      console.log("Refresh token is invalid - redirecting to login");

      // Clear all stored tokens
      localStorage.removeItem("accessToken");

      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }

    // Handle expired access token
    if (error?.response?.status === 403 && !error.config._retry) {
      error.config._retry = true;
      try {
        const res = await getNewAccessToken();
        console.log({ res });
        const newAccessToken = res?.data?.data?.accessToken;
        console.log("New access token:", newAccessToken);

        if (newAccessToken) {
          // Update localStorage with new token
          localStorage.setItem("accessToken", newAccessToken);

          // Update the failed request config with new token
          error.config.headers.Authorization = newAccessToken;

          // Retry the original request with new token
          return instance(error.config);
        } else {
          throw new Error("No access token received from refresh");
        }
      } catch (refreshError) {
        console.log("Failed to refresh token:", refreshError);

        // Clear tokens and redirect on refresh failure
        localStorage.removeItem("accessToken");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    // Any other errors
    return Promise.reject(error);
  }
);

export { instance };
