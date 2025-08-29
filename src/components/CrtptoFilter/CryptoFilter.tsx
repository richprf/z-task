"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setSearch, setFilterPrice } from "@/store/slices/cryptoFilter";
import { Input } from "@heroui/react";

export default function CryptoFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.cryptoFilter);

  return (
    <div className="grid grid-cols-1">
      <div className="flex justify-between">
  
        <Input
          type="text"
          placeholder="Search by name or symbol..."
          value={filter.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className=" p-2  "
          classNames={{
            input: "bg-gray-800 text-white placeholder-gray-400",
          }}
        />
      <p className="w-1/2 flex flex-row-reverse items-center"> Search </p>        
      </div>
      <div className="grid grid-cols-3">
        <Input
          type="number"
          placeholder="Min Price"
          value={filter.minPrice?.toString() ?? ""}
          onChange={(e) =>
            dispatch(
              setFilterPrice({
                min: Number(e.target.value) || undefined,
                max: filter.maxPrice,
              })
            )
          }
          className=" p-2 rounded "
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={filter.maxPrice?.toString() ?? ""}
          onChange={(e) =>
            dispatch(
              setFilterPrice({
                min: filter.minPrice,
                max: Number(e.target.value) || undefined,
              })
            )
          }
          className=" p-2 rounded "
        />
        <p className="flex flex-row-reverse items-center">  price   </p>
      </div>
    </div>
  );
}
