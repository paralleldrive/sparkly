import { pipe, prop } from 'ramda';

export const sliceName = 'userAuthentication';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: '',
  magicLinkSent: false,
  userData: null,
  authenticationMethod: null,
};

// Actions
export const magicLinkRequested = email => ({
  type: 'MAGIC_LINK_REQUESTED',
  payload: { email },
});

export const magicLinkRequestSucceeded = () => ({
  type: 'MAGIC_LINK_REQUEST_SUCCEEDED',
});

export const magicLinkRequestFailed = error => ({
  type: 'MAGIC_LINK_REQUEST_FAILED',
  payload: { error },
});

export const magicLinkVerificationStarted = () => ({
  type: 'MAGIC_LINK_VERIFICATION_STARTED',
});

export const magicLinkVerificationSucceeded = userData => ({
  type: 'MAGIC_LINK_VERIFICATION_SUCCEEDED',
  payload: { userData },
});

export const magicLinkVerificationFailed = error => ({
  type: 'MAGIC_LINK_VERIFICATION_FAILED',
  payload: { error },
});

export const magicLinkExpired = () => ({
  type: 'MAGIC_LINK_EXPIRED',
});

export const passkeyAuthenticationStarted = () => ({
  type: 'PASSKEY_AUTHENTICATION_STARTED',
});

export const passkeyAuthenticationSucceeded = userData => ({
  type: 'PASSKEY_AUTHENTICATION_SUCCEEDED',
  payload: { userData },
});

export const passkeyAuthenticationFailed = error => ({
  type: 'PASSKEY_AUTHENTICATION_FAILED',
  payload: { error },
});

export const passkeyRegistrationStarted = () => ({
  type: 'PASSKEY_REGISTRATION_STARTED',
});

export const passkeyRegistrationSucceeded = userData => ({
  type: 'PASSKEY_REGISTRATION_SUCCEEDED',
  payload: { userData },
});

export const passkeyRegistrationFailed = error => ({
  type: 'PASSKEY_REGISTRATION_FAILED',
  payload: { error },
});

export const userSignedOut = () => ({
  type: 'USER_SIGNED_OUT',
});

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case magicLinkRequested().type: {
      return {
        ...state,
        isLoading: true,
        error: '',
        magicLinkSent: false,
      };
    }
    case magicLinkRequestSucceeded().type: {
      return {
        ...state,
        isLoading: false,
        magicLinkSent: true,
      };
    }
    case magicLinkRequestFailed().type: {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
        magicLinkSent: false,
      };
    }
    case magicLinkVerificationStarted().type: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }
    case magicLinkVerificationSucceeded().type: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        userData: payload.userData,
        authenticationMethod: 'magic-link',
        error: '',
      };
    }
    case magicLinkVerificationFailed().type: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: payload.error,
        userData: null,
        authenticationMethod: null,
      };
    }
    case magicLinkExpired().type: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: 'Magic link has expired or already been used',
        userData: null,
        authenticationMethod: null,
      };
    }
    case passkeyAuthenticationStarted().type: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }
    case passkeyAuthenticationSucceeded().type: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        userData: payload.userData,
        authenticationMethod: 'passkey',
        error: '',
      };
    }
    case passkeyAuthenticationFailed().type: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: payload.error,
        userData: null,
        authenticationMethod: null,
      };
    }
    case passkeyRegistrationStarted().type: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }
    case passkeyRegistrationSucceeded().type: {
      return {
        ...state,
        isLoading: false,
        userData: payload.userData,
        error: '',
        // Note: Registration does not set authenticationMethod or isAuthenticated
        // User must still authenticate via passkey or magic link
      };
    }
    case passkeyRegistrationFailed().type: {
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    }
    case userSignedOut().type: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

const selectUserAuthenticationState = prop(sliceName);

// Selectors
export const selectIsAuthenticated = pipe(
  selectUserAuthenticationState,
  prop('isAuthenticated'),
);
export const selectIsLoading = pipe(
  selectUserAuthenticationState,
  prop('isLoading'),
);
export const selectError = pipe(selectUserAuthenticationState, prop('error'));
export const selectMagicLinkSent = pipe(
  selectUserAuthenticationState,
  prop('magicLinkSent'),
);
export const selectUserData = pipe(
  selectUserAuthenticationState,
  prop('userData'),
);
export const selectAuthenticationMethod = pipe(
  selectUserAuthenticationState,
  prop('authenticationMethod'),
);
