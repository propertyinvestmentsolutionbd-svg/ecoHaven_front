import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userPassChange: build.mutation({
      query: (payload) => ({
        url: `/${payload.id}/change-password`,
        method: "patch",
        data: payload,
        formData: true,
        // headers: {
        //   "Content-Type": "multipart/form-data;",
        // },
      }),
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/auth/signin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["user"],
    }),
    userVerification: build.mutation({
      query: (payload) => ({
        url: `/auth/verify-2fa`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["user"],
    }),
    userProfile: build.query({
      query: (id) => {
        return {
          url: `/profile/${id}`,
          method: "GET",
          // params: arg,
        };
      },
      // transformResponse: (response: IService[], meta: IMeta) => {
      //   return {
      //     services: response,
      //     meta,
      //   };
      // },
      providesTags: ["service"],
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useUserCreateMutation,
  useUserLoginMutation,
  useUserVerificationMutation,
  useUserProfileQuery,
  useUserPassChangeMutation,
} = userApi;
