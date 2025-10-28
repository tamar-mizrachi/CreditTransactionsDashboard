// TypeScript interface for a transaction
export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "Debit" | "Credit"| "Undefined";
  transactionDate: string;
  category: string;
}