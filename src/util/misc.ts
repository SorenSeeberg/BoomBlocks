export function sum(numbers: number[]): number {
  let result: number = 0;
  for (let x = 0; x < numbers.length; x++) {
    result += numbers[x];
  }
  return result;
}
