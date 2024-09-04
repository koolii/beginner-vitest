import { describe, expect, it } from "vitest";

import { wait, timeout } from "./index";

describe("非同期", () => {
  describe("正常終了", () => {
    it("Promise (with .then()) return", async () => {
      return wait(50).then((result) => {
        expect(result).toBe(50);
      });
    });

    it("async/await + .resolves", async () => {
      expect(wait(50)).resolves.toBe(50);
    });

    it("async/await + simplest pattern", async () => {
      expect(await wait(50)).toBe(50);
    });
  });

  describe("エラー", () => {
    it("Promise (with .catch()) return", () => {
      return timeout(50).catch((result) => {
        expect(result).toBe(50);
      });
    });
    // todo other reject tests
    it("rejects", () => {
      return expect(timeout(50)).rejects.toBe(50);
    });
    it("async/await + .rejects", async () => {
      await expect(timeout(50)).rejects.toBe(50);
    });
    it("async/await + try/catch", async () => {
      expect.assertions(1); // アサーションが確実に呼ばれることを確認する、引数(number)に回数を指定する
      try {
        await timeout(50);
      } catch (err) {
        expect(err).toBe(50);
      }
    });
  });
});
