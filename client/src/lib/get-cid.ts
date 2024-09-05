export const getCID = (image: string | string[]) => {
  if (Array.isArray(image)) return image.join("").replaceAll("ipfs://", "");
  return image.replaceAll("ipfs://", "");
};
