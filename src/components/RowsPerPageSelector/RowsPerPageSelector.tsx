"use client";
import { useDispatch, useSelector } from "react-redux";
import { setRowsPerPage } from "@/store/slices/cryptoFilter";
import type { RootState } from "@/store";

export default function RowsPerPageSelector() {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.cryptoFilter.rowsPerPage);

  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Rows per page:</label>
      <select
        value={rows}
        onChange={(e) => dispatch(setRowsPerPage(Number(e.target.value)))}
        className="border px-2 py-1 rounded bg-black text-white"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
}
