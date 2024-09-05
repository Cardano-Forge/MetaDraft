import { Status, type ValidatorResults } from "./types";

type Stats = {
  nfts: number;
  errorsDetected: number;
  errorsFlagged: number;
  valids: number;
};

export const getStatsFromValidations = (
  data: ValidatorResults,
  total: number,
): Stats => {
  const size = Object.keys(data).length;
  const stats = {
    nfts: total,
    errorsDetected: 0,
    errorsFlagged: 0,
    valids: total - size,
  };

  Object.keys(data).forEach((key) => {
    if (data[key]?.status === "error") stats.errorsDetected++;
    if (data[key]?.status === "warning") stats.errorsFlagged++;
  });

  return stats;
};

export const getStatsFromStatus = (status: Record<string, Status>) => {
  const size = Object.keys(status).length;
  const stats = {
    nfts: size,
    errorsDetected: 0,
    errorsFlagged: 0,
    valids: 0,
  };

  Object.keys(status).forEach((key) => {
    if (status[key] === "error") stats.errorsDetected++;
    if (status[key] === "warning") stats.errorsFlagged++;
    if (status[key] === "success") stats.valids++;
  });

  return stats;
};
