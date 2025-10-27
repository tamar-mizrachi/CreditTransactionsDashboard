interface FilterProps {
    filter: "All" | "Debit" | "Credit";
    setFilter: (value: "All" | "Debit" | "Credit") => void;
  }
  
  export default function FilterButtons({ filter, setFilter }: FilterProps) {
    return (
      <div className="flex justify-center gap-4 mb-6">
        {(["All", "Credit", "Debit"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
              filter === type
                ? type === "Credit"
                  ? "bg-green-500 text-white"
                  : type === "Debit"
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    );
  }
  