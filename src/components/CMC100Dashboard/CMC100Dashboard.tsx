"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function CMC100Dashboard() {

  const cryptoList = useSelector((state: RootState) => state.crypto.list);

  
  const cmc100Value = cryptoList
    .slice(0, 100)
    .reduce((sum, coin) => sum + coin.quotes[0].price, 0);

  const cmc100Change = cryptoList
    .slice(0, 100)
    .reduce((sum, coin) => sum + coin.quotes[0].percentChange24h, 0) / 100;

  return (
    <Card className=" bg-gray-900 text-white">
      <CardHeader>
        <h1>CMC100 Index</h1>
      </CardHeader>
      <CardBody>
        <p className="text-2xl font-bold">${cmc100Value.toFixed(2)}</p>
        <p
          className={`text-lg font-semibold ${
            cmc100Change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {cmc100Change.toFixed(2)}%
        </p>
      </CardBody>
    </Card>
  );
}
