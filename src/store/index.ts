import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./slices/cryptoSlice"
import cryptoFilter from "./slices/cryptoFilter"


export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    cryptoFilter: cryptoFilter,
 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
