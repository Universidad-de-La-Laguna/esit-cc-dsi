/**
 * _Calculates the factorial of a number_
 * @param n The number for which we want to calculate its factorial
 * @returns The factorial of n
 * ```ts
 * factorial(1)
 * factorial(10)
 * ```
 */
function factorial(n: number) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(10));
