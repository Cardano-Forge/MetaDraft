import type { MetadataCollection } from "../types";

type Stats = {
  nfts: number;
  unchecked: number;
  errorsDetected: number;
  errorsFlagged: number;
  valids: number;
};

export const getStats = (data: MetadataCollection[]): Stats => {
  const size = data.length;
  const stats = {
    nfts: size,
    unchecked: 0,
    errorsDetected: 0,
    errorsFlagged: 0,
    valids: 0,
  };

  data.forEach((metadata) => {
    if (metadata.status === "error") stats.errorsDetected++;
    if (metadata.status === "warning") stats.errorsFlagged++;
    if (metadata.status === "success") stats.valids++;
  });

  return stats;
};
