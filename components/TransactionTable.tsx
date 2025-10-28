import { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
}

function formatTransactionDate(dateStr?: string): string {
  if (!dateStr) return "-";

  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return "Invalid Date";

  const datePart = dateObj.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const timePart =
    hours === 0 && minutes === 0
      ? "INVALID_HOUR"
      : dateObj.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });

  return `${datePart} ${timePart}`;
}

export default function TransactionTable({ transactions }: Props) {
  if (transactions.length === 0) {
    return <div className="text-center py-12 text-gray-500">No transactions to display.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300">
            <th className="p-3 text-left font-semibold text-gray-700">#</th>
            <th className="p-3 text-left font-semibold text-gray-700">Description</th>
            <th className="p-3 text-center font-semibold text-gray-700">Type</th>
            <th className="p-3 text-right font-semibold text-gray-700">Amount</th>
            <th className="p-3 text-left font-semibold text-gray-700">Date</th>
            <th className="p-3 text-left font-semibold text-gray-700">Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => {
            const colorClass =
              t.type === "Credit"
                ? "text-green-600"
                : t.type === "Debit"
                  ? "text-red-600"
                  : "text-black";

            return (
              <tr
                key={t.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 text-gray-600">{index + 1}</td>
                <td className="p-3 font-medium text-gray-800">{t.description || "-"}</td>
                <td className={`p-3 text-center font-bold ${colorClass}`}>{t.type || "Undefined"}</td>
                <td className={`p-3 text-right font-semibold ${colorClass}`}>
                  {t.amount != null
                    ? (t.amount !== 0 ? `${t.type === "Credit" ? "+" : "-"}₪${t.amount.toFixed(2)}` : "0")
                    : "0"}
                </td>
                <td className="p-3 text-gray-600 text-sm">{formatTransactionDate(t.transactionDate)}</td>
                <td className="p-3">{t.category || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}