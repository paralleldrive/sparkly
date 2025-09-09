import render from 'riteway/render-component';
import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import SignUpForm from './sign-up-form-component.jsx';

describe('SignUpForm component', () => {
  test('renders form title', () => {
    const $ = render(<SignUpForm />);

    const title = $('h1:contains("Create an account")');

    assert({
      given: 'a SignUpForm component',
      should: 'render the form title "Create an account"',
      actual: title.length,
      expected: 1,
    });
  });

  test('renders form subtitle', () => {
    const $ = render(<SignUpForm />);

    const subtitle = $(
      '[data-slot="card-description"]:contains("Enter your information to get started")',
    );

    assert({
      given: 'a SignUpForm component',
      should: 'render the subtitle "Enter your information to get started"',
      actual: subtitle.length,
      expected: 1,
    });
  });

  test('renders name input field', () => {
    const $ = render(<SignUpForm />);

    const nameLabel = $('label:contains("Name")');
    const nameInput = $('input[placeholder="Enter your name"]');

    assert({
      given: 'a SignUpForm component',
      should: 'render a name label and input field',
      actual: nameLabel.length + nameInput.length,
      expected: 2,
    });
  });

  test('renders email input field', () => {
    const $ = render(<SignUpForm />);

    const emailLabel = $('label:contains("Email")');
    const emailInput = $('input[type="email"][placeholder="name@example.com"]');

    assert({
      given: 'a SignUpForm component',
      should: 'render an email label and input field with proper type',
      actual: emailLabel.length + emailInput.length,
      expected: 2,
    });
  });

  test('renders Sign up button with CTA styling', () => {
    const $ = render(<SignUpForm />);

    const signUpButton = $('button:contains("Sign up")');
    const hasDefaultVariant =
      signUpButton.length > 0
        ? signUpButton.attr('class').includes('bg-primary')
        : false;

    assert({
      given: 'a SignUpForm component',
      should:
        'render a Sign up button with contrasting background (CTA styling)',
      actual: signUpButton.length === 1 && hasDefaultVariant,
      expected: true,
    });
  });

  test('renders sign in link', () => {
    const $ = render(<SignUpForm />);

    const alreadyMemberText = $(':contains("Already a member?")');
    const signInLink = $('a:contains("Sign in with your passkey")');

    assert({
      given: 'a SignUpForm component',
      should: 'render "Already a member?" text and sign in link',
      actual: alreadyMemberText.length > 0 && signInLink.length === 1,
      expected: true,
    });
  });
});
