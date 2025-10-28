import { Transaction } from "../types/transaction";
import { API_BASE_URL } from "./config";

const EMPTY_STRING = "-";
const UNDEFINED_TYPE = "Undefined";

// Fetch transactions from Strapi with error handling

export async function getTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.data)) return [];

    const transactions: Transaction[] = data.data
      .map((item: any): Transaction => {
        const t = item.attributes || item;
        return {
          id: item.id,
          description: t.description?.trim() || EMPTY_STRING,
          amount: t.amount != null ? Number(t.amount) : 0,
          type:
            t.type === "Credit"
              ? "Credit"
              : t.type === "Debit"
                ? "Debit"
                : UNDEFINED_TYPE,
          transactionDate: t.transactionDate || EMPTY_STRING,
          category: t.category?.trim() || EMPTY_STRING,
        };
      })
      .filter(
        (t: Transaction) =>
          t.description !== EMPTY_STRING ||
          t.amount !== 0 ||
          t.type !== UNDEFINED_TYPE ||
          t.transactionDate !== EMPTY_STRING ||
          t.category !== EMPTY_STRING
      );

    return transactions;
  } catch (error: any) {
    console.error("💥 Fetch failed:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Cannot connect to Strapi. Make sure it's running on " + API_BASE_URL
      );
    }

    throw error;
  }
}