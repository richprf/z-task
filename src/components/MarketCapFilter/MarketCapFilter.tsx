import { Input, Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { setMarketCapFilter } from "@/store/slices/cryptoFilter";
import type { RootState } from "@/store";
import { useState } from "react";

export default function MarketCapFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.cryptoFilter);

  const [min, setMin] = useState(filter.minMarketCap || "");
  const [max, setMax] = useState(filter.maxMarketCap || "");

  const applyFilter = () => {
    dispatch(setMarketCapFilter({ min: Number(min) || undefined, max: Number(max) || undefined }));
  };

  return (
    <div className="flex gap-2">
      <Input
        type="number"
        placeholder="Min Market Cap"
        value={min.toString()}   
        onChange={(e) => setMin(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Max Market Cap"
        value={max.toString()}
        onChange={(e) => setMax(e.target.value)}
      />
      <Button onClick={applyFilter}>Apply</Button>
    </div>
  );
}
