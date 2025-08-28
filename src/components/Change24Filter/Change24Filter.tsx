"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button } from "@heroui/react";
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
    <div className="flex gap-2 items-center">
      <Input
        type="number"
        placeholder="Min 24h %"
        value={min.toString()}   
        onChange={(e) => setMin(Number(e.target.value))}
        className="w-24"
      />
      <Input
        type="number"
        placeholder="Max 24h %"
        value={max.toString()}   
        onChange={(e) => setMax(Number(e.target.value))}
        className="w-24"
      />
      <Button onClick={applyFilter} variant="solid" color="primary">
        Apply
      </Button>
    </div>
  );
}
