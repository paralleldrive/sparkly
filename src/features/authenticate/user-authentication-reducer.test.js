import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import { rootReducer } from '../../redux/root-reducer.js';
import { createPopulatedUser } from './user-authentication-factories.js';
import {
  magicLinkExpired,
  magicLinkRequested,
  magicLinkRequestFailed,
  magicLinkRequestSucceeded,
  magicLinkVerificationFailed,
  magicLinkVerificationStarted,
  magicLinkVerificationSucceeded,
  passkeyAuthenticationFailed,
  passkeyAuthenticationStarted,
  passkeyAuthenticationSucceeded,
  passkeyRegistrationFailed,
  passkeyRegistrationStarted,
  passkeyRegistrationSucceeded,
  selectAuthenticationMethod,
  selectError,
  selectIsAuthenticated,
  selectIsLoading,
  selectMagicLinkSent,
  selectUserData,
  userSignedOut,
} from './user-authentication-reducer.js';

describe('selectIsAuthenticated()', () => {
  test('initial state', () => {
    const rootState = rootReducer(undefined, {});

    assert({
      given: 'the application starts',
      should: 'initialize with user unauthenticated',
      actual: selectIsAuthenticated(rootState),
      expected: false,
    });
  });

  test('magic link verification succeeds', () => {
    const userData = createPopulatedUser();
    const actions = [
      magicLinkVerificationStarted(),
      magicLinkVerificationSucceeded(userData),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link verification succeeds',
      should: 'mark user as authenticated via magic link',
      actual: selectIsAuthenticated(state),
      expected: true,
    });
  });

  test('magic link verification fails', () => {
    const actions = [
      magicLinkVerificationStarted(),
      magicLinkVerificationFailed('Invalid or expired token'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link verification fails',
      should: 'keep user unauthenticated',
      actual: selectIsAuthenticated(state),
      expected: false,
    });
  });

  test('passkey authentication succeeds', () => {
    const userData = createPopulatedUser();
    const actions = [
      passkeyAuthenticationStarted(),
      passkeyAuthenticationSucceeded(userData),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a passkey authentication succeeds',
      should: 'mark user as fully authenticated and store user data',
      actual: selectIsAuthenticated(state),
      expected: true,
    });
  });

  test('passkey authentication fails', () => {
    const actions = [
      passkeyAuthenticationStarted(),
      passkeyAuthenticationFailed('Passkey verification failed'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a passkey authentication fails',
      should: 'set passkey error and keep user unauthenticated',
      actual: selectIsAuthenticated(state),
      expected: false,
    });
  });

  test('magic link expires after authentication', () => {
    const userData = createPopulatedUser();
    const actions = [
      magicLinkVerificationSucceeded(userData),
      magicLinkExpired(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'authentication expires or is invalidated',
      should: 'clear user data and reset to unauthenticated state',
      actual: selectIsAuthenticated(state),
      expected: false,
    });
  });

  test('passkey authentication fails after success', () => {
    const userData = createPopulatedUser();
    const actions = [
      passkeyAuthenticationSucceeded(userData),
      passkeyAuthenticationFailed('Session invalidated'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'authentication expires or is invalidated',
      should: 'clear user data and reset to unauthenticated state',
      actual: selectIsAuthenticated(state),
      expected: false,
    });
  });

  test('user explicitly signs out', () => {
    const userData = createPopulatedUser();
    const actions = [magicLinkVerificationSucceeded(userData), userSignedOut()];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'user explicitly signs out',
      should: 'clear all user state and reset authentication status',
      actual: selectIsAuthenticated(state),
      expected: false,
    });
  });
});

describe('selectIsLoading()', () => {
  test('initial state', () => {
    const rootState = rootReducer(undefined, {});

    assert({
      given: 'the application starts',
      should: 'initialize with no loading state',
      actual: selectIsLoading(rootState),
      expected: false,
    });
  });

  test('magic link requested', () => {
    const state = rootReducer(
      undefined,
      magicLinkRequested('user@example.com'),
    );

    assert({
      given: 'a magic link request was initiated',
      should: 'set loading state to true',
      actual: selectIsLoading(state),
      expected: true,
    });
  });

  test('magic link request succeeds', () => {
    const actions = [
      magicLinkRequested('user@example.com'),
      magicLinkRequestSucceeded(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link request succeeds',
      should: 'clear loading state',
      actual: selectIsLoading(state),
      expected: false,
    });
  });

  test('magic link request fails', () => {
    const actions = [
      magicLinkRequested('user@example.com'),
      magicLinkRequestFailed('Network error'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link request fails',
      should: 'clear loading state',
      actual: selectIsLoading(state),
      expected: false,
    });
  });

  test('magic link verification initiated', () => {
    const state = rootReducer(undefined, magicLinkVerificationStarted());

    assert({
      given: 'a magic link verification is initiated',
      should: 'set verification loading state',
      actual: selectIsLoading(state),
      expected: true,
    });
  });

  test('passkey authentication initiated', () => {
    const actions = [
      magicLinkRequestFailed('Previous error'),
      passkeyAuthenticationStarted(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a passkey authentication is initiated',
      should: 'set passkey loading state and clear previous errors',
      actual: selectIsLoading(state),
      expected: true,
    });
  });

  test('passkey registration initiated', () => {
    const state = rootReducer(undefined, passkeyRegistrationStarted());

    assert({
      given: 'a passkey registration is initiated',
      should: 'set passkey registration loading state',
      actual: selectIsLoading(state),
      expected: true,
    });
  });

  test('user explicitly signs out', () => {
    const actions = [magicLinkRequested('user@example.com'), userSignedOut()];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'user explicitly signs out',
      should: 'clear all user state and reset authentication status',
      actual: selectIsLoading(state),
      expected: false,
    });
  });
});

describe('selectError()', () => {
  test('initial state', () => {
    const rootState = rootReducer(undefined, {});

    assert({
      given: 'the application starts',
      should: 'initialize with no errors',
      actual: selectError(rootState),
      expected: '',
    });
  });

  test('magic link requested', () => {
    const state = rootReducer(
      undefined,
      magicLinkRequested('user@example.com'),
    );

    assert({
      given: 'a magic link request was initiated',
      should: 'clear any previous errors',
      actual: selectError(state),
      expected: '',
    });
  });

  test('magic link request fails', () => {
    const actions = [
      magicLinkRequested('user@example.com'),
      magicLinkRequestFailed('Network error'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link request fails',
      should: 'set appropriate error message',
      actual: selectError(state),
      expected: 'Network error',
    });
  });

  test('magic link verification initiated', () => {
    const actions = [
      magicLinkRequestFailed('Previous error'),
      magicLinkVerificationStarted(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link verification is initiated',
      should: 'clear any previous errors',
      actual: selectError(state),
      expected: '',
    });
  });

  test('magic link verification fails', () => {
    const actions = [
      magicLinkVerificationStarted(),
      magicLinkVerificationFailed('Invalid or expired token'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link verification fails',
      should: 'set verification error',
      actual: selectError(state),
      expected: 'Invalid or expired token',
    });
  });

  test('magic link is expired or already used', () => {
    const state = rootReducer(undefined, magicLinkExpired());

    assert({
      given: 'a magic link is expired or already used',
      should: 'set specific expired link error state',
      actual: selectError(state),
      expected: 'Magic link has expired or already been used',
    });
  });

  test('passkey authentication initiated', () => {
    const actions = [
      magicLinkRequestFailed('Previous error'),
      passkeyAuthenticationStarted(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a passkey authentication is initiated',
      should: 'set passkey loading state and clear previous errors',
      actual: selectError(state),
      expected: '',
    });
  });

  test('passkey authentication fails', () => {
    const actions = [
      passkeyAuthenticationStarted(),
      passkeyAuthenticationFailed('Passkey verification failed'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a passkey authentication fails',
      should: 'set passkey error and keep user unauthenticated',
      actual: selectError(state),
      expected: 'Passkey verification failed',
    });
  });

  test('passkey registration fails', () => {
    const actions = [
      passkeyRegistrationStarted(),
      passkeyRegistrationFailed('Passkey registration failed'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a passkey registration fails',
      should: 'set passkey registration error',
      actual: selectError(state),
      expected: 'Passkey registration failed',
    });
  });

  test('user explicitly signs out', () => {
    const actions = [magicLinkRequestFailed('Network error'), userSignedOut()];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'user explicitly signs out',
      should: 'clear all user state and reset authentication status',
      actual: selectError(state),
      expected: '',
    });
  });

  test('magic link error persists until next authentication attempt', () => {
    const errorMessage = 'Magic link request failed';
    const state = rootReducer(undefined, magicLinkRequestFailed(errorMessage));

    assert({
      given: 'any authentication error occurs',
      should: 'preserve error state until next authentication attempt',
      actual: selectError(state),
      expected: errorMessage,
    });
  });

  test('passkey error persists until next authentication attempt', () => {
    const errorMessage = 'Passkey authentication failed';
    const state = rootReducer(
      undefined,
      passkeyAuthenticationFailed(errorMessage),
    );

    assert({
      given: 'any authentication error occurs',
      should: 'preserve error state until next authentication attempt',
      actual: selectError(state),
      expected: errorMessage,
    });
  });

  test('passkey registration error persists until next authentication attempt', () => {
    const errorMessage = 'Passkey registration failed';
    const state = rootReducer(
      undefined,
      passkeyRegistrationFailed(errorMessage),
    );

    assert({
      given: 'any authentication error occurs',
      should: 'preserve error state until next authentication attempt',
      actual: selectError(state),
      expected: errorMessage,
    });
  });

  test('magic link expired error persists until next authentication attempt', () => {
    const state = rootReducer(undefined, magicLinkExpired());

    assert({
      given: 'any authentication error occurs',
      should: 'preserve error state until next authentication attempt',
      actual: selectError(state),
      expected: 'Magic link has expired or already been used',
    });
  });

  test('new magic link request clears previous magic link error', () => {
    const actions = [
      magicLinkRequestFailed('Previous magic link error'),
      magicLinkRequested('user@example.com'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a new authentication attempt starts',
      should: 'clear previous errors for that authentication method',
      actual: selectError(state),
      expected: '',
    });
  });

  test('new magic link verification clears previous magic link error', () => {
    const actions = [
      magicLinkRequestFailed('Previous magic link error'),
      magicLinkVerificationStarted(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a new authentication attempt starts',
      should: 'clear previous errors for that authentication method',
      actual: selectError(state),
      expected: '',
    });
  });

  test('new passkey authentication clears previous passkey error', () => {
    const actions = [
      passkeyAuthenticationFailed('Previous passkey error'),
      passkeyAuthenticationStarted(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a new authentication attempt starts',
      should: 'clear previous errors for that authentication method',
      actual: selectError(state),
      expected: '',
    });
  });

  test('new passkey registration clears previous passkey error', () => {
    const actions = [
      passkeyRegistrationFailed('Previous passkey error'),
      passkeyRegistrationStarted(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a new authentication attempt starts',
      should: 'clear previous errors for that authentication method',
      actual: selectError(state),
      expected: '',
    });
  });

  test('passkey attempt clears magic link error', () => {
    const actions = [
      magicLinkRequestFailed('Magic link error'),
      passkeyAuthenticationStarted(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a new authentication attempt starts',
      should: 'clear previous errors for that authentication method',
      actual: selectError(state),
      expected: '',
    });
  });

  test('magic link attempt clears passkey error', () => {
    const actions = [
      passkeyAuthenticationFailed('Passkey error'),
      magicLinkRequested('user@example.com'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a new authentication attempt starts',
      should: 'clear previous errors for that authentication method',
      actual: selectError(state),
      expected: '',
    });
  });

  test('magic link error does not affect passkey attempts', () => {
    const actions = [
      magicLinkRequestFailed('Magic link network error'),
      passkeyAuthenticationFailed('Passkey verification failed'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'multiple authentication methods fail',
      should: 'track errors for each method separately',
      actual: selectError(state),
      expected: 'Passkey verification failed',
    });
  });

  test('passkey error does not affect magic link attempts', () => {
    const actions = [
      passkeyAuthenticationFailed('Passkey verification failed'),
      magicLinkRequestFailed('Magic link network error'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'multiple authentication methods fail',
      should: 'track errors for each method separately',
      actual: selectError(state),
      expected: 'Magic link network error',
    });
  });

  test('magic link verification error overwrites request error', () => {
    const actions = [
      magicLinkRequestFailed('Magic link request failed'),
      magicLinkVerificationStarted(),
      magicLinkVerificationFailed('Magic link verification failed'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'multiple authentication methods fail',
      should: 'track errors for each method separately',
      actual: selectError(state),
      expected: 'Magic link verification failed',
    });
  });

  test('passkey registration error does not affect authentication error', () => {
    const actions = [
      passkeyRegistrationFailed('Passkey registration failed'),
      passkeyAuthenticationFailed('Passkey authentication failed'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'multiple authentication methods fail',
      should: 'track errors for each method separately',
      actual: selectError(state),
      expected: 'Passkey authentication failed',
    });
  });

  test('expired magic link error is preserved independently', () => {
    const actions = [
      passkeyAuthenticationFailed('Passkey failed'),
      magicLinkExpired(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'multiple authentication methods fail',
      should: 'track errors for each method separately',
      actual: selectError(state),
      expected: 'Magic link has expired or already been used',
    });
  });
});

describe('selectMagicLinkSent()', () => {
  test('initial state', () => {
    const rootState = rootReducer(undefined, {});

    assert({
      given: 'the application starts',
      should: 'initialize with magic link not sent',
      actual: selectMagicLinkSent(rootState),
      expected: false,
    });
  });

  test('magic link request succeeds', () => {
    const actions = [
      magicLinkRequested('user@example.com'),
      magicLinkRequestSucceeded(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link request succeeds',
      should: 'set magic link as sent',
      actual: selectMagicLinkSent(state),
      expected: true,
    });
  });

  test('user explicitly signs out', () => {
    const actions = [
      magicLinkRequested('user@example.com'),
      magicLinkRequestSucceeded(),
      userSignedOut(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'user explicitly signs out',
      should: 'clear all user state and reset authentication status',
      actual: selectMagicLinkSent(state),
      expected: false,
    });
  });
});

describe('selectUserData()', () => {
  test('initial state', () => {
    const rootState = rootReducer(undefined, {});

    assert({
      given: 'the application starts',
      should: 'initialize with no user data',
      actual: selectUserData(rootState),
      expected: null,
    });
  });

  test('magic link verification succeeds', () => {
    const userData = createPopulatedUser();
    const actions = [
      magicLinkVerificationStarted(),
      magicLinkVerificationSucceeded(userData),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link verification succeeds',
      should: 'store user data',
      actual: selectUserData(state),
      expected: userData,
    });
  });

  test('magic link verification fails', () => {
    const userData = createPopulatedUser();
    const actions = [
      magicLinkVerificationSucceeded(userData),
      magicLinkVerificationFailed('Session expired'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a magic link verification fails',
      should: 'clear user data',
      actual: selectUserData(state),
      expected: null,
    });
  });

  test('passkey authentication succeeds', () => {
    const userData = createPopulatedUser();
    const actions = [
      passkeyAuthenticationStarted(),
      passkeyAuthenticationSucceeded(userData),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a passkey authentication succeeds',
      should: 'mark user as fully authenticated and store user data',
      actual: selectUserData(state),
      expected: userData,
    });
  });

  test('passkey registration succeeds', () => {
    const userData = createPopulatedUser();
    const actions = [
      passkeyRegistrationStarted(),
      passkeyRegistrationSucceeded(userData),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'a passkey registration succeeds',
      should: 'update user state to include passkey capability',
      actual: selectUserData(state),
      expected: userData,
    });
  });

  test('magic link expires', () => {
    const userData = createPopulatedUser();
    const actions = [
      magicLinkVerificationSucceeded(userData),
      magicLinkExpired(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'authentication expires or is invalidated',
      should: 'clear user data and reset to unauthenticated state',
      actual: selectUserData(state),
      expected: null,
    });
  });

  test('passkey authentication fails after success', () => {
    const userData = createPopulatedUser();
    const actions = [
      passkeyAuthenticationSucceeded(userData),
      passkeyAuthenticationFailed('Session invalidated'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'authentication expires or is invalidated',
      should: 'clear user data and reset to unauthenticated state',
      actual: selectUserData(state),
      expected: null,
    });
  });

  test('user explicitly signs out', () => {
    const userData = createPopulatedUser();
    const actions = [passkeyAuthenticationSucceeded(userData), userSignedOut()];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'user explicitly signs out',
      should: 'clear all user state and reset authentication status',
      actual: selectUserData(state),
      expected: null,
    });
  });
});

describe('selectAuthenticationMethod()', () => {
  test('initial state', () => {
    const rootState = rootReducer(undefined, {});

    assert({
      given: 'the application starts',
      should: 'initialize with no authentication method',
      actual: selectAuthenticationMethod(rootState),
      expected: null,
    });
  });

  test('magic link verification succeeds', () => {
    const userData = createPopulatedUser();
    const actions = [
      magicLinkVerificationStarted(),
      magicLinkVerificationSucceeded(userData),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'authentication success (any method)',
      should: 'store user session data and authentication method used',
      actual: selectAuthenticationMethod(state),
      expected: 'magic-link',
    });
  });

  test('passkey authentication succeeds', () => {
    const userData = createPopulatedUser();
    const actions = [
      passkeyAuthenticationStarted(),
      passkeyAuthenticationSucceeded(userData),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'authentication success (any method)',
      should: 'store user session data and authentication method used',
      actual: selectAuthenticationMethod(state),
      expected: 'passkey',
    });
  });

  test('magic link verification fails', () => {
    const userData = createPopulatedUser();
    const actions = [
      magicLinkVerificationSucceeded(userData),
      magicLinkVerificationFailed('Invalid token'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'authentication expires or is invalidated',
      should: 'clear user data and reset to unauthenticated state',
      actual: selectAuthenticationMethod(state),
      expected: null,
    });
  });

  test('magic link expires', () => {
    const userData = createPopulatedUser();
    const actions = [
      magicLinkVerificationSucceeded(userData),
      magicLinkExpired(),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'authentication expires or is invalidated',
      should: 'clear user data and reset to unauthenticated state',
      actual: selectAuthenticationMethod(state),
      expected: null,
    });
  });

  test('passkey authentication fails after success', () => {
    const userData = createPopulatedUser();
    const actions = [
      passkeyAuthenticationSucceeded(userData),
      passkeyAuthenticationFailed('Session invalidated'),
    ];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'authentication expires or is invalidated',
      should: 'clear user data and reset to unauthenticated state',
      actual: selectAuthenticationMethod(state),
      expected: null,
    });
  });

  test('user explicitly signs out', () => {
    const userData = createPopulatedUser();
    const actions = [magicLinkVerificationSucceeded(userData), userSignedOut()];
    const state = actions.reduce(rootReducer, rootReducer(undefined, {}));

    assert({
      given: 'user explicitly signs out',
      should: 'clear all user state and reset authentication status',
      actual: selectAuthenticationMethod(state),
      expected: null,
    });
  });
});
