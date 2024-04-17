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
		update(state, action: PayloadAction<Solution>) {
			const updatedSolution = action.payload;
			const updatedSolutions = state.map((solution) =>
				solution.id === updatedSolution.id ? updatedSolution : solution
			);
			return updatedSolutions;
		},
	},
});

export const { set, update } = solutionSlice.actions;

export const setSolutions = () => {
	return async (dispatch: Dispatch, _getState: () => RootState) => {
		const solutions = await solutionsService.getAll();
		dispatch(set(solutions));
	};
};

export const updateSolution = (object: Solution, accessToken: string) => {
	return async (dispatch: Dispatch) => {
		const solution = await solutionsService.update(object, accessToken);
		dispatch(update(solution));
	};
};

export default solutionSlice.reducer;
