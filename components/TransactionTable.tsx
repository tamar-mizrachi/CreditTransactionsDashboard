/*
import { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        No transactions to display.
      </div>
    );
  }

  return (
    <table className="w-full border border-gray-300 rounded-md overflow-hidden shadow-sm">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">#</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Type</th>
          <th className="p-2 border">Amount</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, index) => {
          const formattedDate = t.transactionDate
            ? new Date(t.transactionDate).toLocaleString()
            : "-";

          return (
            <tr
              key={t.id}
              className="text-center hover:bg-gray-50 transition"
            >
              <td className="p-4 border">{index + 1}</td>
              <td className="p-4 border">{t.description}</td>
              <td
                className={`p-4 border font-bold ${
                  t.type === "Credit" ? "text-green-500" : "text-red-500"
                }`}
              >
                {t.type}
              </td>
              <td
                className={`p-4 border font-semibold ${
                  t.type === "Credit" ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.type === "Credit" ? "+" : "-"}ִ ₪{t.amount.toFixed(2)}
              </td>
              <td className="p-4 border">{formattedDate}</td>
              <td className="p-4 border">{t.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
*/


import { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">
        No transactions to display.
      </div>
    );
  }

  return (
    <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 border">#</th>
          <th className="p-3 border">Description</th>
          <th className="p-3 border">Type</th>
          <th className="p-3 border">Amount</th>
          <th className="p-3 border">Date</th>
          <th className="p-3 border">Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, index) => {
          const formattedDate = t.transactionDate
            ? new Date(t.transactionDate)
                .toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" })
                .replace(",", " |")
            : "-";

          return (
            <tr
              key={t.id}
              className="text-center hover:bg-gray-50 transition-all"
            >
              <td className="p-4 border">{index + 1}</td>
              <td className="p-4 border">{t.description}</td>
              <td
                className={`p-4 border font-bold ${
                  t.type === "Credit" ? "text-green-500" : "text-red-500"
                }`}
              >
                {t.type}
              </td>
              <td
                className={`p-4 border font-semibold ${
                  t.type === "Credit" ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.type === "Credit" ? "+" : "-"} ₪{t.amount.toFixed(2)}
              </td>
              <td className="p-4 border">{formattedDate}</td>
              <td className="p-4 border">{t.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
