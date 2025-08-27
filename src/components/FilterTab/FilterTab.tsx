"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSortBy } from "@/store/slices/cryptoFilter";
import { motion } from "framer-motion";

const tabs = [
  { value: "newest", label: "جدیدترین‌ها" },
  { value: "volume", label: "پر بازدیدترین‌ها" },
  { value: "marketCap", label: "محبوب‌ترین‌ها" },
];

export default function AnimatedTabs() {
  const [active, setActive] = useState("newest");
  const dispatch = useDispatch();

  const handleClick = (val: string) => {
    setActive(val);
    dispatch(setSortBy(val as "newest" | "volume" | "marketCap"));
  };

  return (
    <div className="relative flex border-b border-gray-300 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleClick(tab.value)}
          className={`relative px-4 py-2 font-medium text-gray-600 hover:text-blue-500`}
        >
          {tab.label}
          {active === tab.value && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-blue-500 rounded"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}



