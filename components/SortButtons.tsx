"use client";

import React from "react";

interface Props {
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}


// Toggle button for sorting transactions by date

export default function SortButtons({ sortOrder, setSortOrder }: Props) {
  return (
    <button
      onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
      className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md ${
        sortOrder === "asc"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-yellow-500 text-white hover:bg-yellow-600"
      }`}
      aria-label={`Sort transactions ${
        sortOrder === "asc" ? "oldest to newest" : "newest to oldest"
      }`}
      title={`Sort transactions ${sortOrder === "asc" ? "Old → New" : "New → Old"}`}
    >
      {sortOrder === "asc" ? "📅 Old → New" : "📅 New → Old"}
    </button>
  );
}