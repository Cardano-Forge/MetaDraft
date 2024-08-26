export function logger(...message: unknown[]) {
  if (Deno.env.get("DEBUG") === "true") {
    console.log(message);
  }
}
