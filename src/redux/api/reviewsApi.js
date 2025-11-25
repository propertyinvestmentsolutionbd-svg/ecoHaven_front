import { baseApi } from "./baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query({
      query: () => {
        return {
          url: `/reviews`,
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
    removeReview: build.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  //   overrideExisting: false,
});

export const { useGetReviewsQuery, useRemoveReviewMutation } = reviewsApi;
