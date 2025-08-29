"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { Select, SelectItem} from "@heroui/react";
import { setNetworkFilter } from "@/store/slices/cryptoFilter";

export default function CryptoList() {
  const dispatch = useDispatch();

  const networkFilter = useSelector(
    (state: RootState) => state.cryptoFilter.networkFilter
  );

  return (
    <div className="flex justify-between">
      
      <Select
        label="Filter by Network"
        className="pl-2"
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
      <p className="w-1/2 flex flex-row-reverse items-center"> Network  </p>
    </div>
  );
}
