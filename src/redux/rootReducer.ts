import { combineReducers } from "redux"
import { userReducer } from './slices/exampleSlice'

export const rootReducer = combineReducers({
  userInfo: userReducer
})

export type RootStoreType = ReturnType<typeof rootReducer>