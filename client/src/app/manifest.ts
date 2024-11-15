import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MetaDraft",
    short_name: "MetaDraft",
    description:
      "A free-to-use metadata validation built for Cardano. Review your project's NFT metadata, visualize your assets, make updates, and more! Devs did something.",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    display: "standalone",
  };
}
