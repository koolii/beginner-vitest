import { describe, expect, it, vi } from "vitest";

import * as Fetchers from "../fetchers";
import { getMyArticlesData } from "../fetchers/fixtures";
import { getMyArticleLinksByCategory } from ".";

// 「モック生成関数」を用意することでテストで必要なセットアップを、必要最小限のパラメータで切替可能にしたユーティリティ関数です。
// 引数statusはHTTPステータスコードを示唆するものです
// このユーティリティ関数を使えば、 `spyOn` をテスト毎に書く必要がなくなり、セットアップが端的になります。
function mockGetMyArticles(status = 200) {
  if (status > 299) {
    return vi
      .spyOn(Fetchers, "getMyArticles")
      .mockRejectedValueOnce(Fetchers.httpError);
  }
  return vi
    .spyOn(Fetchers, "getMyArticles")
    .mockResolvedValueOnce(getMyArticlesData());
}

describe("レスポンスデータを切り替える「モック生成関数」を使ったテスト手法", () => {
  it("指定したタグを持つ記事が一見もない場合、nullが返る", async () => {
    mockGetMyArticles();
    const data = await getMyArticleLinksByCategory("playwright");
    expect(data).toBeNull();
  });

  it("指定したタグを持つ記事が1件以上ある場合、リンク一覧が返る", async () => {
    mockGetMyArticles();
    const data = await getMyArticleLinksByCategory("testing");
    expect(data).toMatchObject([
      {
        link: "/articles/howto-testing-with-typescript",
        title: "TypeScript を使ったテストの書き方",
      },
      {
        link: "/articles/react-component-testing-with-jest",
        title: "Jest ではじめる React のコンポーネントテスト",
      },
    ]);
  });

  it("データ取得に失敗した場合、rejectされる", async () => {
    mockGetMyArticles(500);
    await getMyArticleLinksByCategory("testing").catch((err) => {
      expect(err).toMatchObject({
        err: { message: "internal server error" },
      });
    });
  });
});
