import { it, expect } from "vitest";

import { greet } from "./greet";

it("挨拶を返す（本来の実装通り）", () => {
  expect(greet("Taro")).toBe("Hello! Taro.");
});
