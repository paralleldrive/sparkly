/**
 * Composes async functions in reverse mathematical order (pipe order).
 * Takes functions as arguments and returns a new function that applies them left-to-right.
 * The first function can accept multiple arguments, while subsequent functions receive single values.
 *
 * @param {...Function} fns - Async functions to compose
 * @returns {Function} A new async function that applies the composed functions
 *
 * @example
 * const add = async (x, y) => x + y;
 * const multiply2 = async (x) => x * 2;
 * const subtract1 = async (x) => x - 1;
 *
 * const pipeline = asyncPipe(add, multiply2, subtract1);
 * const result = await pipeline(10, 5); // ((10 + 5) * 2) - 1 = 29
 */
export const asyncPipe =
  (...fns) =>
  (...args) => {
    if (fns.length === 0) return Promise.resolve(args[0]);

    const [firstFunction, ...restFns] = fns;
    const initialValue = firstFunction(...args);

    return restFns.reduce(
      async (accumulator, function_) => function_(await accumulator),
      initialValue,
    );
  };
