export class HttpError extends Error {}
export class RangeError extends Error {}

const checkRange = (value: number): void => {
  if (value < 0 || value > 100) {
    throw new RangeError("入力値は0-100の間で入力してください");
  }
};

export function add(a: number, b: number): number {
  checkRange(a);
  checkRange(b);
  return Math.min(a + b, 100);
}

export function sub(a: number, b: number): number {
  checkRange(a);
  checkRange(b);
  return Math.max(a - b, 0);
}
