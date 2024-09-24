import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createBooking: builder.mutation({
			query: (data) => {
				return {
					url: `/rentals/create-booking`,
					method: "POST",
					body: data,
				};
			},
		}),
		makeBookingPayment: builder.mutation({
			query: (id) => {
				return {
					url: `/rentals/update-booking/${id}`,
					method: "POST",
				};
			},
		}),
		getUserRentals: builder.query({
			query: (status) => {
				return {
					url: `/rentals?status=${status}`,
					method: "GET",
				};
			},
			providesTags: ["rentals"],
		}),
		getAllUserRentals: builder.query({
			query: () => {
				return {
					url: `/rentals/get-all-user-rentals`,
					method: "GET",
				};
			},
			providesTags: ["rentals"],
		}),
		returnBikeRental: builder.mutation({
			query: (data) => {
				return {
					url: `rentals/${data.id}/return`,
					method: "PUT",
					body: data,
				};
			},
			invalidatesTags: ["rentals"],
		}),
	}),
});

export const {
	useCreateBookingMutation,
	useGetUserRentalsQuery,
	useMakeBookingPaymentMutation,
	useGetAllUserRentalsQuery,
	useReturnBikeRentalMutation,
} = bookingApi;
