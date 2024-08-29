import { describe, expect, it } from "vitest";

import { add, HttpError, RangeError, sub } from "./index.ts";

describe("四則演算", () => {
  describe("add", () => {
    it("should return 100(50 + 50)", () => {
      expect(add(50, 50)).toBe(100);
    });
    it("should return 100(70 + 80)", () => {
      expect(add(70, 80)).toBe(100);
    });
    it("should throw => .toThrow()", () => {
      expect(() => add(-10, 110)).toThrow();
    });
    it("should throw with error message => .toThrow(message)", () => {
      expect(() => add(-10, 110)).toThrow(
        "入力値は0-100の間で入力してください"
      );
    });
    it("should throw with instanceof Class => .toThrow(RangeError)", () => {
      expect(() => add(-10, 110)).toThrow(Error);
      expect(() => add(-10, 110)).toThrow(RangeError);
      expect(() => add(-10, 110)).not.toThrow(HttpError);
    });
  });
  describe("sub", () => {
    it("should return 1(51 - 50)", () => {
      expect(sub(51, 50)).toBe(1);
    });
    it("should return 0(70 - 80)", () => {
      expect(sub(70, 80)).toBe(0);
    });

    it("should throw", () => {
      expect(() => sub(-10, 10)).toThrow();
    });
    it("should throw with error message", () => {
      expect(() => sub(10, -10)).toThrow("入力値は0-100の間で入力してください");
    });
    it("should throw with instanceof Class", () => {
      expect(() => sub(-10, 110)).toThrow(Error);
      expect(() => sub(-10, 110)).toThrow(RangeError);
      expect(() => sub(-10, 110)).not.toThrow(HttpError);
    });
  });
});
