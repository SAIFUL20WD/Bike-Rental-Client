import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem("token");
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQuery,
	tagTypes: [
		"bikes",
		"brands",
		"models",
		"user",
		"users",
		"rentals",
		"coupons",
	],
	endpoints: () => ({}),
});
