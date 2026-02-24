import Link from "next/link";

type CardProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export function Card({ href, children, className = "" }: CardProps) {
  const classes = `rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900 ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${classes}`}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
      {children}
    </h3>
  );
}

export function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{children}</p>;
}
