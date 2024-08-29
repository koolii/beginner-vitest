import { describe, expect, it } from "vitest";

import { add, sub } from "./index.ts";

describe("四則演算", () => {
  describe("add", () => {
    it("should return 2", () => {
      expect(add(1, 1)).toBe(2);
    });
    it("should return 3", () => {
      expect(add(1, 2)).toBe(3);
    });
  });
  describe("sub", () => {
    it("should return 0", () => {
      expect(sub(1, 1)).toBe(0);
    });
    it("should return 1", () => {
      expect(sub(2, 1)).toBe(1);
    });
  });
});
