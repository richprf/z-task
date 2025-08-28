import { Select, SelectItem } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryFilter } from "@/store/slices/cryptoFilter";
import type { RootState } from "@/store";

const categories = ["all", "Adult", "AI Agents", "Gaming", "Layer 1", "Layer 2"];

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.cryptoFilter);

  return (
    <Select
      label="Filter by Category"
      value={filter.categoryFilter}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0] as string;
        dispatch(setCategoryFilter(value));
      }}
    >
      {categories.map((cat) => (
        <SelectItem key={cat}>{cat}</SelectItem>
      ))}
    </Select>
  );
}
