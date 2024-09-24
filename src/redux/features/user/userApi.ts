import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllUser: builder.query({
			query: () => {
				return {
					url: `/users/`,
					method: "GET",
				};
			},
			providesTags: ["users"],
		}),
		getProfile: builder.query({
			query: () => {
				return {
					url: `/users/me`,
					method: "GET",
				};
			},
			providesTags: ["user"],
		}),
		updateProfile: builder.mutation({
			query: (data) => ({
				url: `/users/me`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["user"],
		}),
		updateUserById: builder.mutation({
			query: (data) => ({
				url: `/users/${data.id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["users"],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["users"],
		}),
	}),
});

export const {
	useGetAllUserQuery,
	useGetProfileQuery,
	useUpdateProfileMutation,
	useUpdateUserByIdMutation,
	useDeleteUserMutation,
} = userApi;
