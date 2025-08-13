import { describe, test } from 'vitest';
import { expect } from 'vitest';

export const assert = ({ given, should, actual, expected }) => {
  expect(actual, `Given ${given}: should ${should}`).toStrictEqual(expected);
};

describe('Test suite', () => {
  test('should run the placeholder test suite', () => {
    assert({
      given: 'No other tests to run',
      should: 'run the placeholder test suite',
      actual: 'Placeholder - please write a test suite!',
      expected: 'Placeholder - please write a test suite!',
    });
  });
});
