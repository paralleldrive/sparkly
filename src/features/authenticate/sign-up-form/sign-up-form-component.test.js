import render from 'riteway/render-component';
import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import SignUpForm from './sign-up-form-component.js';

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

    const subtitle = $(':contains("Enter your information to get started")');

    assert({
      given: 'a SignUpForm component',
      should: 'render the subtitle "Enter your information to get started"',
      actual: subtitle.length,
      expected: 1,
    });
  });
});
