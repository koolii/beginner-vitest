import { describe, expect, it } from "vitest";

describe("検証 (number)", () => {
  const value = 2 + 2;

  it("検証値は期待値と等しい => .toBe()/.toEqual()", () => {
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });
  it("検証値は期待値より大きい => .toBeGreaterThan()/.toBeGreaterThanOrEqual()", () => {
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(4);
  });
  it("検証値は期待値より小さい => .toBeLessThan()/.toBeLessThanOrEqual()", () => {
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4);
  });
  it("小数計算は正確ではない => toBe()", () => {
    expect(0.1 + 0.2).not.toBe(0.3);
  });
  it("指定の小数点以下n桁までを比較する => .toBeCloseTo(), default:小数点以下2桁", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
    expect(0.1 + 0.2).toBeCloseTo(0.3, 15);
    expect(0.1 + 0.2).not.toBeCloseTo(0.3, 16);
  });
});

describe("検証 (string)", () => {
  const str = "こんにちは世界";

  it("検証値は期待値と等しい", () => {
    expect(str).toBe("こんにちは世界");
    expect(str).toEqual("こんにちは世界");
  });
  it(".toContain()", () => {
    expect(str).toContain("世界");
    expect(str).not.toContain("さようなら");
  });
  it("正規表現 => .toMatch()", () => {
    expect(str).toMatch(/世界/);
    expect(str).not.toMatch(/さようなら/);
  });
  it("文字列長 => .toHaveLength()", () => {
    expect(str).toHaveLength(7);
    expect(str).not.toHaveLength(8);
  });
  describe("オブジェクト内の文字列検証", () => {
    const message = "こんにちは世界";
    const obj = { status: 200, message };
    it("expect.stringContaining()", () => {
      expect(obj).toEqual({
        status: 200,
        message: expect.stringContaining("世界"),
      });
    });
    it("expect.stringMatching()", () => {
      expect(obj).toEqual({
        status: 200,
        message: expect.stringMatching(/世界/),
      });
    });
  });
});

describe("検証 (Array)", () => {
  const tags: string[] = [
    "Jest",
    "Storybook",
    "Playwright",
    "React",
    "Next.js",
  ];
  it("要素が含まれる => .toContain()", () => {
    expect(tags).toContain("Jest");
    expect(tags).not.toContain("Vue");
  });
  it("配列長 => .toHaveLength()", () => {
    expect(tags).toHaveLength(5);
    expect(tags).not.toHaveLength(1);
  });
  describe("配列に特定のオブジェクトの検証", () => {
    const article1 = { author: "taro", title: "Testing Next.js" };
    const article2 = { author: "jiro", title: "Storybook play function" };
    const article3 = { author: "hanako", title: "Visual Regression Testing" };
    const articles = [article1, article2, article3];

    it("特定のオブジェクトが含まれているか => .toContainEqual()", () => {
      expect(articles).toContainEqual(article1);
      expect(articles).toContainEqual(article2);
      expect(articles).toContainEqual(article3);
    });
    it("引数に与えた配列要素が全て含まれているか => expect.arrayContaining()", () => {
      expect(articles).toEqual(
        expect.arrayContaining([article1, article2, article3])
      );
    });
  });
});

describe("検証 (Object)", () => {
  const author = { name: "taroyamada", age: 28 };
  it("完全一致または、プロパティが部分的に一致 => .toMatchObject()", () => {
    expect(author).toMatchObject({ name: "taroyamada", age: 28 });
    expect(author).toMatchObject({ name: "taroyamada" });
    expect(author).not.toMatchObject({ name: "jiro" });
  });
  it("特定のプロパティが存在するか => .toHaveProperty()", () => {
    expect(author).toHaveProperty("name");
    expect(author).toHaveProperty("age");
    expect(author).not.toHaveProperty("address");
  });
});
