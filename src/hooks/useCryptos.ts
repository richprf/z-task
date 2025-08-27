"use client";

import { useEffect, useState } from "react";
import { saveCryptos, getCryptos } from "@/lib/db";

const API_URL =
  "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=100&sortBy=rank&sortType=desc&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap";

export function useCryptos() {
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  async function fetchAndSave() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const list = data.data.cryptoCurrencyList;
      await saveCryptos(list);
      setCryptos(list);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    (async () => {
      const localData = await getCryptos();
      if (localData.length > 0) {
        setCryptos(localData);
        setLoading(false);
      }
  
      await fetchAndSave();
      setLoading(false);
    })();


    const interval = setInterval(fetchAndSave, 60000);
    return () => clearInterval(interval);
  }, []);

  return { cryptos, loading };
}
