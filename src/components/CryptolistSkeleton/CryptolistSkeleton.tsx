'use client'

import React from "react";

export default function CryptoListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 border rounded-lg relative overflow-hidden"
        >
          {/* انیمیشن Shimmer */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

          {/* سمت چپ (اسم و لوگو) */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* سمت راست (قیمت و تغییرات) */}
          <div className="text-right">
            <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-14 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

