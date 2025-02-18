import { Buffer } from "node:buffer";

import z, { type RefinementCtx } from "zod";

/**
 * Regular expressions used in validation rules.
 */
const HEX56_REGEXP = /^[0-9a-fA-F]{56}$/;
const REGEX_MEDIA_TYPE = /^(image\/|video\/|audio\/|application\/|model\/)/;
const URI_REGEXP = /^(https?|ftp|ipfs):\/\/[^\s/$.?#].[^\s]*$/i;
const BASE64_DATA_URL_REGEXP =
  /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
const HEX_REGEXP = /^[0-9a-fA-F]+$/;

//
// ZOD RULES
//

export const str = z.string({ message: "The value must be a string." });

const stringSchema = str
  .min(1, { message: "The string must not be empty." })
  .max(64, { message: "The string must be at most 64 characters long." });

const stringArraySchema = z
  .array(stringSchema)
  .refine((array: string[]) => array.length > 0, {
    message: "The array must contain at least one string.",
  });

/**
 * Checks if a string is within the specified length limit.
 * @param {string} input - The input string to be checked.
 */
export const checkSize64 = z.union([stringSchema, stringArraySchema]);

export const checkHex56 = str.regex(HEX56_REGEXP, {
  message: "The string must be a 56-character hexadecimal value.",
});

export const checkHex = z
  .string()
  .refine((val: string) => HEX_REGEXP.test(val), {
    message: "Must be a valid hex string.",
  });

export const checkBuffer = z.instanceof(Buffer, {
  message: "Must be in buffer format.",
});

const singleStringSchema = stringSchema.refine(
  (value: string) =>
    URI_REGEXP.test(value) || BASE64_DATA_URL_REGEXP.test(value),
  {
    message:
      "The string must be a valid URI (including ipfs://) or BASE64 format.",
  }
);

const stringImageArraySchema = z
  .array(z.string())
  .refine(
    (array: string[]) => array.every((value: string) => value.length <= 64),
    {
      message: "Each string in the array must be 64 length or less.",
    }
  )
  .refine(
    (array: string[]) =>
      URI_REGEXP.test(array.join("")) ||
      BASE64_DATA_URL_REGEXP.test(array.join("")),
    {
      message: "Must be a valid URI (including ipfs://) or BASE64 format.",
    }
  );

/**
 * Checks if a string is either a valid URI or BASE64 format.
 * @param {string} input - The input string to be checked.
 */
export const checkImageIsStringOrArray = z.union([
  singleStringSchema,
  stringImageArraySchema,
]);

/**
 * Checks if all elements in an array are of the same type.
 * @param {Array<unknown>} input - The input array to be checked.
 */
export const arrayUniqueTypeSchema = z
  .array(z.any())
  .superRefine((arr: unknown[], ctx: RefinementCtx) => {
    if (arr.length === 0) return true; // Empty array is considered valid
    const same = arr.every((item) => typeof item === typeof arr[0]);
    if (!same) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `All elements in the array should be of the same type.`,
        params: { status: "warning" },
      });
    }
    return true;
  });

/**
 * Checks if a string is a valid media type.
 * @param {string} input - The input string to be checked.
 */
export const checkMediaType = stringSchema.refine(
  (value: string) => REGEX_MEDIA_TYPE.test(value),
  {
    message:
      "The value must be a valid media type (e.g., image/, video/, audio/, application/, model/).",
  }
);

/**
 * Checks if the provided files array contains valid objects with required fields.
 */
export const checkFiles = z.array(
  z.object({
    name: checkSize64.optional(),
    mediaType: checkMediaType,
    src: checkImageIsStringOrArray,
  })
);

/**
 * Checks if a string or number is used instead of another type.
 * @param {unknown} input - The input value to be checked.
 */
export const valueIsNotString = z
  .string()
  .or(z.number())
  .superRefine((value: unknown, ctx: RefinementCtx) => {
    if (typeof value !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `It is recommended to use string instead of ${typeof value}`,
        params: { status: "warning" },
      });
    }
  });

export const attribute = checkSize64;
export const attributeObject = z.record(attribute);
export const attributeObjectInArray = z.object({
  name: attribute,
  value: attribute,
});
export const checkAttributes = z.union([
  attributeObject,
  z.array(z.union([attribute, attributeObjectInArray])),
  z.record(valueIsNotString), // Handling non string (as warnings)
]);

export const trait = checkSize64;
export const traitObjectInArray = z.object({
  name: checkSize64,
  value: checkSize64,
  display: checkSize64.optional(),
});
export const checkTraits = arrayUniqueTypeSchema.and(
  z.array(
    z.union([
      trait,
      traitObjectInArray,
      valueIsNotString, // Handling non string (as warnings)
    ])
  )
);

export const media = checkSize64;
export const mediaObject = z.record(media);
export const checkMedia = z.union([media, mediaObject, z.array(media)]);
