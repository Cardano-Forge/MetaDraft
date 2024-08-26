import React from "react";

type CardProps = {
  asset: Record<string, unknown>;
};

export default function Card({ asset }: CardProps) {
  return <div className="rounded-xl bg-secondary">{asset.name as string}</div>;
}
