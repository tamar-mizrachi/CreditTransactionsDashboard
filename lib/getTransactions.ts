/*import { Transaction } from "../types/transaction";
import { API_BASE_URL } from "./config";

// Fetch transactions from Strapi API
export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${API_BASE_URL}/transactions?populate=*`, {
    cache: "no-store", // ensure fresh data every time
  });

  if (!res.ok) {
    throw new Error("Failed to fetch transactions from Strapi");
  }

  const data = await res.json();

  if (!data.data || !Array.isArray(data.data)) return []; // handle empty or invalid data

  // Map Strapi response to our Transaction type
  return data.data.map((item: any) => ({
    id: item.id,
    description: item.description || "No description",
    amount: typeof item.amount === "number" ? item.amount : 0,
    type: item.type === "Credit" ? "Credit" : "Debit",
    transactionDate: item.transactionDate || "",
    category: item.category || "Uncategorized",
  }));
}
*/

import { Transaction } from "../types/transaction";
import { API_BASE_URL } from "./config";

// Fetch transactions from Strapi API
export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${API_BASE_URL}/transactions?populate=*`, {
    cache: "no-store", // ensure fresh data
  });

  if (!res.ok) throw new Error("Failed to fetch transactions from Strapi");

  const data = await res.json();
  if (!data.data || !Array.isArray(data.data)) return [];

  return data.data.map((item: any) => {
    const attr = item.attributes || item;
    return {
      id: item.id,
      description: attr.description || "No description",
      amount: typeof attr.amount === "number" ? attr.amount : 0,
      type: attr.type === "Credit" ? "Credit" : "Debit",
      transactionDate: attr.transactionDate || "",
      category: attr.category || "Uncategorized",
    };
  });
}
