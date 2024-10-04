import type { NodeData, ThemeInput, TypeFilterFunction } from "json-edit-react";

export * from "./create";
export * from "./edit";

const attributesRegex = /metadata\.attributes\..*/;
const imageArrayRegex = /metadata\.image\.\d+/;
const filesRegex = /metadata\.files\.\d+/;
const filesSrcRegex = /metadata\.files\.\d+\.src/;
const filesMediaTypeRegex = /metadata\.files\.\d+\.mediaType/;
const srcArrayFilesSrcArrayRegex = /metadata\.files\.\d+\.src\.\d+/;

export const jerTheme: ThemeInput = [
  "monoDark",
  {
    container: {
      backgroundColor: "hsl(260 14% 8%)",
    },

    iconAdd: "hsl(140 55% 57%)",
    iconEdit: "hsl(33 100% 74%)",
    iconDelete: "hsl(357 100% 65%)",
    iconOk: "hsl(140 55% 57%)",
    iconCancel: "hsl(357 100% 65%)",
  },
];

export const jerRestrictTypeSelection: TypeFilterFunction = ({
  path,
}: NodeData) => {
  // AssetName
  if (path.join("") === "assetName") return []; // String only
  // metadata.name
  if (path.join(".") === "metadata.name") return []; // String only
  //metadata.image
  if (path.join(".") === "metadata.image") return ["string", "array"];
  //metadata.image[*]
  if (imageArrayRegex.test(path.join("."))) return []; // String only

  // metadata.website
  if (path.join(".") === "metadata.website") return []; // String only

  //metadata.files[*].src[*]
  if (srcArrayFilesSrcArrayRegex.test(path.join("."))) return []; // String only
  //metadata.files[*].src
  if (filesSrcRegex.test(path.join("."))) return ["string", "array"];
  //metadata.files[*].mediaType
  if (filesMediaTypeRegex.test(path.join("."))) return []; // String only
  //metadata.files[*]
  if (filesRegex.test(path.join(".")))
    return ["string", "number", "array", "object"];

  //metadata.attributes.*
  if (attributesRegex.test(path.join("."))) return []; // String only

  return ["string", "number", "array", "object"]; // Only 4 type accepted
};
