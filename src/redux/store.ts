import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authSlice from "./features/auth/authSlice";
import bikeSlice from "./features/bike/bikeSlice";

export const store = configureStore({
	reducer: {
		bike: bikeSlice,
		auth: authSlice,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
