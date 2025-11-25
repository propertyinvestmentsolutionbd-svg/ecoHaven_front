import { baseApi } from "./baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // userPassChange: build.mutation({
    //   query: (payload) => ({
    //     url: `/${payload.id}/change-password`,
    //     method: "patch",
    //     data: payload,
    //     formData: true,
    //     // headers: {
    //     //   "Content-Type": "multipart/form-data;",
    //     // },
    //   }),
    // }),
    // userLogin: build.mutation({
    //   query: (loginData) => ({
    //     url: `/auth/signin`,
    //     method: "POST",
    //     data: loginData,
    //   }),
    //   invalidatesTags: ["user"],
    // }),
    // userVerification: build.mutation({
    //   query: (payload) => ({
    //     url: `/auth/verify-2fa`,
    //     method: "POST",
    //     data: payload,
    //   }),
    //   invalidatesTags: ["user"],
    // }),
    getProjectDropDown: build.query({
      query: () => {
        return {
          url: `/projects/dropdown`,
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
    getProjectLocationDropDown: build.query({
      query: () => {
        return {
          url: `/projects/location/dropdown`,
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
    allProjects: build.query({
      query: () => {
        return {
          url: `/projects`,
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
    allGallery: build.query({
      query: () => {
        return {
          url: `/project/all-gallery`,
          method: "GET",
          // params: arg,
        };
      },
    }),
    getProjectsById: build.query({
      query: (id) => {
        return {
          url: `/project/${id}`,
          method: "GET",
          // params: arg,
        };
      },
    }),
    removeProject: build.mutation({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
    }),
    removeProjectGalleryItem: build.mutation({
      query: (id) => ({
        url: `/gallery-items/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useAllProjectsQuery,
  useRemoveProjectMutation,
  useGetProjectDropDownQuery,
  useRemoveProjectGalleryItemMutation,
  useAllGalleryQuery,
  useGetProjectLocationDropDownQuery,
  useGetProjectsByIdQuery,
} = projectApi;
