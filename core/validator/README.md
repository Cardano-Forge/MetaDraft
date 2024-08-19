<div align="center">

<h2>Metadraft - Core Validator</h2>

<p>This tool streamlines metadata management for Cardano assets, saving time, reducing entry barriers, scaling projects, driving growth, and strengthening community standards.</p>

<p align="center">
  <a href="https://github.com/Cardano-Forge/MetaDraft/issues">Report Bug</a>
  ·
  <a href="https://github.com/Cardano-Forge/MetaDraft/issues">Request Feature</a>
</p>
</div>

---

## About

- Provides guidance and support for inputting consistent and high-quality metadata for Cardano assets.
- Ensures compliance with metadata standards and appropriate use of key terms.
- Saves users time and energy, allowing focus on more critical tasks.
- Reduces barriers to entry for newcomers in the Cardano ecosystem.
- Helps scale existing projects, accelerating adoption and driving growth.
- Strengthens community standards, fostering a more sustainable ecosystem.

---

## Installation and Usage

1. Install deno: https://deno.com
2. Run tests: `deno test -A __tests__/**/*.ts`
3. Register new rule [New Rule](./docs/new-rule.md)

**Compatible with:**
- **Deno**: https://jsr.io/@ada-anvil/metadraft-validator
- **Node.js**: https://www.npmjs.com/package/@ada-anvil/metadraft-validator

**Supported Platforms & Usage:**
- **Next.js and Node 20**: Server-side only, installed via npm.js
- **Deno**: Direct usage

---

### Releases and Github Actions

```bash
git tag -a X.Y.Z -m "Version X.Y.Z"
git push origin tags/X.Y.Z
```

---

## Contributing

1. Fork the project
2. Create a Feature Branch
3. Commit your changes
4. Push your changes
5. Create a PR

<details>
<summary>Working with your local branch</summary>

**Branch Checkout:**

```bash
git checkout -b <feature|fix|release|chore|hotfix>/prefix-name
```

> Your branch name must starts with [feature|fix|release|chore|hotfix] and use a / before the name;
> Use hyphens as separator;
> The prefix correspond to your Kanban tool id (e.g. abc-123)

**Keep your branch synced:**

```bash
git fetch origin
git rebase origin/master
```

**Commit your changes:**

```bash
git add .
git commit -m "<feat|ci|test|docs|build|chore|style|refactor|perf|BREAKING CHANGE>: commit message"
```

> Follow this convention commitlint for your commit message structure

**Push your changes:**

```bash
git push origin <feature|fix|release|chore|hotfix>/prefix-name
```

**Examples:**

```bash
git checkout -b release/v1.15.5
git checkout -b feature/abc-123-something-awesome
git checkout -b hotfix/abc-432-something-bad-to-fix
```

```bash
git commit -m "docs: added awesome documentation"
git commit -m "feat: added new feature"
git commit -m "test: added tests"
```

</details>

### Local Development

**Run the tests**
```bash
deno test -A __tests__/**/*.ts
```

**Package and use locally with nodejs**
```bash
deno run -A scripts/build_npm.ts 0.0.1 && pushd npm && npm pack && popd
```

## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

<div>
<a href="https://ada-anvil.io" target="_blank">Ada Anvil</a>
<b> | </b>
<a href="https://www.wayup.io" target="_blank">Wayup</a>
<b> | </b>
<a href="https://x.com/ada_anvil" target="_blank">X</a>
<b> | </b>
<a href="https://discord.gg/RN4D7wzc" target="_blank">Discord</a>
<b> | </b>
<a href="https://projectcatalyst.io/funds/11/cardano-open-developers/anvil-open-source-metadata-validator" target="_blank">Catalyst - Fund11</a>
<b> | </b>
</div>
