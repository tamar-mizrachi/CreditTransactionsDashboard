"use client";

import useSWR from "swr";
import { getTransactions } from "../lib/getTransactions";    
import { REFRESH_INTERVAL } from "../lib/config";
import { Transaction } from "../types/transaction";

/*
 * Custom hook to fetch and manage transactions with SWR
 */
export function useTransactions() {
  const { data: transactions = [], error, isLoading } = useSWR<Transaction[]>(
    "transactions",
    getTransactions,
    {
      refreshInterval: REFRESH_INTERVAL,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      onError: (err) => console.error("Failed to fetch transactions:", err),
    }
  );

  return { transactions, error, isLoading };
}
