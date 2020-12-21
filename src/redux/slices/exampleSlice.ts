import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ofType } from "redux-observable"
import { Observable } from "rxjs"
import { map, withLatestFrom } from 'rxjs/operators'
import { RootStoreType } from "../rootReducer"
import { MyEpic } from "../store"

type UserReducer = {
    globalValue: any
}

const initialState: UserReducer = {
    globalValue: {}
}

const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        set: (state, action) => { state.globalValue = action.payload }
    },
})


const exampleEpic: MyEpic = (action$: Observable<PayloadAction<undefined>>, state$: Observable<RootStoreType>) =>
    action$.pipe(
        ofType(userActions.set.type),
        withLatestFrom(state$),
        map(([action, state]) => {
            console.log(`exampleEpic: I am reacting to ${state.userInfo.globalValue}`)

            // Epics are a stream of actions-in, actions-out
            return { type: 'useless_action' }
        })
    )

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
export const exampleEpics = [exampleEpic]