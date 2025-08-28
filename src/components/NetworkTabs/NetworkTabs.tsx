"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setNetworkFilter } from "@/store/slices/cryptoFilter";
import { motion } from "framer-motion";

const networks = ["all", "Ethereum", "BNB", "Solana", "Polygon"];

export default function NetworkTabs() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.cryptoFilter);

  return (
    <div className="flex  gap-2">
      {networks.map((network) => {
        const isActive = filter.networkFilter.toLowerCase() === network.toLowerCase();

        return (
          <div
            key={network}
            className=" relative cursor-pointer px-4 py-2"
            onClick={() => dispatch(setNetworkFilter(network))}
          >
            <span className={isActive ? "text-blue-500 font-semibold" : "text-gray-300"}>
              {network}
            </span>
            {isActive && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 bottom-0 h-1 bg-blue-500 rounded"
                style={{ width: "100%" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
