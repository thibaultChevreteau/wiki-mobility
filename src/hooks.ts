import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { useMatch } from "react-router-dom";
import { Solution } from "./types";

export const useFindSolutionByUrlPattern = (
	urlPattern: string,
	solutions: Solution[]
) => {
	const match = useMatch(urlPattern);
	return match
		? solutions.find((solution) => solution.id === match.params.id)
		: null;
};
