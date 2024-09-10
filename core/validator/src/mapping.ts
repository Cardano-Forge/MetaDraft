import { Cip25Version1Validator } from "./rules/cip-25-version-1.ts";
import { Cip25Version2Validator } from "./rules/cip-25-version-2.ts";
import { CompareAttributesKeys } from "./rules/compare-attributes-keys.ts";
import { CompareRootKeys } from "./rules/compare-root-keys.ts";
import { CompareRootValues } from "./rules/compare-root-values.ts";
import { DuplicateKeysValidator } from "./rules/duplicate-keys.ts";
import { HasRequiredKeysValidator } from "./rules/has-required-keys.ts";
import { KeyAlphanumeric } from "./rules/key-alphanumeric.ts";
import { KeyAttributesValidator } from "./rules/key-attributes.ts";
import { KeyCamelCase } from "./rules/key-camel-case.ts";
import { KeyDescriptionValidator } from "./rules/key-description.ts";
import { KeyFilesValidator } from "./rules/key-files.ts";
import { KeyImageValidator } from "./rules/key-image.ts";
import { KeyLength } from "./rules/key-length.ts";
import { KeyLowerCase } from "./rules/key-lower-case.ts";
import { KeyUpperCase } from "./rules/key-upper-case.ts";
import { KeyMediaTypeValidator } from "./rules/key-media-type.ts";
import { KeyMediaValidator } from "./rules/key-media.ts";
import { KeyNameValidator } from "./rules/key-name.ts";
import { KeySnakeCase } from "./rules/key-snake-case.ts";
import { KeyTitleCase } from "./rules/key-title-case.ts";
import { KeyTraitsValidator } from "./rules/key-traits.ts";
import { KeyWhiteSpace } from "./rules/key-white-space.ts";
import { DuplicateImage } from "./rules/duplicate-image.ts";
import { DuplicateName } from "./rules/duplicate-name.ts";
import { DuplicateNameAndImage } from "./rules/duplicate-name-and-image.ts";
import { KeyAnvilCasing } from "./rules/key-anvil-casing.ts";
export { KeyWhiteSpace } from "./rules/key-white-space.ts";
export { DuplicateImage } from "./rules/duplicate-image.ts";
export { DuplicateName } from "./rules/duplicate-name.ts";

export const mapping = {
  cip25Version1Validator: Cip25Version1Validator,
  cip25Version2Validator: Cip25Version2Validator,
  compareAttributesKeys: CompareAttributesKeys,
  compareRootKeys: CompareRootKeys,
  compareRootValues: CompareRootValues,
  duplicateKeysValidator: DuplicateKeysValidator,
  hasRequiredKeysValidator: HasRequiredKeysValidator,
  keyAlphanumeric: KeyAlphanumeric,
  keyAttributesValidator: KeyAttributesValidator,
  keyCamelCase: KeyCamelCase,
  keyDescriptionValidator: KeyDescriptionValidator,
  keyFilesValidator: KeyFilesValidator,
  keyImageValidator: KeyImageValidator,
  keyLength: KeyLength,
  keyLowerCase: KeyLowerCase,
  keyUpperCase: KeyUpperCase,
  keyMediaTypeValidator: KeyMediaTypeValidator,
  keyMediaValidator: KeyMediaValidator,
  keyNameValidator: KeyNameValidator,
  keySnakeCase: KeySnakeCase,
  keyTitleCase: KeyTitleCase,
  keyTraitsValidator: KeyTraitsValidator,
  keyWhiteSpace: KeyWhiteSpace,
  duplicateImage: DuplicateImage,
  duplicateName: DuplicateName,
  duplicateNameAndImage: DuplicateNameAndImage,
  keyAnvilCasing: KeyAnvilCasing,
};
