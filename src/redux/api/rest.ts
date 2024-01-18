import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./interceptors";

export interface TodayDataType<T extends string> {
  copyright: T;
  date: T;
  explanation: T;
  hdurl: T;
  media_type: T;
  service_version: T;
  title: T;
  url: T;
}

export const httpReducer = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getToday: build.query<TodayDataType<string>[], string>({
      query: (date) => ({
        method: "GET",
        url: `?api_key=IZLdRDIlCm2443uGczqKgJr54l10PK2wifDtsPBG&start_date=${date}&end_date=${""}`,
      }),
    }),
  }),
});

export const { useGetTodayQuery } = httpReducer;
