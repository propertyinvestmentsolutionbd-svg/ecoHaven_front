import { baseApi } from "./baseApi";

const permissionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMenuPermissionByUser: build.query({
      query: (id) => {
        return {
          url: `/menus/user/${id}`,
          method: "GET",
          // params: arg,
        };
      },
    }),
  }),
  //   overrideExisting: false,
});

export const { useGetMenuPermissionByUserQuery } = permissionApi;
