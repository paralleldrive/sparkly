import { useState } from 'react';
import { connect } from 'react-redux';
import z from 'zod';

import { showVerificationAwaiting } from '@/features/authenticate/user-authentication-reducer';
import { createClient } from '@/lib/supabase/component';

import { RegisterForm } from './register-form-component';

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.email('Please enter a valid email address'),
});

function RegisterFormContainer({
  showVerificationAwaiting: showVerificationAwaitingAction,
}) {
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const supabase = createClient();

  async function handleSubmit({ name, email }) {
    // Reset errors
    setNameError('');
    setEmailError('');

    // Validate with schema
    const validation = schema.safeParse({ name, email });

    if (!validation.success) {
      const errorTree = z.treeifyError(validation.error);
      const nameErrors = errorTree.properties?.name?.errors;
      const emailErrors = errorTree.properties?.email?.errors;

      if (nameErrors?.length) setNameError(nameErrors[0]);
      if (emailErrors?.length) setEmailError(emailErrors[0]);
      return;
    }

    // Start signing up process
    setIsSigningUp(true);

    try {
      // If validation passes, call Supabase
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { data: { name }, shouldCreateUser: true },
      });

      if (error) {
        // Handle Supabase authentication errors
        setEmailError(error.message || 'An error occurred during registration');
        return;
      }

      // Success - dispatch action to show verification awaiting form
      showVerificationAwaitingAction();
    } finally {
      setIsSigningUp(false);
    }
  }

  return (
    <RegisterForm
      onSignUpClicked={handleSubmit}
      nameError={nameError}
      emailError={emailError}
      isSigningUp={isSigningUp}
    />
  );
}

const mapStateToProps = undefined;

const mapDispatchToProps = {
  showVerificationAwaiting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterFormContainer);
