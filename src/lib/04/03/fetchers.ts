import { getMyProfile } from "../../fetchers";

export async function getGreet() {
  const { name } = await getMyProfile();
  if (!name) {
    return `Hello, anonymous user!`;
  }
  return `Hello, ${name}!`;
}
