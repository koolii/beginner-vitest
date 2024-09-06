import { it, vi, expect } from "vitest";

import { greet } from "./greet";

vi.mock("./greet");

it("挨拶を返さない（本来の実装ではない） => vi.mock()で関数をモックする", () => {
  expect(greet("Taro")).toBe(undefined);
});
