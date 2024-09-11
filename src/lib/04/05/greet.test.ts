import { describe, it, vi, expect } from "vitest";
import { greet } from "./greet";

describe("モック関数 vi.fn()", () => {
  it("モック関数は実行された", () => {
    const mockFn = vi.fn();
    mockFn();
    expect(mockFn).toBeCalled();
  });

  it("モック関数は実行されていない", () => {
    const mockFn = vi.fn();
    expect(mockFn).not.toBeCalled();
  });

  it("モック関数は実行された回数を記録している", () => {
    const mockFn = vi.fn();
    mockFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
    mockFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("モック関数は関数の中でも実行できる", () => {
    const mockFn = vi.fn();
    function greet(message: string) {
      mockFn(message); // 引数を持って実行されている
    }
    greet("hello"); // "hello" を持って実行されたことがmockFnに記録される
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("モック関数はテスト対象の引数として仕様できる => モック関数が活躍するシーン、テスト対象の引数に「関数」がある時", () => {
    const mockFn = vi.fn();
    greet("Jiro", mockFn);
    expect(mockFn).toHaveBeenCalledWith("Hello! Jiro");
  });
});
