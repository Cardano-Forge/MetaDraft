import React from "react";

export default function ColumnInnerContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-card p-4">{children}</div>
  );
}
