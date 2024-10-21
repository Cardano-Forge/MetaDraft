import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MetaDraft",
    short_name: "MetaDraft",
    description: "Metadata validator and tooling",
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
