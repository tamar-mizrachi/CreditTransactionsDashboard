interface BalanceProps {
  balance: number;
}

/*
  * Displays the current account balance with color coding
  * Green for positive, red for negative
 */

export default function BalanceDisplay({ balance }: BalanceProps) {
  const isPositive = balance >= 0;

  return (
    <div className="text-center mb-8 p-6 bg-white rounded-xl shadow-md">
      <p className="text-sm text-gray-500 mb-1">Current Balance</p>
      <p className="text-3xl font-bold">
        <span className={isPositive ? "text-green-600" : "text-red-600"}>
          {isPositive ? "+" : "-"}₪{Math.abs(balance).toFixed(2)}
        </span>
      </p>
    </div>
  );
}