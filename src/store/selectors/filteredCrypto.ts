// import { createSelector } from "@reduxjs/toolkit";
// import { RootState } from "../index";

// export const selectFilteredCrypto = createSelector(
//   [
//     (state: RootState) => state.crypto.list,
//     (state: RootState) => state.cryptoFilter.networkFilter,
//   ],
//   (cryptoList, networkFilter) => {
//     console.log("Crypto list:", cryptoList);
//     console.log("Current network filter:", networkFilter);

//     if (!networkFilter || networkFilter === "all") return cryptoList;

//     return cryptoList.filter(
//       (coin) =>
//         coin.network &&
//         coin.network.toLowerCase() === networkFilter.toLowerCase()
//     );
//   }
// );
