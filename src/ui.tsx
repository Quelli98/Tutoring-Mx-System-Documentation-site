import type { ReactNode } from "react";
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
