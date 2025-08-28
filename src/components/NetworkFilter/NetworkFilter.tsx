"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Select, SelectItem, Input } from "@heroui/react";
import { setNetworkFilter } from "@/store/slices/cryptoFilter";

export default function CryptoList() {
  const dispatch = useDispatch();

  const networkFilter = useSelector(
    (state: RootState) => state.cryptoFilter.networkFilter
  );

  return (
    <div className="space-y-4">
      {/* سرچ */}

      {/* فیلتر شبکه */}
      <Select
        label="Filter by Network"
        className="max-w-xs"
        selectedKeys={[networkFilter]}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string;
          dispatch(setNetworkFilter(value));
        }}
      >
        <SelectItem key="all">All Networks</SelectItem>
        <SelectItem key="ethereum">Ethereum</SelectItem>
        <SelectItem key="bsc">Binance Smart Chain</SelectItem>
        <SelectItem key="polygon">Polygon</SelectItem>
      </Select>
    </div>
  );
}
