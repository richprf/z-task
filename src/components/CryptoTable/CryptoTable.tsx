"use client";

import {
  Spinner,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setCryptoList } from "@/store/slices/cryptoSlice";
import { getCryptos, saveCryptos } from "@/lib/db";
import fetchCrypto from "@/lib/api/fetchCrypto";
import CryptoBody from "../CryptoBody/CryptoBody";
import CryptoListSkeleton from "../CryptolistSkeleton/CryptolistSkeleton";

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
    refetchInterval: 60000,
  });

  useEffect(() => {
    if (data?.data?.cryptoCurrencyList) {
      const freshData = data.data.cryptoCurrencyList;
      dispatch(setCryptoList(freshData));
      saveCryptos(freshData);
    }
  }, [data, dispatch]);

  if (isLoading)
    return  <CryptoListSkeleton />
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <CryptoBody
        pageItems={pageItems}
        pages={pages}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
      />
    </>
  );
};

export default CryptoTable;
