import type { FilterFunction, UpdateFunction } from "json-edit-react";
import { MetadataCollection } from "../types";

export const editRestrictionEdit: FilterFunction = ({ level, key, value }) =>
  level === 0 ||
  key === "status" ||
  key === "id" ||
  typeof value === "object" ||
  Array.isArray(value);

export const editRestrictionAdd: FilterFunction = ({ level, value }) =>
  level === 0 ||
  level === 1 ||
  (typeof value === "object" && !Array.isArray(value));

export const editRestrictionDelete: FilterFunction = ({ level, value }) =>
  level === 0 ||
  level === 1 ||
  typeof value === "object" ||
  Array.isArray(value);

export const editOnAdd: UpdateFunction = ({ currentData, path }) => {
  const data = currentData as MetadataCollection;
  if (
    path.length === 3 &&
    path.includes("metadata") &&
    path.includes("files")
  ) {
    return [
      "value",
      {
        ...data,
        metadata: {
          ...data.metadata,
          files: [...(data.metadata.files ?? []), { src: "", mediaType: "" }],
        },
      },
    ];
  }
  return true;
};
