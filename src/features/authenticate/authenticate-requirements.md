# Passwordless Authentication

User Goal: Create account without password friction

Passkey is first-class - primary sign-in mechanism.

Sign Up flow:

Given a new user signing up, should prompt for email and auth with email magic
link so that we have a reliable fallback to add/manage passkeys Given a user
signing in with email magic link, after the magic link auth succeeds, should
present the user with passkey auth Given a user attempting to sign in with the
same magic link a second time, should inform the user that the link is expired
and offer passkey auth, or a new link, instead

Sign in flow:

Given an existing user signing in, should prompt for passkey authentication, and
include a link to trigger a magic link flow in case they don't have a passkey on
the current device. Given the user has successfully authenticated, should
trigger sign in success flow
