import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "volume" | "marketCap"; 
  rowsPerPage: number;
}

const initialState: FilterState = {

  search: "",
  minPrice: undefined, 
  maxPrice: undefined,
  sortBy: "newest",
  rowsPerPage: 10,
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilterPrice: (state, action: PayloadAction<{ min?: number; max?: number }>) => {
        state.minPrice = action.payload.min;
        state.maxPrice = action.payload.max;
      },
      setSortBy: (state, action: PayloadAction<"newest" | "volume" | "marketCap">) => {
        state.sortBy = action.payload;
      },
      setRowsPerPage: (state, action: PayloadAction<number>) => {
        state.rowsPerPage = action.payload;
      },
  },
});

export const { setSearch, setFilterPrice , setSortBy  , setRowsPerPage  } =
  productFilterSlice.actions;

export default productFilterSlice.reducer