import { configureStore } from "@reduxjs/toolkit";
import solutionsReducer from "./reducers/solutionsReducer";

const store = configureStore({
	reducer: {
		solutions: solutionsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
