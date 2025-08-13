import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

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
