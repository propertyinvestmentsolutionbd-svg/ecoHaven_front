import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query({
      query: () => {
        return {
          url: `/contacts`,
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

    addContacts: build.mutation({
      query: (payload) => ({
        url: `/contacts`,
        method: "POST",
        data: payload,
      }),
    }),
    // updateCareer: build.mutation({
    //   query: (payload) => ({
    //     url: `/contacts/${payload.id}`,
    //     method: "put",
    //     data: payload,
    //   }),
    // }),
    removeContacts: build.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
    }),
    markContacts: build.mutation({
      query: (id) => ({
        url: `/contacts/${id}/read`,
        method: "patch",
      }),
    }),
  }),
  //   overrideExisting: false,
});

export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useRemoveContactsMutation,
  useMarkContactsMutation,
} = contactApi;
