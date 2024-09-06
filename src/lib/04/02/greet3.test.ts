import { it, vi, expect } from "vitest";

import { greet, sayGoodBye } from "./greet";

vi.mock("./greet", async (importOriginal) => {
  const actual = await importOriginal<object>();
  return {
    ...actual,
    sayGoodBye: (name: string): string => `Good bye, ${name}`,
  };
});

it("サヨナラを返す（本来の実装ではない） => vi.mock()で関数を置き換える", () => {
  const message = `${sayGoodBye("Taro")} See you.`;
  expect(message).toBe("Good bye, Taro See you.");
});

it("挨拶を返す（本来の実装通り）=> importOriginal()関数で上書きする関数をフィルターする", () => {
  expect(greet("taro")).toBe("Hello! taro.");
});
