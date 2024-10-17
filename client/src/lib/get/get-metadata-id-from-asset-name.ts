import { type MetadataCollection } from "../types";

export const getMetadataFromAssetName = (
  metadatas: MetadataCollection[],
  assetName: string,
) => {
  const metadata = metadatas.find((m) => m.assetName === assetName);

  return metadata?.id ?? assetName;
};
