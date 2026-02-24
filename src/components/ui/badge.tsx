type BadgeProps = {
  variant?: "default" | "safe" | "caution" | "unsafe" | "category";
  children: React.ReactNode;
  className?: string;
};

const badgeVariants = {
  default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  safe: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  caution: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  unsafe: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  category: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeVariants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function SecurityBadge({ rating }: { rating: "safe" | "caution" | "unsafe" }) {
  const labels = {
    safe: "Safe",
    caution: "Caution",
    unsafe: "Unsafe",
  };
  return <Badge variant={rating}>{labels[rating]}</Badge>;
}
