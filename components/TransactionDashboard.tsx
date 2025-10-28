"use client";

import React from "react";
import BalanceDisplay from "./BalanceDisplay";
import FilterButtons from "./FilterButtons";
import SortButtons from "./SortButtons";
import TransactionTable from "./TransactionTable";
import { useTransactions } from "../hooks/useTransactions";

/*
  * Main dashboard component that displays and manages credit card transactions
  * Features: filtering, sorting, real-time updates, error handling
 */
export default function TransactionDashboard() {
  const [filter, setFilter] = React.useState<"All" | "Credit" | "Debit">("All");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");

  const { transactions, error, isLoading } = useTransactions();

  // Calculate balance from all transactions
  const balance = transactions.reduce(
    (acc, t) => (t.type === "Credit" ? acc + t.amount : acc - t.amount),
    0
  );

  // Apply filter and sort
  const displayedTransactions = transactions
    .filter((t) => filter === "All" || t.type === filter)
    .sort((a, b) => {
      const dateA = new Date(a.transactionDate).getTime();
      const dateB = new Date(b.transactionDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error.message || "Unable to connect to the server"}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            🔄 Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Transactions Found</h2>
          <p className="text-gray-600 mb-6">
            Add some transactions in the Strapi admin panel to see them here.
          </p>
        </div>
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💳 Credit Card Transactions</h1>
          <p className="text-gray-500">Monitor your spending and income in real-time</p>
        </div>

        <BalanceDisplay balance={balance} />

        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
          <FilterButtons filter={filter} setFilter={setFilter} />
          <SortButtons sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold">{displayedTransactions.length}</span> of{" "}
            <span className="font-semibold">{transactions.length}</span> transactions
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6">
          <TransactionTable transactions={displayedTransactions} />
        </div>
      </div>
    </div>
  );
}