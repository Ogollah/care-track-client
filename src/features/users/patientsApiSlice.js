import { apiSlice } from "../../app/api/api";

export const patientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/v1/patients",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetPatientsQuery } = patientsApiSlice;
