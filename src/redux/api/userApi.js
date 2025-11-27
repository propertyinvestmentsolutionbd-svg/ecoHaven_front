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
    forgetPass: build.mutation({
      query: (payload) => ({
        url: `/forgot_password`,
        method: "post",
        data: payload,
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
    }),
    allUsers: build.query({
      query: () => {
        return {
          url: `/employees`,
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
    }),
    getAgent: build.query({
      query: () => {
        return {
          url: `/agent`,
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
    }),
    getEmpDropdown: build.query({
      query: () => {
        return {
          url: `/employees/dropdown`,
          method: "GET",
          // params: arg,
        };
      },
    }),
    removeUser: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    updatePermissions: build.mutation({
      query: (payload) => ({
        url: `/menu-permissions/upsert-permissions`,
        method: "PUT",
        data: payload,
      }),
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
  useAllUsersQuery,
  useRemoveUserMutation,
  useGetEmpDropdownQuery,
  useUpdatePermissionsMutation,
  useGetAgentQuery,
  useForgetPassMutation,
} = userApi;
