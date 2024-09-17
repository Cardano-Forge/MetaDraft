/**
 * Asset possible status
 */
export type Status = "success" | "warning" | "error" | "unchecked";

/**
 * Sort Option
 */
export type SortOptionKey = "a_z" | "z_a" | "errors" | "success";


/**
 * Metadata Structure
 *
 * @example
 * {
 *  name: string,
 *  image: string,
 *  files: array,
 *  files[0]: {
 *      src: string,
 *      mediaType: string,
 *  },
 *  attributes: "object",
 *  attributes.Background: "string",
 *  attributes.Body Color: "string",
 *  ...
 * }
 */
export type Structure = {
  [key: string]: string | Structure;
};
