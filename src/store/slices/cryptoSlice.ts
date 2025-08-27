import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CryptoState {
  list: any[];
}

const initialState: CryptoState = {
  list: [],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCryptoList: (state, action: PayloadAction<any[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setCryptoList } = cryptoSlice.actions;
export default cryptoSlice.reducer;

