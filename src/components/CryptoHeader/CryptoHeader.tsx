import React from "react";
import CryptoCard from "../CryptoTopCard/CryptoCard";
import TrendingCoins from "../TrendingCoins/TrndingCoins";
import CryptoMarket from "../CryptoMarket/CryptoMarket";

const CryptoHeader = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5 bg-dark-300">
        <CryptoMarket />
        <CryptoCard />
        <TrendingCoins />
      </div>
    </div>
  );
};

export default CryptoHeader;
