import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import rootReducer from '../../redux/root-reducer.js';
import {
  selectIsAwaitingVerification,
  showVerificationAwaiting,
} from './user-authentication-reducer.js';

describe('selectIsAwaitingVerification()', () => {
  test('initial state', () => {
    const rootState = rootReducer(undefined, {});

    assert({
      given: 'the application starts',
      should: 'initialize with verification not awaiting',
      actual: selectIsAwaitingVerification(rootState),
      expected: false,
    });
  });

  test('show verification awaiting action', () => {
    const state = rootReducer(undefined, showVerificationAwaiting());

    assert({
      given: 'show verification awaiting is dispatched',
      should: 'set awaiting verification to true',
      actual: selectIsAwaitingVerification(state),
      expected: true,
    });
  });
});
