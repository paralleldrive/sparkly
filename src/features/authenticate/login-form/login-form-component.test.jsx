import render from 'riteway/render-component';
import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import { LoginForm } from './login-form-component';

const createProps = ({ emailError = '', isSigningIn = false } = {}) => ({
  emailError,
  isSigningIn,
});

describe('LoginForm component', () => {
  test('basic elements', () => {
    const props = createProps();

    const $ = render(<LoginForm {...props} />);

    assert({
      given: 'any props',
      should: 'render the title',
      actual: $('h1').text(),
      expected: 'Sign in to your account',
    });

    assert({
      given: 'any props',
      should: 'render the subtitle',
      actual: $('p').text(),
      expected: 'Enter your email to receive a secure sign-in link',
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

    assert({
      given: 'any props',
      should: 'render the sign up link',
      actual: $('a[href="/register"]').length,
      expected: 1,
    });
  });

  test('submit button text', () => {
    const propsDefault = createProps();
    const propsLoading = createProps({ isSigningIn: true });

    const $default = render(<LoginForm {...propsDefault} />);
    const $loading = render(<LoginForm {...propsLoading} />);

    assert({
      given: 'isSigningIn is false',
      should: 'show default button text',
      actual: $default('button[type="submit"]').text(),
      expected: 'Send sign-in link',
    });

    assert({
      given: 'isSigningIn is true',
      should: 'show loading button text',
      actual: $loading('button[type="submit"]').text().trim(),
      expected: 'Sending link...',
    });
  });

  test('email error display', () => {
    const propsWithError = createProps({
      emailError: 'Invalid email address',
    });
    const propsWithoutError = createProps();

    const $withError = render(<LoginForm {...propsWithError} />);
    const $withoutError = render(<LoginForm {...propsWithoutError} />);

    assert({
      given: 'emailError prop is provided',
      should: 'display the error message',
      actual: $withError('p:contains("Invalid email address")').length,
      expected: 1,
    });

    assert({
      given: 'no emailError prop',
      should: 'not display any error message',
      actual: $withoutError('[data-slot="form-message"]').length,
      expected: 0,
    });
  });

  test('form disabled state', () => {
    const propsDisabled = createProps({ isSigningIn: true });
    const propsEnabled = createProps({ isSigningIn: false });

    const $disabled = render(<LoginForm {...propsDisabled} />);
    const $enabled = render(<LoginForm {...propsEnabled} />);

    assert({
      given: 'isSigningIn is true',
      should: 'disable the fieldset',
      actual: $disabled('fieldset').prop('disabled'),
      expected: true,
    });

    assert({
      given: 'isSigningIn is false',
      should: 'enable the fieldset',
      actual: $enabled('fieldset').prop('disabled'),
      expected: false,
    });
  });

  test('sign up link', () => {
    const props = createProps();
    const $ = render(<LoginForm {...props} />);

    assert({
      given: 'the login form',
      should: 'contain a link to sign up',
      actual: $('a:contains("Sign up")').attr('href'),
      expected: '/register',
    });
  });
});
