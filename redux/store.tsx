import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slice/modalSlice";
import expenseSlice from "./slice/expenseSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    expense: expenseSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
