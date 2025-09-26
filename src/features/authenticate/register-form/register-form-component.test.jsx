import render from 'riteway/render-component';
import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import { RegisterForm } from './register-form-component';

const createProps = ({
  emailError = '',
  nameError = '',
  isSigningUp = false,
} = {}) => ({ emailError, nameError, isSigningUp });

describe('RegisterForm component', () => {
  test('basic elements', () => {
    const props = createProps();

    const $ = render(<RegisterForm {...props} />);

    assert({
      given: 'any props',
      should: 'render the title',
      actual: $('h1').text(),
      expected: 'Create an account',
    });

    assert({
      given: 'any props',
      should: 'render the subtitle',
      actual: $('p').text(),
      expected: 'Enter your information to get started',
    });

    assert({
      given: 'any props',
      should: 'render the name input field',
      actual: $('input[name="name"]').length,
      expected: 1,
    });

    assert({
      given: 'any props',
      should: 'render the email input field',
      actual: $('input[name="email"]').length,
      expected: 1,
    });

    assert({
      given: 'any props',
      should: 'render the submit button',
      actual: $('button[type="submit"]').length,
      expected: 1,
    });
  });

  test('error messages', () => {
    const props = createProps({
      nameError: 'Name is required',
      emailError: 'Invalid email address',
    });

    const $ = render(<RegisterForm {...props} />);

    assert({
      given: 'name error prop',
      should: 'render the name error message',
      actual: $('[data-slot="form-message"]').eq(0).text(),
      expected: 'Name is required',
    });

    assert({
      given: 'email error prop',
      should: 'render the email error message',
      actual: $('[data-slot="form-message"]').eq(1).text(),
      expected: 'Invalid email address',
    });
  });

  test('isSigningUp prop when false', () => {
    const props = createProps({ isSigningUp: false });
    const $ = render(<RegisterForm {...props} />);

    assert({
      given: 'isSigningUp is false',
      should: 'render "Sign up" button text',
      actual: $('button[type="submit"]').text(),
      expected: 'Sign up',
    });

    assert({
      given: 'isSigningUp is false',
      should: 'not disable the form fieldset',
      actual: $('fieldset').prop('disabled'),
      expected: false,
    });
  });

  test('isSigningUp prop when true', () => {
    const props = createProps({ isSigningUp: true });
    const $ = render(<RegisterForm {...props} />);

    assert({
      given: 'isSigningUp is true',
      should: 'render "Signing up ..." button text',
      actual: $('button[type="submit"]').text().includes('Signing up ...'),
      expected: true,
    });

    assert({
      given: 'isSigningUp is true',
      should: 'disable the form fieldset',
      actual: $('fieldset').prop('disabled'),
      expected: true,
    });
  });
});
