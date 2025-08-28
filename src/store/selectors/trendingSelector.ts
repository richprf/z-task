import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";


export const selectTrendingCoins = createSelector(
  (state: RootState) => state.crypto.list,
  (coins) => {
    if (!coins) return [];
    return [...coins]
      .sort((a, b) => b.quotes[0].volume24h - a.quotes[0].volume24h)
      .slice(0, 5);
  }
);
