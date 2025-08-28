import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "volume" | "marketCap"; 
  rowsPerPage: number;
  networkFilter: string;
  categoryFilter: string;
  minMarketCap?: number; 
  maxMarketCap?: number;
  minChange24h?: number; 
  maxChange24h?: number;
}

const initialState: FilterState = {

  search: "",
  minPrice: undefined, 
  maxPrice: undefined,
  sortBy: "newest",
  rowsPerPage: 10,
  networkFilter: "all",
  categoryFilter: "all", 
  minMarketCap: undefined,
  maxMarketCap: undefined,
  minChange24h: undefined,
  maxChange24h: undefined,
  
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
      setNetworkFilter: (state, action: PayloadAction<string>) => {
        state.networkFilter = action.payload;
      },
      setCategoryFilter: (state, action: PayloadAction<string>) => {
        state.categoryFilter = action.payload;
      },
      setMarketCapFilter: (
        state,
        action: PayloadAction<{ min?: number; max?: number }>
      ) => {
        state.minMarketCap = action.payload.min;
        state.maxMarketCap = action.payload.max;
      },
      setChange24hFilter: (state, action: PayloadAction<{ min?: number; max?: number }>) => {
        state.minChange24h = action.payload.min;
        state.maxChange24h = action.payload.max;
      },
  },
});

export const { setSearch, setFilterPrice , setSortBy  , setRowsPerPage , setNetworkFilter , setCategoryFilter , setMarketCapFilter , setChange24hFilter  } =
  productFilterSlice.actions;

export default productFilterSlice.reducer