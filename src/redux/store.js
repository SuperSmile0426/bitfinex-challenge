import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middlewares";

import { bookReducer, bookActions } from "./slices";

export const socket = null;

const reducer = combineReducers({
  
  book: bookReducer,
});

export const store = configureStore({
  preloadedState: {},
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
      socketMiddleware(socket)
    ),
});

export const AppActions = {
  book: bookActions,
};
