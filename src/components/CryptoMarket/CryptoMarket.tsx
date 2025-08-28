import CMC100Dashboard from "../CMC100Dashboard/CMC100Dashboard";
import TotalMarketCap from "../CryptoMarketCap/CryptoMarketCap";

export default function CryptoMarket() {
  return (
    <div className="grid grid-cols-2 gap-5 pt-10">
      <TotalMarketCap /> <CMC100Dashboard />
    </div>
  );
}
