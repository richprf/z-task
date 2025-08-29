"use client";

import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function TotalMarketCap() {
  const cryptoList = useSelector((state: RootState) => state.crypto.list);

  const totalMarketCap = cryptoList.reduce(
    (sum, coin) => sum + coin.quotes[0].marketCap,
    0
  );

  return (
    <Card className=" bg-gray-900 text-white">
      <CardHeader>
        <h1>Total Market Cap</h1>
      </CardHeader>
      <CardBody>
        {cryptoList.length === 0 ? (
          <div>
            <Skeleton />
            <div className="h-16 w-16 bg-gray-700 animate-pulse rounded" />
          </div>
        ) : (
          <p className="text-2xl font-bold">
            ${totalMarketCap.toLocaleString()}
          </p>
        )}
      </CardBody>
    </Card>
  );
}
