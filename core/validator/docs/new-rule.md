# Adding a New Rule

## Rule Creation

1. **Duplicate an existing similar rule**: Choose a similar Zod or non-Zod rule, duplicate it, and rename the file accordingly.

2. **Name the class**: Create a class with a name that matches the filename in title case.

3. **Set the ID**: Ensure the `id` property of your rule matches the filename.

4. **Implement rule logic**:
   - Directly in the `execute` or `executeOnce` method if the checks are straightforward.
   - If the rule has complex checks, consider creating a separate file in the `utils` directory.

5. The `execute` method accepts the following parameters:
   - `assetName`: The name of the asset being validated.
   - `assetMetadata`: An object containing metadata for the asset.
   - `metadatas`: An array of all metadatas available.
6. The `executeOnce` method accepts the following parameters:
   - `metadatas`: An array of all metadatas available.
   - `validations`: The validations output for all assets.

6. **Return value**:
  - The `executeOnce` returns `Record<string, StateOutput>`
  - The `execute` returns `StateOutput`
  - The difference between both is that one returns the whole object with all validations and the other one returns the output per assets.

## Registering the Rule

1. Follow the structure in the `mod.ts` file to export your rule for testing purposes.
2. Update the `mapping.ts` file to include your new rule. Notice that the key is in camelCase for CLI usage.

## Writing Tests

1. Inside the `__tests__` directory, create tests to validate various potential cases and edge scenarios for your rule.

## Update the CLI template

1. You can add the new rules in that file: `core/cli/__tests__/template.txt`

## Creating a Pull Request (PR)

After completing these steps, use GitHub to create a pull request against the main branch for review and eventual merging into the complete solution.
