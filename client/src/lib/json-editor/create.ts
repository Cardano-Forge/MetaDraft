import type { FilterFunction, UpdateFunction } from "json-edit-react";
import type { MetadataCollection } from "../types";

export const createRestrictionEdit: FilterFunction = ({ level, key, value }) =>
  level === 0 ||
  key === "status" ||
  key === "id" ||
  typeof value === "object" ||
  Array.isArray(value);

export const createRestrictionAdd: FilterFunction = ({ level, key }) =>
  level === 0 || key === "status" || key === "id" || key === "assetName";

export const createRestrictionDelete: FilterFunction = ({ level }) =>
  level === 0 || level === 1;

export const createOnAdd: UpdateFunction = ({ currentData, path }) => {
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
