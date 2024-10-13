import type { FilterFunction, UpdateFunction } from "json-edit-react";
import type { MetadataCollection } from "../types";

export const createRestrictionEdit: FilterFunction = ({ level, key, value }) =>
  level === 0 ||
  level === 1 ||
  key === "name" ||
  typeof value === "object" ||
  Array.isArray(value);

export const createRestrictionAdd: FilterFunction = ({ level, key }) =>
  level === 0 || key === "status" || key === "id" || key === "assetName";

export const createRestrictionDelete: FilterFunction = ({ level, key }) =>
  level === 0 || level === 1 || key === "name" || key === "image";

