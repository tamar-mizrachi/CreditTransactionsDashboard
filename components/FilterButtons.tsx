interface FilterProps {
  filter: "All" | "Debit" | "Credit";
  setFilter: (value: "All" | "Debit" | "Credit") => void;
}

/**
 * Filter buttons to show All, Credit, or Debit transactions
 */
export default function FilterButtons({ filter, setFilter }: FilterProps) {
  const buttons = [
    { value: "All", label: "All", activeColor: "bg-gray-700", hoverColor: "hover:bg-gray-300" },
    { value: "Credit", label: "Credit", activeColor: "bg-green-500", hoverColor: "hover:bg-green-200" },
    { value: "Debit", label: "Debit", activeColor: "bg-red-500", hoverColor: "hover:bg-red-200" },
  ] as const;

  return (
    <div className="flex gap-3 flex-wrap">
      {buttons.map(({ value, label, activeColor, hoverColor }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${filter === value
            ? `${activeColor} text-white shadow-lg`
            : `bg-gray-200 ${hoverColor} text-gray-700`
            }`}
          aria-pressed={filter === value}
          aria-label={`Show ${label} transactions`}
          title={`Show ${label} transactions`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
