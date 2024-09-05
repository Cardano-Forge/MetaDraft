export function getImageSrc(str: string | string[]) {
  if (Array.isArray(str)) str = str.join("");

  if (str.startsWith("data:image")) return str;

  if (str.startsWith("ipfs://"))
    return str.replace("ipfs://", "https://ipfs.io/ipfs/");
  return str;
}
