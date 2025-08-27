"use client";

import { Pagination } from "@heroui/react";

interface CryptoPaginationProps {
  total: number;
  page: number;
  onChange: (page: number) => void;
}

export default function CryptoPagination({
  total,
  page,
  onChange,
}: CryptoPaginationProps) {
  return (
    <div className="flex justify-center py-4">
      <Pagination
        total={total}
        page={page}
        onChange={onChange}
        showControls
        color="primary"
      />
    </div>
  );
}
