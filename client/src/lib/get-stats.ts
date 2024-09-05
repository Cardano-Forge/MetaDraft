import { type ValidatorResults } from "./types";

type Stats = {
  nfts: number;
  errorsDetected: number;
  errorsFlagged: number;
  valids: number;
};

export const getStats = (data: ValidatorResults, total: number): Stats => {
  const size = Object.keys(data).length;
  const stats = {
    nfts: total,
    errorsDetected: 0,
    errorsFlagged: 0,
    valids: total - size,
  };

  Object.keys(data).forEach((key) => {
    if (data[key]?.status === "warning") stats.errorsFlagged++;
    if (data[key]?.status === "error") stats.errorsDetected++;
  });

  return stats;
};
