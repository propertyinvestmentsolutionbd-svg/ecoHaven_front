import axios from "axios";
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params, contentType }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": contentType || "application/json",
        },
        withCredentials: true,
      });
      return {
        data: result.data,
        meta: {
          response: result,
        },
      };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
