import { expect, it, vi } from "vitest";
import { checkConfig } from "./checkConfig";

it("モック関数は実行時引数のオブジェクト検証ができる", () => {
  const mockFn = vi.fn();
  checkConfig(mockFn);
  expect(mockFn).toHaveBeenCalledWith({
    mock: true,
    feature: { spy: true },
  });
});

it("モック関数は実行時引数のオブジェクト検証ができる(expect.objectContaining()による部分検証)", () => {
  const mockFn = vi.fn();
  checkConfig(mockFn);
  expect(mockFn).toHaveBeenCalledWith(
    expect.objectContaining({
      feature: { spy: true },
    })
  );
});
