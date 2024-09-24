import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllBikes: builder.query({
			query: (query) => `/bikes?${query}`,
			providesTags: ["bikes"],
		}),
		getBikesByTag: builder.query({
			query: (tag) => `/bikes/get-bike-by-tag?tag=${tag}`,
			providesTags: ["bikes"],
		}),
		getAllBrands: builder.query({
			query: () => `/bikes/brands`,
			providesTags: ["brands"],
		}),
		getAllModels: builder.query({
			query: () => `/bikes/models`,
			providesTags: ["models"],
		}),
		getBikeById: builder.query({
			query: (id) => {
				return {
					url: `/bikes/${id}`,
					method: "GET",
				};
			},
		}),
		addBike: builder.mutation({
			query: (data) => ({
				url: "/bikes",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["bikes"],
		}),
		updateBike: builder.mutation({
			query: (data) => ({
				url: `/bikes/${data.id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["bikes"],
		}),
		deleteBike: builder.mutation({
			query: (id) => ({
				url: `/bikes/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["bikes"],
		}),
	}),
});

export const {
	useGetAllBikesQuery,
	useGetBikesByTagQuery,
	useGetAllBrandsQuery,
	useGetAllModelsQuery,
	useGetBikeByIdQuery,
	useAddBikeMutation,
	useUpdateBikeMutation,
	useDeleteBikeMutation,
} = bikeApi;
