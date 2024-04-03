import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import solutionsService from "../services/solution";
import { Dispatch } from "redux";
import { RootState } from "../store"; // Import RootState type
import { Solution } from "../types";

const solutionSlice = createSlice({
	name: "solutions",
	initialState: [] as Solution[],
	reducers: {
		set(_state, action: PayloadAction<Solution[]>) {
			return action.payload;
		},
	},
});

export const { set } = solutionSlice.actions;

export const setSolutions = () => {
	return async (dispatch: Dispatch, _getState: () => RootState) => {
		const solutions = await solutionsService.getAll();
		dispatch(set(solutions));
	};
};

export default solutionSlice.reducer;
