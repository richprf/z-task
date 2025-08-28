"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/store";
import { setCryptoList } from "@/store/slices/cryptoSlice";
import { getCryptos, saveCryptos } from "@/lib/db";
import CryptoPagination from "@/components/CryptoPagination/CryptoPagination";

import CryptoSparkline from "@/components/CryptoSparkline/CryptoSparkline";

const fetchCrypto = async () => {
  const res = await fetch("/api/cryptos");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptoList = useSelector((state: RootState) => state.crypto.list);
  const filter = useSelector((state: RootState) => state.cryptoFilter);
  const [loadingLocal, setLoadingLocal] = useState(true);
  const [page, setPage] = useState(1);

  const filteredData = cryptoList.filter((coin: any) => {
    const matchesSearch =
      coin.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.search.toLowerCase());
    const price = coin.quotes[0].price;
    const marketCap = coin.quotes[0].marketCap;
    const change24h = coin.quotes[0].percentChange24h;

    const matchesMin =
      filter.minPrice === undefined || price >= filter.minPrice;
    const matchesMax =
      filter.maxPrice === undefined || price <= filter.maxPrice;

    const networkName = coin.platform?.name || "unknown";
    const matchesNetwork =
      filter.networkFilter === "all" ||
      networkName.toLowerCase() === filter.networkFilter.toLowerCase();

    const matchesCategory =
      filter.categoryFilter === "all" ||
      (coin.category || "unknown").toLowerCase() ===
        filter.categoryFilter.toLowerCase();

    const matchesMinMarketCap =
      filter.minMarketCap === undefined || marketCap >= filter.minMarketCap;
    const matchesMaxMarketCap =
      filter.maxMarketCap === undefined || marketCap <= filter.maxMarketCap;

    const matchesChangeMin =
      filter.minChange24h === undefined || change24h >= filter.minChange24h;
    const matchesChangeMax =
      filter.maxChange24h === undefined || change24h <= filter.maxChange24h;

    return (
      matchesSearch &&
      matchesMin &&
      matchesMax &&
      matchesNetwork &&
      matchesCategory &&
      matchesMinMarketCap &&
      matchesMaxMarketCap &&
      matchesChangeMin &&
      matchesChangeMax
    );
  });

  const sortedData = [...filteredData];

  switch (filter.sortBy) {
    case "newest":
      sortedData.sort(
        (a, b) =>
          new Date(b.date_added).getTime() - new Date(a.date_added).getTime()
      );
      break;
    case "volume":
      sortedData.sort((a, b) => b.quotes[0].volume24h - a.quotes[0].volume24h);
      break;
    case "marketCap":
      sortedData.sort((a, b) => b.quotes[0].marketCap - a.quotes[0].marketCap);
      break;
  }

  const rowsPerPage = filter.rowsPerPage;
  const pages = Math.ceil(sortedData.length / rowsPerPage);
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = sortedData.slice(start, end);

  useEffect(() => {
    (async () => {
      const localData = await getCryptos();
      if (localData.length > 0) {
        dispatch(setCryptoList(localData));
      }
      setLoadingLocal(false);
    })();
  }, [dispatch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["crypto"],
    queryFn: fetchCrypto,
  });

  console.log("data ", data);

  useEffect(() => {
    if (data?.data?.cryptoCurrencyList) {
      const freshData = data.data.cryptoCurrencyList;
      dispatch(setCryptoList(freshData));
      saveCryptos(freshData);
    }
  }, [data, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

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
                  <TableCell>{coin.name}</TableCell>
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
      <div className="bg-red-200 z-20  "> \</div>
    </>
  );
};

export default CryptoTable;
