"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  symbol: string; 
  color?: string; 
}

interface SparklineData {
  date: string;
  price: number;
}

export default function CryptoSparkline({ symbol, color = "#4ade80" }: Props) {
  const [data, setData] = useState<SparklineData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSparkline = async () => {
      try {
        const res = await fetch(`/api/crypto/${symbol}/sparkline7d`);
        const json = await res.json();

        const chartData = json.map((price: number, index: number) => ({
          date: `Day ${index + 1}`,
          price,
        }));
        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch sparkline", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSparkline();
  }, [symbol]);

  if (loading) return <p>Loading chart...</p>;
  if (!data.length) return <p>No chart data</p>;

  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={data}>
        <XAxis dataKey="date" hide />
        <YAxis domain={["dataMin", "dataMax"]} hide />
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
