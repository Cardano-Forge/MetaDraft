import { type mapping } from "@ada-anvil/metadraft-validator";
export type Rule = keyof typeof mapping;

export const RULES_DESCRIPTION: Record<Rule, { long: string; short: string }> =
  {
    compareAttributesKeys: {
      long: `The CompareAttributesKeys rule checks for attribute names in metadata that are too similar based on a Levenshtein distance, which measures how many character changes are needed to turn one word into another. If two attribute names are too close, it gives a warning.  It runs by looking at all attribute keys, comparing them, and reporting any that are nearly identical. If you have metadata with attributes like color, colour, and clr, this validator would warn you that these attribute names are too similar.`,
      short: `Warns about attribute names in metadata that are too similar based on Levenshtein distance, like "color," "colour," and "clr."`,
    },
    compareRootKeys: {
      long: `The CompareRootKeys validator checks if the main keys in a metadata file are too similar to each other based on how close their names are. It uses a method called "Levenshtein distance," which measures how many changes (like adding or removing a letter) it would take to turn one key into another. If two keys are too similar, according to the set threshold, this validator will flag them. This helps avoid confusion by ensuring that key names in the metadata are distinct enough from each other.`,
      short: `Flags metadata keys that are too similar based on Levenshtein distance to ensure distinct key names.`,
    },
    compareRootValues: {
      long: `The CompareRootValues validator checks if the root-level string values in the metadata are too similar to each other. It uses the Levenshtein distance, a method that calculates how many changes (like adding or removing a letter) are required to turn one value into another. Non-string values are filtered out, and the remaining strings are compared. If two values are too similar, according to the threshold set, they will be flagged. This ensures that string values within the metadata are distinct enough to avoid confusion or redundancy`,
      short: `Flags root-level string values in metadata that are too similar based on Levenshtein distance to ensure distinctness.`,
    },
    duplicateAssetName: {
      long: `The DuplicateAssetName validator ensures that each asset name in a collection of metadata is unique, preventing any two assets from having the same name. It scans through all asset names, identifies duplicates, and generates error messages for any names that appear more than once.`,
      short: `Ensures all asset names in a metadata collection are unique, flagging any duplicates.`,
    },
    duplicateImage: {
      long: `The DuplicateImage validator checks a collection of metadata to ensure that each image is unique, preventing any duplicates from existing within the dataset. It analyzes the images associated with each asset and tracks occurrences to identify any that appear more than once. When duplicates are found, it generates error messages that clearly indicate which images are duplicated. This helps maintain an organized asset library, making it easier for users to manage their images effectively. By flagging these duplicates, it enhances overall clarity and prevents confusion when handling assets.`,
      short: `Ensures each image in a metadata collection is unique, flagging duplicates with clear error messages.`,
    },
    duplicateKeys: {
      long: `The DuplicateKeys validator ensures that the metadata of an asset does not contain too many repeated keys, which can lead to confusion or errors. It checks each asset’s metadata and counts the occurrences of keys, flagging any that exceed a predefined limit. If duplicates are found, it generates warnings that specify which keys are problematic and where they appear within the metadata. This helps maintain clarity and consistency in asset management, ensuring that users can quickly identify and resolve issues related to key duplication. By setting a threshold for duplication, it promotes better data organization and usability.`,
      short: `Flags metadata keys that exceed a set repetition limit, ensuring clarity and consistency in asset management.`,
    },
    duplicateName: {
      long: `The DuplicateName validator checks for duplicate asset names within a collection of metadata entries. It scans through the provided metadata and counts how many times each asset name appears. If it finds duplicates, it generates error messages that specify which names are repeated, helping users identify and resolve potential conflicts. This validation ensures that each asset has a unique identifier, which is crucial for maintaining an organized and efficient database. By enforcing unique names, it improves the overall quality and usability of the metadata.`,
      short: `Flags duplicate asset names in metadata, ensuring each asset has a unique identifier for better organization.`,
    },
    duplicateNameAndImage: {
      long: `The DuplicateNameAndImage validator is a tool that ensures each asset in a collection has a unique name and image. It checks all the provided metadata entries for duplicates and flags any that appear more than once. If a duplicate name or image is found, it records an error, helping maintain organization and clarity. This prevents confusion and ensures that each asset can be easily identified and accessed. Essentially, it keeps the data tidy and ensures that no two assets share the same identifying features.`,
      short: `Ensures each asset in a collection has a unique name and image, flagging duplicates to maintain clarity and organization.`,
    },
    hasRequiredKeys: {
      long: `The HasRequiredKeys validator checks that each asset's metadata includes essential fields like "name" and "image." This ensures that every asset has the necessary identifying information for proper organization and display. When an asset is validated, the tool reviews its metadata and confirms that all required keys are present. If any are missing, it flags an error, providing feedback on what is lacking. This process helps maintain consistency and prevents confusion by ensuring that all assets have the critical details needed for recognition and use.`,
      short: `Ensures each asset's metadata includes essential fields like "name" and "image," flagging errors if any are missing.`,
    },
    keyAlphanumeric: {
      long: `The KeyAlphanumeric validator ensures that all keys in the asset metadata consist of alphanumeric characters, as well as dashes and underscores. This is crucial for maintaining a consistent and error-free structure in the metadata. When validating an asset, the tool checks each key and flags any that do not meet the alphanumeric criteria. If any issues are found, it generates a warning, specifying which keys are invalid and why. By enforcing these rules, the validator helps avoid potential confusion or errors when processing and retrieving asset information.`,
      short: `Ensures asset metadata keys contain only alphanumeric characters, dashes, and underscores, flagging any invalid keys.`,
    },
    keyAnvilCase: {
      long: `The KeyAnvilCase validator ensures that the structure of your metadata follows specific naming conventions. It checks that all metadata keys are written in "camelCase," meaning the first word is lowercase and subsequent words are capitalized (e.g., attributeName). For any inner keys under the attributes section, it checks that they are written in "Title Case," where each word starts with a capital letter (e.g., Attribute Name). If any keys don't follow these formats, it raises a warning. For example, if a key is named Attribute_name instead of AttributeName, it would flag this as an issue.`,
      short: `Ensures metadata keys follow "camelCase" (for main keys) and "Title Case" (for inner attribute keys), flagging any deviations.`,
    },
    keyAttributes: {
      long: `The KeyAttributes validator checks if the asset metadata includes an optional "attributes" field, ensuring it follows the correct format using the Zod validation library. When validating an asset, this tool inspects the metadata to confirm that if the "attributes" field is present, it adheres to the specified structure. If the formatting is incorrect or if any issues are found, the validator provides detailed feedback on what needs to be fixed. This helps maintain consistency and correctness in the metadata, making it easier to process and utilize the asset information effectively.`,
      short: `Ensures the optional "attributes" field in asset metadata follows the correct format, providing feedback for any issues.`,
    },
    keyCamelCase: {
      long: `The KeyCamelCase validator ensures that the keys in the asset metadata are formatted in Camel Case. This means that each key should start with a lowercase letter, and subsequent words should begin with uppercase letters, with no spaces or special characters. When validating an asset, the tool checks each key against this formatting rule and raises warnings for any keys that do not comply. This helps maintain a standardized naming convention, making it easier for developers and systems to work with the metadata effectively and consistently.`,
      short: `Ensures asset metadata keys follow Camel Case formatting, flagging any deviations to maintain consistency.`,
    },
    keyDescription: {
      long: `The KeyDescription validator ensures that the metadata associated with an asset can include an optional "description" field that does not exceed 64 characters in length. This helps maintain concise and informative descriptions while preventing excessively long inputs that could affect storage or display. When validating an asset, the tool checks the "description" field, and if it is present, verifies that it adheres to the character limit. This validation contributes to the overall integrity and usability of the metadata, ensuring that asset descriptions remain clear and manageable.`,
      short: `Ensures the optional "description" field in asset metadata does not exceed 64 characters, promoting concise and clear descriptions.`,
    },
    keyFiles: {
      long: `The KeyFiles validator ensures that the metadata associated with an asset includes an optional "files" field, which must be formatted as an array of file objects. This validation helps maintain a structured approach to handling file data within the metadata, ensuring that the "files" field adheres to the expected format. When validating an asset, the tool checks for the presence of the "files" field and verifies that, if it exists, it meets the specified criteria. This contributes to the overall integrity of the metadata and facilitates consistent handling of file-related information in asset management.`,
      short: `Ensures the optional "files" field in asset metadata is formatted as an array of file objects, maintaining structured data integrity.`,
    },
    keyImage: {
      long: `The KeyImage validator ensures that the metadata associated with an asset includes an "image" field, which must be formatted as either a string URL or an array of string URLs. This validation guarantees that the "image" field conforms to the expected format, allowing for consistent and reliable handling of image-related data within the metadata. When validating an asset, the tool checks the "image" field, ensuring that it meets the specified requirements, thus maintaining data integrity and enabling proper usage of image assets in various contexts.`,
      short: `Ensures the "image" field in asset metadata is formatted as a string or an array of string URLs, ensuring proper handling of image data.`,
    },
    keyLength: {
      long: `The KeyLength validator ensures that the metadata associated with an asset does not have any keys that exceed 64 characters in length. This validation guarantees that all keys conform to the expected length limit, preventing excessively long key names, which could cause issues in metadata management or retrieval. When validating an asset, the tool checks each key and flags any that surpass this length, allowing for consistent and manageable key names within the metadata. This validator helps ensure that metadata remains concise and usable in various contexts.`,
      short: `Ensures asset metadata keys do not exceed 64 characters, maintaining concise and manageable key names.`,
    },
    keyLowerCase: {
      long: `The KeyLowerCase validator ensures that metadata keys adhere to a specific lower case formatting convention, where all keys must be in lowercase and words are separated by spaces. This validation helps enforce consistent naming practices within metadata, improving readability and avoiding issues caused by inconsistent key formats. When applied, the tool checks each key in the metadata to confirm that it follows this convention. Any key that does not meet the formatting rule is flagged, ensuring the metadata structure remains consistent and standardized across assets.`,
      short: `Ensures all metadata keys are in lowercase with words separated by spaces, promoting consistent and readable naming conventions.`,
    },
    keyMediaType: {
      long: `The KeyMediaType validator is responsible for ensuring that the mediaType field within metadata is valid, following a specific pattern as defined by the validator's rules. The mediaType field is optional but, when present, must match a predefined regex pattern. This helps to ensure that all media types adhere to standard formats, preventing invalid entries that could cause issues when the metadata is processed. If the validation finds a mediaType that does not conform to the expected format, it flags the issue for review, maintaining consistency across asset metadata.`,
      short: `Ensures the optional "mediaType" field in metadata matches a predefined regex pattern, maintaining consistency and preventing invalid entries.`,
    },
    keyMedia: {
      long: `The KeyMedia validator ensures that the metadata object may optionally contain a valid media field, which must adhere to predefined rules for media-related values. This validator checks that when a media object is present in the metadata, it conforms to the expected format and structure, helping to ensure consistency and correctness in media-related data. If the media field is missing or invalid, the validation flags it, assisting in maintaining proper media metadata across assets. This helps avoid potential issues caused by improper media data formats.`,
      short: `Ensures the optional "media" field in metadata adheres to predefined rules, maintaining consistency and correctness in media data.`,
    },
    keyName: {
      long: `The KeyName validator ensures that the metadata object includes a name field that adheres to a specific constraint: the name must be 64 characters or fewer. This validator checks that the name field exists and follows the size restriction, helping maintain consistency and prevent issues caused by overly long names. If the name field is missing or exceeds the character limit, the validation flags it, ensuring assets have valid and properly sized name values. This rule is essential for maintaining structured and compliant metadata across all assets.`,
      short: `Ensures the "name" field in metadata is present and does not exceed 64 characters, maintaining consistency and preventing errors.`,
    },
    keySnakeCase: {
      long: `The KeySnakeCase validator ensures that all keys in the metadata object follow the Snake Case naming convention, where words are lowercase and separated by underscores. This validator processes each key in the metadata and checks whether it adheres to the expected format. If any keys deviate from the Snake Case convention, the validator flags them with warnings. This rule helps maintain uniformity and clarity in metadata keys, contributing to consistent naming practices across assets. When the validation identifies issues, it provides detailed feedback, allowing corrective actions to be taken.`,
      short: `Ensures all metadata keys follow the Snake Case convention, flagging any deviations to maintain consistent and clear naming.`,
    },
    keyTitleCase: {
      long: `The KeyTitleCase validator ensures that all keys in the metadata object follow the Title Case naming convention, where the first letter of each word is capitalized. This validator checks each key within the metadata to confirm that it adheres to the Title Case format. If any keys do not conform, the validator issues warnings, helping to enforce consistency across asset metadata. By flagging improperly formatted keys, the rule promotes a structured and uniform naming standard, making metadata more readable and predictable. Feedback from the validation process is detailed to assist in correcting any violations of the rule.`,
      short: `Ensures all metadata keys follow the Title Case convention, flagging any deviations to enforce consistent and readable naming.`,
    },
    keyTraits: {
      long: `The KeyTraits validator ensures that the metadata object includes an optional "traits" field, which represents specific characteristics of the asset. This validator checks whether the "traits" field, if present, meets the criteria defined by a Zod schema. If the traits do not conform to the expected structure, the validator will return validation results indicating the discrepancies. By enforcing this rule, the validator promotes accuracy and consistency in asset metadata, ensuring that any included traits are correctly formatted and valid. This feedback aids in maintaining high-quality metadata that accurately reflects the asset's attributes.`,
      short: `Ensures the optional "traits" field in metadata, if present, adheres to a Zod schema, promoting accurate and consistent asset metadata.`,
    },
    keyUpperCase: {
      long: `The KeyUpperCase validator ensures that all keys in the metadata object follow the Upper Case words format, where each word is capitalized. This validator examines each key within the metadata to verify that it adheres to the Upper Case naming standard. If any keys do not meet this requirement, the validator issues warnings, which helps maintain consistency in asset metadata. By identifying improperly formatted keys, the rule promotes a clear and uniform naming convention, making the metadata more accessible and understandable. The validation process provides detailed feedback to assist in correcting any formatting issues.`,
      short: `Ensures all keys in metadata follow the Upper Case format, capitalizing each word, and flags any deviations to maintain consistency and clarity.`,
    },
    keyWhiteSpace: {
      long: `The KeyWhiteSpace validator checks that all keys in the metadata object do not have trailing whitespace characters. This validator scans each key within the metadata to identify any spaces at the beginning or end. If trailing whitespace is found, it issues warnings, helping to ensure that the metadata remains clean and free of unnecessary formatting issues. By addressing this potential problem, the rule fosters a more polished and professional appearance for the metadata. The validation results provide detailed feedback to assist in removing any detected whitespace characters.`,
      short: `Ensures that metadata keys do not have trailing whitespace. It flags any keys with leading or trailing spaces, promoting clean and consistent metadata formatting.`,
    },
  };
