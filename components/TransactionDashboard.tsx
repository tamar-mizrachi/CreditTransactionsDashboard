/*"use client";

import React, { useState } from "react";
import useSWR from "swr";
import TransactionTable from "./TransactionTable";
import { Transaction } from "../types/transaction";

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TransactionDashboard() {
  // State for filtering and sorting
  const [filter, setFilter] = useState<"All" | "Debit" | "Credit">("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch data from Strapi API with auto-refresh
  const { data, error, isLoading } = useSWR(
    "http://localhost:1337/api/transactions?populate=*",
    fetcher,
    { refreshInterval: 5000 } // Auto-refresh every 5 seconds
  );

  // Handle error or loading states
  if (error) return <div className="text-red-600 text-center">⚠️ Error fetching data</div>;
  if (isLoading || !data) return <div className="text-center">Loading transactions...</div>;

  // Convert Strapi structure to a clean transaction array
  const transactions: Transaction[] = (data.data || []).map((item: any) => {
    const attr = item.attributes || item; // Fallback if no attributes
    return {
      id: item.id,
      description: attr.description || "",
      amount: attr.amount || 0,
      type: attr.type || "Debit",
      transactionDate: attr.transactionDate || "",
      category: attr.category || "",
    };
  });

  // Calculate total balance
  const balance = transactions.reduce(
    (acc, t) => (t.type === "Credit" ? acc + t.amount : acc - t.amount),
    0
  );

  // Sort transactions by date
  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.transactionDate).getTime();
    const dateB = new Date(b.transactionDate).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Filter transactions by type
  const filteredTransactions =
    filter === "All"
      ? sortedTransactions
      : sortedTransactions.filter((t) => t.type === filter);

  return (
    <div className="p-10 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        💳 Credit Transactions Dashboard
      </h1>

      <h2 className="text-xl font-semibold mb-6 text-center">
        Current Balance:{" "}
        <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>
          {balance >= 0 ? "+" : "-"}${Math.abs(balance).toFixed(2)}
        </span>
      </h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter("All")}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
            filter === "All"
              ? "bg-gray-700 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Credit")}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
            filter === "Credit"
              ? "bg-green-500 text-white"
              : "bg-green-100 hover:bg-green-200 text-green-700"
          }`}
        >
          Credit
        </button>

        <button
          onClick={() => setFilter("Debit")}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
            filter === "Debit"
              ? "bg-red-500 text-white"
              : "bg-red-100 hover:bg-red-200 text-red-700"
          }`}
        >
          Debit
        </button>

        <button
          onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
            sortOrder === "asc"
              ? "bg-blue-400 text-white"
              : "bg-yellow-400 text-white"
          }`}
        >
          Sort: {sortOrder === "asc" ? "Old → New" : "New → Old"}
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-4 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t, index) => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{t.description}</td>
                <td
                  className={`py-3 px-4 font-bold ${
                    t.type === "Credit" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {t.type}
                </td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    t.type === "Credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "Credit" ? "+" : "-"}${t.amount.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-gray-600">
  {(() => {
    const d = new Date(t.transactionDate);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} | ${hours}:${minutes}`;
  })()}
</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
*/

"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { getTransactions } from "../lib/getTransactions";
import TransactionTable from "./TransactionTable";
import { Transaction } from "../types/transaction";

const fetcher = () => getTransactions();

export default function TransactionDashboard() {
  const [filter, setFilter] = useState<"All" | "Credit" | "Debit">("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: transactions = [],
    error,
    isLoading,
    mutate,
  } = useSWR("transactions", getTransactions, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });

  // Filter and sort
  const filteredTransactions = transactions
    .filter((t) => filter === "All" || t.type === filter)
    .sort((a, b) => {
      const dateA = new Date(a.transactionDate).getTime();
      const dateB = new Date(b.transactionDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const balance = filteredTransactions.reduce(
    (acc, t) => (t.type === "Credit" ? acc + t.amount : acc - t.amount),
    0
  );

  if (isLoading) {
    return <div className="text-center p-4">Loading transactions...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <div className="text-red-600 mb-2">⚠️ Error fetching data</div>
        <button
          onClick={() => mutate()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">💳 Credit Transactions Dashboard</h1>

      <h2 className="text-xl font-semibold mb-6 text-center">
        Current Balance:{" "}
        <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>
          {balance >= 0 ? "+" : "-"} ₪{Math.abs(balance).toFixed(2)}
        </span>
      </h2>

      {/* Filter & Sort */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {/* All */}
        <button
          onClick={() => setFilter("All")}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
            filter === "All"
              ? "bg-gray-700 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          All
        </button>

        {/* Credit */}
        <button
          onClick={() => setFilter("Credit")}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
            filter === "Credit"
              ? "bg-green-500 text-white"
              : "bg-green-100 hover:bg-green-200 text-green-700"
          }`}
        >
          Credit
        </button>

        {/* Debit */}
        <button
          onClick={() => setFilter("Debit")}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
            filter === "Debit"
              ? "bg-red-500 text-white"
              : "bg-red-100 hover:bg-red-200 text-red-700"
          }`}
        >
          Debit
        </button>

        {/* Sort */}
        <button
          onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
            sortOrder === "asc" ? "bg-blue-400 text-white" : "bg-yellow-400 text-white"
          }`}
        >
          Sort: {sortOrder === "asc" ? "Old → New" : "New → Old"}
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-4 overflow-x-auto">
        <TransactionTable transactions={filteredTransactions} />
      </div>
    </div>
  );
}
