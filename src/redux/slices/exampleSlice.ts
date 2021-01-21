import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import { RootStoreType } from "../rootReducer";
import { MyEpic } from "../store";
import SavedVideos from "../../features/savedVideos/SavedVideos";

type Video = {
  _id: string;
  name: string;
  uri: string;
  website: string;
};

type UserReducer = {
  name: String;
  savedVideos: Array<Video>;
};

const initialState: UserReducer = {
  name: "",
  savedVideos: [],
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    pushSavedVideo: (state, action) => {
      if (!state.savedVideos.includes(action.payload)) {
        state.savedVideos.push(action.payload);
      } else {
        state.savedVideos;
      }
    },
    pullSavedVideo: (state, action) => {
      if (SavedVideos.length != 0) {
        state.savedVideos.filter((video) => (video.name = action.payload.name));
      } else {
        state.savedVideos;
      }
    },
  },
});

const exampleEpic: MyEpic = (
  action$: Observable<PayloadAction<undefined>>,
  state$: Observable<RootStoreType>
) =>
  action$.pipe(
    ofType(
      userActions.setName.type,
      userActions.pushSavedVideo.type,
      userActions.pullSavedVideo.type
    ),
    withLatestFrom(state$),
    map(([action, state]) => {
      // console.log(`exampleEpic: I am reacting to ${state.userInfo.name}`)

      // Epics are a stream of actions-in, actions-out
      return { type: "useless_action" };
    })
  );

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const exampleEpics = [exampleEpic];
