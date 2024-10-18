import { CompareAttributesKeys } from "./rules/compare-attributes-keys.ts";
import { CompareRootKeys } from "./rules/compare-root-keys.ts";
import { CompareRootValues } from "./rules/compare-root-values.ts";
import { DuplicateKeys } from "./rules/duplicate-keys.ts";
import { HasRequiredKeys } from "./rules/has-required-keys.ts";
import { KeyAlphanumeric } from "./rules/key-alphanumeric.ts";
import { KeyAttributes } from "./rules/key-attributes.ts";
import { KeyCamelCase } from "./rules/key-camel-case.ts";
import { KeyDescription } from "./rules/key-description.ts";
import { KeyFiles } from "./rules/key-files.ts";
import { KeyImage } from "./rules/key-image.ts";
import { KeyLength } from "./rules/key-length.ts";
import { KeyLowerCase } from "./rules/key-lower-case.ts";
import { KeyUpperCase } from "./rules/key-upper-case.ts";
import { KeyMediaType } from "./rules/key-media-type.ts";
import { KeyMedia } from "./rules/key-media.ts";
import { KeyName } from "./rules/key-name.ts";
import { KeySnakeCase } from "./rules/key-snake-case.ts";
import { KeyTitleCase } from "./rules/key-title-case.ts";
import { KeyTraits } from "./rules/key-traits.ts";
import { KeyWhiteSpace } from "./rules/key-white-space.ts";
import { DuplicateImage } from "./rules/duplicate-image.ts";
import { DuplicateName } from "./rules/duplicate-name.ts";
import { DuplicateNameAndImage } from "./rules/duplicate-name-and-image.ts";
import { KeyAnvilCase } from "./rules/key-anvil-case.ts";
import { DuplicateAssetName } from "./rules/duplicate-asset-name.ts";
export { KeyWhiteSpace } from "./rules/key-white-space.ts";
export { DuplicateImage } from "./rules/duplicate-image.ts";
export { DuplicateName } from "./rules/duplicate-name.ts";

export const mapping = {
  compareAttributesKeys: CompareAttributesKeys,
  compareRootKeys: CompareRootKeys,
  compareRootValues: CompareRootValues,
  duplicateAssetName: DuplicateAssetName,
  duplicateImage: DuplicateImage,
  duplicateKeys: DuplicateKeys,
  duplicateNameAndImage: DuplicateNameAndImage,
  duplicateName: DuplicateName,
  hasRequiredKeys: HasRequiredKeys,
  keyAlphanumeric: KeyAlphanumeric,
  keyAnvilCase: KeyAnvilCase,
  keyAttributes: KeyAttributes,
  keyCamelCase: KeyCamelCase,
  keyDescription: KeyDescription,
  keyFiles: KeyFiles,
  keyImage: KeyImage,
  keyLength: KeyLength,
  keyLowerCase: KeyLowerCase,
  keyMediaType: KeyMediaType,
  keyMedia: KeyMedia,
  keyName: KeyName,
  keySnakeCase: KeySnakeCase,
  keyTitleCase: KeyTitleCase,
  keyTraits: KeyTraits,
  keyUpperCase: KeyUpperCase,
  keyWhiteSpace: KeyWhiteSpace,
};
