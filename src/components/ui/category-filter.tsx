"use client";

import { useRouter, useSearchParams } from "next/navigation";

type FilterOption = {
  label: string;
  value: string;
};

export function CategoryFilter({
  categories,
  paramName = "category",
}: {
  categories: FilterOption[];
  paramName?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get(paramName) || "";

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setFilter("")}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
          !current
            ? "bg-purple-700 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => setFilter(cat.value)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            current === cat.value
              ? "bg-purple-700 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
