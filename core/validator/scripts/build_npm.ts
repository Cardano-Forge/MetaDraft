import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/mod.ts"],
  typeCheck: "both",
  test: true,
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  importMap: "./deno.json",
  rootTestDir: "./__tests__",
  package: {
    // package.json properties
    name: "@ada-anvil/metadraft-validator",
    version: Deno.args[0],
    description: "Metadraft validator for NFT",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/Cardano-Forge/MetaDraft.git",
    },
    bugs: {
      url: "https://github.com/Cardano-Forge/MetaDraft/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
