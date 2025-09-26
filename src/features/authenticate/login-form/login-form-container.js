import { useState } from 'react';
import { connect } from 'react-redux';
import z from 'zod';

import { showVerificationAwaiting } from '@/features/authenticate/user-authentication-reducer';
import { createClient } from '@/lib/supabase/component';

import { LoginForm } from './login-form-component';

const schema = z.object({
  email: z.email('Please enter a valid email address'),
});

function LoginFormContainer({
  showVerificationAwaiting: showVerificationAwaitingAction,
}) {
  const [emailError, setEmailError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const supabase = createClient();

  async function handleSubmit({ email }) {
    // Reset errors
    setEmailError('');

    // Validate with schema
    const validation = schema.safeParse({ email });

    if (!validation.success) {
      const errorTree = z.treeifyError(validation.error);
      const emailErrors = errorTree.properties?.email?.errors;

      if (emailErrors?.length) setEmailError(emailErrors[0]);
      return;
    }

    // Start signing in process
    setIsSigningIn(true);

    try {
      // Call Supabase for existing user login
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });

      if (error) {
        // Handle specific error cases
        if (error.message?.includes('User not found')) {
          setEmailError(
            'No account found with this email. Would you like to sign up instead?',
          );
        } else {
          setEmailError(error.message || 'An error occurred during sign in');
        }
        return;
      }

      // Success - dispatch action to show verification awaiting form
      showVerificationAwaitingAction();
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <LoginForm
      onSignInClicked={handleSubmit}
      emailError={emailError}
      isSigningIn={isSigningIn}
    />
  );
}

const mapStateToProps = undefined;

const mapDispatchToProps = {
  showVerificationAwaiting,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
