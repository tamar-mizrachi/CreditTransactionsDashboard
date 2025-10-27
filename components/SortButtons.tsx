"use client";

import React from "react";

interface Props {
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

export default function SortButtons({ sortOrder, setSortOrder }: Props) {
  return (
    <button
      onClick={() => setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))}
      className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
        sortOrder === "asc" ? "bg-blue-400 text-white" : "bg-yellow-400 text-white"
      }`}
    >
      Sort: {sortOrder === "asc" ? "Old → New" : "New → Old"}
    </button>
  );
}
