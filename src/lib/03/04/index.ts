export function add(a: number, b: number): number {
  return Math.min(a + b, 100);
}

export function sub(a: number, b: number): number {
  return Math.max(a - b, 0);
}
