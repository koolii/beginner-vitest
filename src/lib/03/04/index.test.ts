import { describe, expect, it } from "vitest";

import { add, sub } from "./index.ts";

describe("四則演算", () => {
  describe("add", () => {
    it("should return 100(50 + 50)", () => {
      expect(add(50, 50)).toBe(100);
    });
    it("should return 100(70 + 80)", () => {
      expect(add(70, 80)).toBe(100);
    });
  });
  describe("sub", () => {
    it("should return 1(51 - 50)", () => {
      expect(sub(51, 50)).toBe(1);
    });
    it("should return 0(70 - 80)", () => {
      expect(sub(70, 80)).toBe(0);
    });
  });
});
