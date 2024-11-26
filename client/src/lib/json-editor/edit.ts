import type { FilterFunction } from "json-edit-react";

export const editRestrictionEdit: FilterFunction = ({ level, value }) =>
  level === 0 || typeof value === "object" || Array.isArray(value);

export const editRestrictionAdd: FilterFunction = ({ level, value }) =>
  level === 0 ||
  level === 1 ||
  (typeof value === "object" && !Array.isArray(value));

export const editRestrictionDelete: FilterFunction = ({
  level,
  value,
  key,
}) => {
  if (typeof key === "number") {
    return false;
  }

  return (
    level === 0 ||
    level === 1 ||
    typeof value === "object" ||
    Array.isArray(value)
  );
};
