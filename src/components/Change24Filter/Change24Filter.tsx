"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@heroui/react";
import { setChange24hFilter } from "@/store/slices/cryptoFilter";

export default function Change24hFilter() {
  const dispatch = useDispatch();
  const [min, setMin] = useState<number | "">("");
  const [max, setMax] = useState<number | "">("");

  const applyFilter = () => {
    dispatch(
      setChange24hFilter({
        min: min === "" ? undefined : min,
        max: max === "" ? undefined : max,
      })
    );
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        <Input
          type="number"
          placeholder="Min 24h %"
          value={min.toString()}
          onChange={(e) => setMin(Number(e.target.value))}

        />
        <Input
          type="number"
          placeholder="Max 24h %"
          value={max.toString()}
          onChange={(e) => setMax(Number(e.target.value))}

        />
      </div>
      <div className="my-auto">
        <button onClick={applyFilter}>Apply(24pricechange)</button>
      </div>
    </div>
  );
}
