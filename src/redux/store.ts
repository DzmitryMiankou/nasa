import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { httpReducer } from "./api/rest";

const rootReducers = combineReducers({
  [httpReducer.reducerPath]: httpReducer.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(httpReducer.middleware),
});

export default store;
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
