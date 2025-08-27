"use client";
import CryptoHeader from "@/components/CryptoHeader/CryptoHeader";
import CryptoTable from "@/components/CryptoTable/CryptoTable";
import AnimatedTabs from "@/components/FilterTab/FilterTab";
import RowsPerPageSelector from "@/components/RowsPerPageSelector/RowsPerPageSelector";

export default function App() {
  return (
    <>
      <CryptoHeader />
      <AnimatedTabs />
      <RowsPerPageSelector /> <CryptoTable />
    </>
  );
}
