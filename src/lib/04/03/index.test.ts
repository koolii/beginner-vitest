import { describe, expect, it, vi } from "vitest";

import * as Fetchers from "../../fetchers";
import { getGreet } from "./fetchers";

vi.mock("../../fetchers");

describe("vi.spyOn()で関数をスタブ化する", () => {
  it("データ取得成功時 => vi.spyOn().mockResolvedValueOnce()", async () => {
    // vi.mock()とは違うスタブ実装方法
    let spy = vi.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "xxxxxx-123456",
      email: "taroyamada@myapi.testing.com",
      age: 30,
    });

    await expect(getGreet()).resolves.toBe("Hello, anonymous user!");
    await spy.mockRestore();

    spy = vi.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "xxxxxx-123456",
      email: "taroyamada@myapi.testing.com",
      age: 30,
      name: "taroyamada",
    });

    await expect(getGreet()).resolves.toBe("Hello, taroyamada!");
    await spy.mockRestore();
  });
  it("データ取得失敗時 => vi.spyOn().mockRejectedValueOnce()", async () => {
    const spy = vi
      .spyOn(Fetchers, "getMyProfile")
      .mockRejectedValueOnce(Fetchers.httpError);

    await expect(getGreet()).rejects.toMatchObject({
      err: { message: "internal server error" },
    });

    await spy.mockRestore();
  });
  it("データ取得失敗時、エラー相当のデータが例外としてスローされる => vi.spyOn().mockRejectedValueOnce()", async () => {
    expect.assertions(1);

    const spy = vi
      .spyOn(Fetchers, "getMyProfile")
      .mockRejectedValueOnce(Fetchers.httpError);

    try {
      await getGreet();
    } catch (err) {
      expect(err).toMatchObject(Fetchers.httpError);
    } finally {
      await spy.mockRestore();
    }
  });
});
