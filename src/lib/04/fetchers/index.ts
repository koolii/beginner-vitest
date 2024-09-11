import { Articles, HttpError, Profile } from "./type";

export const httpError: HttpError = {
  err: { message: "internal server error" },
};

async function handleResponse(res: Response) {
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
}

const host = (path: string) => `https://myapi.testing.com${path}`;

export function getMyProfile(): Promise<Profile> {
  return fetch(host("/my/profile")).then(handleResponse);
}

export function getMyArticles(): Promise<Articles> {
  return fetch(host("/my/articles")).then(handleResponse);
}
