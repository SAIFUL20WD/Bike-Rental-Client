import { baseApi } from "../../api/baseApi";

const couponApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllCoupons: builder.query({
			query: () => `/coupons`,
			providesTags: ["coupons"],
		}),
		getCouponById: builder.query({
			query: (id) => {
				return {
					url: `/coupons/${id}`,
					method: "GET",
				};
			},
		}),
		addCoupon: builder.mutation({
			query: (data) => ({
				url: "/coupons",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["coupons"],
		}),
		updateCoupon: builder.mutation({
			query: (data) => ({
				url: `/coupons/${data.id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["coupons"],
		}),
		deleteCoupon: builder.mutation({
			query: (id) => ({
				url: `/coupons/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["coupons"],
		}),
		applyCoupon: builder.mutation({
			query: (data) => ({
				url: `/coupons/apply-coupon`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["rentals"],
		}),
	}),
});

export const {
	useGetAllCouponsQuery,
	useGetCouponByIdQuery,
	useAddCouponMutation,
	useUpdateCouponMutation,
	useDeleteCouponMutation,
	useApplyCouponMutation,
} = couponApi;
