"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  setSearch,
  setFilterPrice,
  setSortBy,
} from "@/store/slices/cryptoFilter";
import { Input } from "@heroui/react";

export default function CryptoFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.cryptoFilter);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="flex gap-4 mb-4"></div>

      <Input
        type="text"
        placeholder="Search by name or symbol..."
        value={filter.search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="border p-2 rounded w-full md:w-1/3"
      />

      <input
        type="number"
        placeholder="Min Price"
        value={filter.minPrice ?? ""}
        onChange={(e) =>
          dispatch(
            setFilterPrice({
              min: Number(e.target.value) || undefined,
              max: filter.maxPrice,
            })
          )
        }
        className="border p-2 rounded w-full md:w-1/6"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={filter.maxPrice ?? ""}
        onChange={(e) =>
          dispatch(
            setFilterPrice({
              min: filter.minPrice,
              max: Number(e.target.value) || undefined,
            })
          )
        }
        className="border p-2 rounded w-full md:w-1/6"
      />
    </div>
  );
}
