import { combineReducers } from "redux";
import { userReducer } from "./slices/exampleSlice";

export const rootReducer = combineReducers({
  example: userReducer,
});

export type RootStoreType = ReturnType<typeof rootReducer>;
