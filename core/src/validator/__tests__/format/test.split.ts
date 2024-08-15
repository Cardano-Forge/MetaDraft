import { assertEquals } from "@std/assert";
import { split } from "../../src/format/split.ts";

Deno.test("Short string", () => {
  const str = split("Short String");

  assertEquals(str, "Short String");
});

Deno.test("Exactly 64 chars", () => {
  const str = split(
    "Long String that is exactly 64 characters long, so need two more",
  );

  assertEquals(
    str,
    "Long String that is exactly 64 characters long, so need two more",
  );
});

Deno.test("Exactly 65 chars", () => {
  const str = split(
    "Long String that is exactly 64 characters long, so need two more.",
  );

  assertEquals(str, [
    "Long String that is exactly 64 characters long, so need two ",
    "more.",
  ]);
});

Deno.test("84 characters", () => {
  const str = split(
    "Long String that is exactly 64 characters long, so need more text to fill the string",
  );

  assertEquals(str, [
    "Long String that is exactly 64 characters long, so need more ",
    "text to fill the string",
  ]);
});

Deno.test("Shasum256", () => {
  const str = split("e7bc546316d2d0ec13a2d3117b13468f5e939f95");

  assertEquals(str, "e7bc546316d2d0ec13a2d3117b13468f5e939f95");
});

Deno.test("a long description", () => {
  const str = split(
    "A Cardano meme token and 100% community project that is all about Levvy, the sloth who wears a hat, even when he sleeps!",
  );
  assertEquals(str, [
    "A Cardano meme token and 100% community project that is all ",
    "about Levvy, the sloth who wears a hat, even when he sleeps!",
  ]);
});

Deno.test("a long string array description", () => {
  const str = split([
    "A Cardano meme token and 100% community project that is all ",
    "about Levvy, the sloth who wears a hat, even when he sleeps!",
  ]);

  console.log("str", str);
  assertEquals(str, [
    "A Cardano meme token and 100% community project that is all ",
    "about Levvy, the sloth who wears a hat, even when he sleeps!",
  ]);
});

Deno.test("Shasum256", () => {
  const str = split(
    "e7bc546316d2d0ec13a2d3117b13468f5e939f95e7bc546316d2d0ec13a2d3117b13468f5e939f95",
  );

  assertEquals(str, [
    "e7bc546316d2d0ec13a2d3117b13468f5e939f95e7bc546316d2d0ec13a2d311",
    "7b13468f5e939f95",
  ]);
});

Deno.test("Long word", () => {
  const str = split(
    "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjk bonjour",
  );

  console.debug("str", str);
  // assertEquals(str, [
  //   "e7bc546316d2d0ec13a2d3117b13468f5e939f95e7bc546316d2d0ec13a2d311",
  //   "7b13468f5e939f95",
  // ]);
});
