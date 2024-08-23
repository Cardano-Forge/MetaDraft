// TODO - rename and refactor to handle any type of images not only ipfs

export function formatIPFS(str: string | string[]) {
  if (Array.isArray(str)) return str.join("");

  if (str.includes("ipfs://"))
    return str.replace("ipfs://", "https://ipfs.io/ipfs/");
  return str;
}
