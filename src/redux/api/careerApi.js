import { baseApi } from "./baseApi";

const careerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCareers: build.query({
      query: () => {
        return {
          url: `/careers`,
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

    addCareer: build.mutation({
      query: (payload) => ({
        url: `/careers`,
        method: "POST",
        data: payload,
      }),
    }),
    updateCareer: build.mutation({
      query: (payload) => ({
        url: `/careers/${payload.id}`,
        method: "put",
        data: payload,
      }),
    }),
    removeCareer: build.mutation({
      query: (id) => ({
        url: `/careers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useGetCareersQuery,
  useRemoveCareerMutation,
  useAddCareerMutation,
  useUpdateCareerMutation,
} = careerApi;
