import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import { asyncPipe } from './async-pipe.js';

const add5 = async x => x + 5;
const multiply2 = async x => x * 2;
const subtract3 = async x => x - 3;
const divide2 = async x => x / 2;
const double = async x => x * 2;
const throwError = async () => {
  throw new Error('Test error in pipeline');
};

// Functions for mixed sync/async test
const addSync = x => x + 10;
const multiplyAsync = async x => x * 3;
const subtractSync = x => x - 5;
const dividePromise = x => Promise.resolve(x / 2);

// Functions for multiple arguments test
const addThreeNumbers = async (x, y, z) => x + y + z;

describe('asyncPipe()', () => {
  test('should compose two async functions in pipe order', async () => {
    const pipeline = asyncPipe(add5, multiply2);
    const actual = await pipeline(10);
    const expected = 30; // (10 + 5) * 2 = 30

    assert({
      given: 'two async functions and an initial value of 10',
      should: 'compose functions in reverse mathematical order (pipe order)',
      actual,
      expected,
    });
  });

  test('should compose multiple async functions in pipe order', async () => {
    const pipeline = asyncPipe(add5, multiply2, subtract3, divide2);
    const actual = await pipeline(10);
    const expected = 13.5; // ((10 + 5) * 2 - 3) / 2 = (30 - 3) / 2 = 27 / 2 = 13.5

    assert({
      given: 'four async functions and an initial value of 10',
      should: 'apply functions in left-to-right order (pipe order)',
      actual,
      expected,
    });
  });

  test('should propagate errors from async functions', async () => {
    const pipeline = asyncPipe(add5, throwError, multiply2);

    let actualError;
    try {
      await pipeline(10);
    } catch (error) {
      actualError = error.message;
    }

    assert({
      given: 'a pipeline with a function that throws an error',
      should: 'propagate the error and stop execution',
      actual: actualError,
      expected: 'Test error in pipeline',
    });
  });

  test('should handle single function', async () => {
    const pipeline = asyncPipe(double);
    const actual = await pipeline(5);
    const expected = 10;

    assert({
      given: 'a single async function and initial value of 5',
      should: 'apply the single function',
      actual,
      expected,
    });
  });

  test('should return identity function when no functions provided', async () => {
    const pipeline = asyncPipe();
    const actual = await pipeline(42);
    const expected = 42;

    assert({
      given: 'no functions and initial value of 42',
      should: 'return the initial value unchanged',
      actual,
      expected,
    });
  });

  test('should handle mixing async and sync functions', async () => {
    const pipeline = asyncPipe(
      addSync,
      multiplyAsync,
      subtractSync,
      dividePromise,
    );
    const actual = await pipeline(5);
    const expected = 20; // (5 + 10) * 3 - 5) / 2 = ((15 * 3) - 5) / 2 = (45 - 5) / 2 = 40 / 2 = 20

    assert({
      given:
        'mix of sync functions, async functions, and promise-returning functions with initial value of 5',
      should: 'handle all function types correctly in the pipeline',
      actual,
      expected,
    });
  });

  test('should handle multiple arguments for first function', async () => {
    const pipeline = asyncPipe(addThreeNumbers, multiply2);
    const actual = await pipeline(5, 10, 15);
    const expected = 60; // (5 + 10 + 15) * 2 = 30 * 2 = 60

    assert({
      given:
        'a pipeline with first function accepting three arguments (5, 10, 15)',
      should:
        'pass all three arguments to first function and continue pipeline',
      actual,
      expected,
    });
  });
});
