export function camelCaseToTitleCase(str: string): string {
  return (
    str
      // Insert a space before all uppercase letters
      .replace(/([A-Z])/g, " $1")
      // Capitalize the first letter and lowercase the rest
      .replace(/^./, (match) => match.toUpperCase())
      .trim()
  );
}
