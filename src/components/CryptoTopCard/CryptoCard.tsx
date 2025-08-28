"use client";

import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export default function TrendingTable() {
  const coins = useSelector((state:RootState) => state.crypto.list)
 
  return (
    <div>
      <h2 className="text-xl font-bold mb-3"> Trending Coins</h2>
      <Table
        aria-label="Trending Coins Table"
        shadow="sm"
        className="bg-black"
        classNames={{
          base: "bg-black text-white rounded-xl",
          th: "bg-gray-900 text-gray-200",
          td: "text-gray-300",
          tr: "hover:bg-gray-800",
        }}
      >
        <TableHeader >
          <TableColumn>#</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>24h %</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No trending coins."} className="bg-black">
          {coins.slice(0, 5).map((coin: any, i: number) => (
            <TableRow key={coin.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                    alt={coin.name}
                    className="w-6 h-6"
                  />
                  {coin.name} ({coin.symbol})
                </div>
              </TableCell>
              <TableCell>${coin.quotes[0]?.price.toFixed(2)}</TableCell>
              <TableCell
                className={
                  coin.quotes[0]?.percentChange24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {coin.quotes[0]?.percentChange24h.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

