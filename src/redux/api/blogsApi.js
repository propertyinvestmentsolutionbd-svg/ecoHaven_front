import { baseApi } from "./baseApi";

const blogsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: () => {
        return {
          url: `/blogs`,
          method: "GET",
          // params: arg,
        };
      },
    }),
    getBlogsById: build.query({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "GET",
          // params: arg,
        };
      },
    }),
    removeBlogs: build.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useGetBlogsQuery,
  useGetBlogsByIdQuery,
  useRemoveBlogsMutation,
} = blogsApi;
