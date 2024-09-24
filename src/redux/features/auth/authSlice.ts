import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
	_id: string;
	name: string;
	email: string;
	role: string;
	iat: number;
	exp: number;
};

type TAuthState = {
	user: null | TUser;
	token: null | string;
};

const initialState: TAuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setUser: (state, action) => {
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;