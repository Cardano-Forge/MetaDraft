import { Buffer } from "node:buffer";

import z from "npm:zod";

//
// REGEXP
//

const HEX56_REGEXP = /^[0-9a-fA-F]{56}$/;
const REGEX_MEDIA_TYPE = /^(image\/|video\/|audio\/|application\/|model\/)/;
const URI_REGEXP = /^(https?|ftp|ipfs):\/\/[^\s/$.?#].[^\s]*$/i;
const BASE64_REGEXP = /^[A-Za-z0-9+/=]+$/;
const HEX_REGEXP = /^[0-9a-fA-F]+$/;

//
// ZOD RULES
//

export const str = z.string({ message: "The value must be a string." });

const stringSchema = str
  .min(1, { message: "The string must not be empty." })
  .max(64, { message: "The string must be at most 64 characters long." });
const stringArraySchema = z
  .array(str)
  .refine((array: string[]) => array.length > 0, {
    message: "The array must contain at least one string.",
  });

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

const singleStringSchema = str.refine(
  (value: string) => URI_REGEXP.test(value) || BASE64_REGEXP.test(value),
  {
    message:
      "The string must be a valid URI (including ipfs://) or BASE64 format.",
  },
);

const stringImageArraySchema = z
  .array(
    str.refine(
      (value: string) => URI_REGEXP.test(value) || BASE64_REGEXP.test(value),
      {
        message:
          "Each string in the array must be a valid URI (including ipfs://) or BASE64 format.",
      },
    ),
  )
  .refine(
    (array: string[]) =>
      array.every(
        (value: string) => URI_REGEXP.test(value) || BASE64_REGEXP.test(value),
      ),
    {
      message:
        "Each string in the array must be a valid URI (including ipfs://) or BASE64 format.",
    },
  )
  .refine((array: string[]) => array.join("").length <= 64, {
    message:
      "The combined length of all strings in the array must be at most 64 characters.",
  });

// Define the combined schema for either a single string or an array of strings
export const checkImageIsStringOrArray = z.union([
  singleStringSchema,
  stringImageArraySchema,
]);

export const arrayUniqueTypeSchema = z
  .array(z.any())
  .superRefine((arr: unknown[], ctx) => {
    if (arr.length === 0) return true; // Empty array is considered valid
    const type = typeof arr[0];
    const same = arr.every((item) => typeof item === type);
    if (!same) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `All elements in the array should be of the same type.`,
        params: { status: "warning" },
      });
    }
    return true;
  });

// Define the schema for media type validation
export const checkMediaType = str.refine(
  (value: string) => REGEX_MEDIA_TYPE.test(value),
  {
    message:
      "The value must be a valid media type (e.g., image/, video/, audio/, application/, model/).",
  },
);

export const checkFiles = z.array(
  z.object({
    name: checkSize64,
    mediaType: checkMediaType,
    src: checkImageIsStringOrArray,
  }),
);

export const valueIsNotString = z
  .string()
  .or(z.number())
  .superRefine((value: unknown, ctx) => {
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
    ]),
  ),
);

export const media = checkSize64;
export const mediaObject = z.record(media);
export const checkMedia = z.union([media, mediaObject, z.array(media)]);
