import { axiosBaseQuery } from "@/utils/axiosBaseQuery";
import { getBaseUrl } from "@/utils/helper";
import { createApi } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: getBaseUrl(),
  }),
  endpoints: (build) => ({}),
  tagTypes: ["user"],
});
