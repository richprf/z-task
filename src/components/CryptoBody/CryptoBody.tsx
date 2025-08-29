"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";

import React, { Dispatch, FC, SetStateAction } from "react";
import CryptoSparkline from "../CryptoSparkline/CryptoSparkline";
import CryptoPagination from "../CryptoPagination/CryptoPagination";

interface pageItemsProps {
  pageItems: any;
  pages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
}

const CryptoBody: FC<pageItemsProps> = ({
  pageItems,
  pages,
  page,
  setPage,
  rowsPerPage,
}) => {
  return (
    <>
      <div> </div>
      <div className="bg-dark-300  text-white">
        <Table aria-label="جدول کاربران" className="bg-dark-300  text-white">
          <TableHeader className="bg-dark-300  text-white">
            <TableColumn>7d Chart</TableColumn>
            <TableColumn>#</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Price (USD)</TableColumn>
            <TableColumn>Market Cap</TableColumn>
            <TableColumn>1h %</TableColumn>
            <TableColumn>24h %</TableColumn>
            <TableColumn>7d %</TableColumn>
            <TableColumn>Volume (24h)</TableColumn>
          </TableHeader>
          <TableBody>
            {pageItems.map((coin: any, i: number) => {
              const quotes = coin.quotes[0];
              return (
                <TableRow
                  key={coin.id}
                  className="bg-gray-800 hover:bg-gray-700"
                >
                  <TableCell>
                    <CryptoSparkline
                      symbol={coin.symbol}
                      color={
                        coin.quotes[0].percentChange7d >= 0 ? "green" : "red"
                      }
                    />
                  </TableCell>
                  <TableCell>{(page - 1) * rowsPerPage + i + 1}</TableCell>
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
                  <TableCell>${quotes.marketCap.toLocaleString()}</TableCell>
                  <TableCell
                    className={
                      quotes.percentChange1h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {quotes.percentChange1h.toFixed(2)}%
                  </TableCell>
                  <TableCell
                    className={
                      quotes.percentChange24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {quotes.percentChange24h.toFixed(2)}%
                  </TableCell>
                  <TableCell
                    className={
                      quotes.percentChange7d >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {quotes.percentChange7d.toFixed(2)}%
                  </TableCell>
                  <TableCell>${quotes.volume24h.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <CryptoPagination total={pages} page={page} onChange={setPage} />
      </div>
    </>
  );
};

export default CryptoBody;
