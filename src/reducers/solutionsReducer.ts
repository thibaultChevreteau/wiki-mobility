import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import solutionsService from "../services/solution";
import { Dispatch } from "redux";
import { RootState } from "../store";
import { NewSolution, Solution } from "../types";

const solutionSlice = createSlice({
	name: "solutions",
	initialState: [] as Solution[],
	reducers: {
		set(_state, action: PayloadAction<Solution[]>) {
			return action.payload;
		},
		addNew(state, action: PayloadAction<Solution>) {
			return [...state, action.payload];
		},
		update(state, action: PayloadAction<Solution>) {
			const updatedSolution = action.payload;
			const updatedSolutions = state.map((solution: Solution) =>
				solution.id === updatedSolution.id ? updatedSolution : solution
			);
			return updatedSolutions;
		},
	},
});

export const { set, update, addNew } = solutionSlice.actions;

export const setSolutions = () => {
	return async (dispatch: Dispatch, _getState: () => RootState) => {
		const solutions = await solutionsService.getAll();
		dispatch(set(solutions));
	};
};

export const addNewSolution = (object: NewSolution, accessToken: string) => {
	return async (dispatch: Dispatch) => {
		const newSolutionWithId = await solutionsService.addNew(
			object,
			accessToken
		);
		dispatch(addNew(newSolutionWithId));
		return newSolutionWithId;
	};
};

export const updateSolution = (object: Solution, accessToken: string) => {
	return async (dispatch: Dispatch) => {
		const updatedSolution = await solutionsService.update(object, accessToken);
		dispatch(update(updatedSolution));
	};
};

export default solutionSlice.reducer;
