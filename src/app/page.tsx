"use client";
import CryptoHeader from "@/components/CryptoHeader/CryptoHeader";
import CryptoTable from "@/components/CryptoTable/CryptoTable";
import FilterModal from "@/components/FilterModal/FilterModal";
import AnimatedTabs from "@/components/FilterTab/FilterTab";
import NetworkTabs from "@/components/NetworkTabs/NetworkTabs";
import RowsPerPageSelector from "@/components/RowsPerPageSelector/RowsPerPageSelector";

export default function App() {
  return (
    <>
      <CryptoHeader />
      <div className="pt-10">
        <AnimatedTabs />
      </div>
      <div className="flex justify-between flex-row-reverse">
        <NetworkTabs />
        <div className="flex gap-10">
          <FilterModal />
          <RowsPerPageSelector />
        </div>
      </div>

      <CryptoTable />
    </>
  );
}
