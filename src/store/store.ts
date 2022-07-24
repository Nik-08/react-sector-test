import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./feature/posts";

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
