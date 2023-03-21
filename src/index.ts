
/**
 * _Calculates the factorial of a number_
 * @param n The number for which we want to calculate its factorial
 * @returns The factorial of n
 * ```ts
 * factorial(1)
 * factorial(10)
 * ```
 */
export function factorial(n: number): number {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

/**
 * _Calculates the addition of two numbers_
 * @param n1 First operand of addition
 * @param n2 Second operand of addition
 * @returns The addition of n1 and n2
 * ```ts
 * add(3, 5)
 * add(7.6, -3.5)
 * ```
 */
export function add(n1: number, n2: number) {
  return n1 + n2;
}
