interface BalanceProps {
    balance: number;
  }
  
  export default function BalanceDisplay({ balance }: BalanceProps) {
    return (
      <h2 className="text-xl font-semibold mb-6 text-center">
        Current Balance:{" "}
        <span className={balance >= 0 ? "text-green-600" : "text-red-600"}>
          {balance >= 0 ? "+" : "-"}${Math.abs(balance).toFixed(2)}
        </span>
      </h2>
    );
  }
  