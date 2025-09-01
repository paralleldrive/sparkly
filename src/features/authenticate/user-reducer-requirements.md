# User Authentication State Reducer Requirements

User Goal: Manage authentication state transitions without side effects

State should track authentication status, user data, loading states, and error
conditions.

## Initial State:

- Given the application starts, should initialize with user unauthenticated, no
  loading states, and no errors

## Magic Link Authentication State:

- Given a magic link request is initiated, should set loading state to true and
  clear any previous errors
- Given a magic link request succeeds, should set magic link as sent and clear
  loading state
- Given a magic link request fails, should set appropriate error message and
  clear loading state
- Given a magic link verification is initiated, should set verification loading
  state
- Given a magic link verification succeeds, should mark user as authenticated
  via magic link and store user data
- Given a magic link verification fails, should set verification error and keep
  user unauthenticated
- Given a magic link is expired or already used, should set specific expired
  link error state

## Passkey Authentication State:

- Given a passkey authentication is initiated, should set passkey loading state
  and clear previous errors
- Given a passkey authentication succeeds, should mark user as fully
  authenticated and store user data
- Given a passkey authentication fails, should set passkey error and keep user
  unauthenticated
- Given a passkey registration is initiated, should set passkey registration
  loading state
- Given a passkey registration succeeds, should update user state to include
  passkey capability
- Given a passkey registration fails, should set passkey registration error

## User Creation State:

- Given user creation is initiated, should set user creation loading state
- Given user creation succeeds, should store new user data and mark as
  authenticated
- Given user creation fails, should set user creation error and keep user
  unauthenticated

## Session Management State:

- Given authentication success (any method), should store user session data and
  authentication method used
- Given authentication expires or is invalidated, should clear user data and
  reset to unauthenticated state
- Given user explicitly signs out, should clear all user state and reset
  authentication status

## Error Recovery State:

- Given any authentication error occurs, should preserve error state until next
  authentication attempt
- Given a new authentication attempt starts, should clear previous errors for
  that authentication method
- Given multiple authentication methods fail, should track errors for each
  method separately
