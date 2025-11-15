import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userCreate: build.mutation({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        data: payload,
      }),
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `auth/signin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
  //   overrideExisting: false,
});

export const { useUserCreateMutation, useUserLoginMutation } = userApi;
