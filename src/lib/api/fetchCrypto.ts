import React from 'react'

const fetchCrypto = async () => {
    const res = await fetch("/api/cryptos");
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };
export default fetchCrypto