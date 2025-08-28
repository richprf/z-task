"use client";

import { useSelector } from "react-redux";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { selectTrendingCoins } from "@/store/selectors/trendingSelector";

export default function TrendingCoins() {
  const trending = useSelector(selectTrendingCoins);

  return (
    <div>
      <h2 className="text-lg font-bold mb-3 text-white">Dexscan Trending </h2>
      <Table aria-label="Trending coins"         classNames={{
          base: "bg-black text-white rounded-xl",
          th: "bg-gray-900 text-gray-200",
          td: "text-gray-300",
          tr: "hover:bg-gray-800",
        }}>
        <TableHeader>
         <TableColumn>نام</TableColumn>          
          <TableColumn>قیمت</TableColumn>
          <TableColumn>تغییر 24h</TableColumn>
          <TableColumn>حجم 24h</TableColumn>
        </TableHeader>
        <TableBody>
          {trending.map((coin) => {
            const quotes = coin.quotes[0];
            return (
              <TableRow key={coin.id}>
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
                <TableCell>${quotes.price.toFixed(2)}</TableCell>
                <TableCell className={quotes.percentChange24h >= 0 ? "text-green-400" : "text-red-400"}>
                  {quotes.percentChange24h.toFixed(2)}%
                </TableCell>
                <TableCell>${quotes.volume24h.toLocaleString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
