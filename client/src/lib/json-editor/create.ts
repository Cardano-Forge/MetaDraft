import type { FilterFunction } from "json-edit-react";

export const createRestrictionEdit: FilterFunction = ({ level, key, value }) =>
  level === 0 ||
  level === 1 ||
  typeof value === "object" ||
  Array.isArray(value);

export const createRestrictionAdd: FilterFunction = ({ level, key }) =>
  level === 0 || key === "status" || key === "id" || key === "assetName";

export const createRestrictionDelete: FilterFunction = ({ level, key }) =>
  level === 0 || level === 1 || key === "name" || key === "image";
