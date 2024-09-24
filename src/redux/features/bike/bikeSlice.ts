import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TBike } from "../../../types";
import toast from "react-hot-toast";

type TInitialState = {
	bike: TBike[];
};

const initialState: TInitialState = {
	bike: [],
};

export const bikeSlice = createSlice({
	name: "bike",
	initialState: initialState,
	reducers: {
		addToCompare: (state, action: PayloadAction<TBike>) => {
			const duplicate = state.bike.find(
				(bike) => bike._id === action.payload._id
			);
			if (!duplicate) {
				if (state.bike.length >= 5) {
					toast.error("Maximum 5 bike can be compared");
				} else {
					state.bike.push(action.payload);
					toast.success("Added to comapre");
				}
			}
			if (duplicate) {
				toast.error("Bike already added");
			}
		},
		removeFromCompare: (state, action: PayloadAction<string>) => {
			state.bike = state.bike.filter(
				(item) => item._id !== action.payload
			);
		},
		emptyComprare: (state) => {
			state.bike = [];
		},
	},
});

export const { addToCompare, removeFromCompare, emptyComprare } =
	bikeSlice.actions;

export const selectCount = (state: RootState) => state.bike.bike;

export default bikeSlice.reducer;
