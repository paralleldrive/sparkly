import render from 'riteway/render-component';
import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import { RegistrationVerificationAwaiting } from './registration-verification-awaiting-component';

const createProps = ({
  email = 'test@example.com',
  secondsLeft = 60,
  isResending = false,
  isSubmitting = false,
  onResendClick = () => {},
} = {}) => ({
  email,
  secondsLeft,
  isResending,
  isSubmitting,
  onResendClick,
});

describe('RegistrationVerificationAwaiting component', () => {
  test('basic elements', () => {
    const props = createProps();
    const $ = render(<RegistrationVerificationAwaiting {...props} />);

    assert({
      given: 'default props',
      should: 'render the card title',
      actual: $('.text-xl').text(),
      expected: 'Check your email',
    });

    assert({
      given: 'default props',
      should: 'render the card description',
      actual: $('[data-slot="card-description"]').text(),
      expected:
        "We've sent a secure registration link to your email address. Please check your inbox and click the link to access your account.",
    });

    assert({
      given: 'default props with 60 seconds left',
      should: 'render the countdown message with seconds remaining',
      actual: $('.text-muted-foreground.text-xs').text(),
      expected: 'You can request a new registration link in 60 seconds.',
    });

    assert({
      given: 'default props',
      should: 'render the hidden email input with correct value',
      actual: $('input[name="email"]').val(),
      expected: 'test@example.com',
    });

    assert({
      given: 'default props',
      should: 'render the submit button with correct text',
      actual: $('button[type="submit"]').text(),
      expected: 'Request new registration link',
    });

    assert({
      given: 'default props',
      should: 'render the alert description',
      actual: $('[data-slot="alert-description"]').text(),
      expected: 'Remember to check your spam folder.',
    });
  });

  test('button states when countdown is active', () => {
    const props = createProps({ secondsLeft: 30 });
    const $ = render(<RegistrationVerificationAwaiting {...props} />);

    assert({
      given: 'countdown is active (secondsLeft > 0)',
      should: 'disable the fieldset',
      actual: $('fieldset').prop('disabled'),
      expected: true,
    });

    assert({
      given: 'countdown is active (secondsLeft > 0)',
      should: 'make button appear disabled via fieldset',
      actual: $('fieldset[disabled] button[type="submit"]').length,
      expected: 1,
    });
  });

  test('button states when countdown reaches zero', () => {
    const props = createProps({ secondsLeft: 0 });
    const $ = render(<RegistrationVerificationAwaiting {...props} />);

    assert({
      given: 'countdown reaches zero',
      should: 'enable the submit button',
      actual: $('button[type="submit"]').prop('disabled'),
      expected: false,
    });

    assert({
      given: 'countdown reaches zero',
      should: 'enable the fieldset',
      actual: $('fieldset').prop('disabled'),
      expected: false,
    });
  });

  test('loading state when resending', () => {
    const props = createProps({
      isResending: true,
      secondsLeft: 0,
    });
    const $ = render(<RegistrationVerificationAwaiting {...props} />);

    assert({
      given: 'isResending is true',
      should: 'show loading text on button',
      actual: $('button[type="submit"]').text(),
      expected: 'Sending...',
    });

    assert({
      given: 'isResending is true',
      should: 'disable the fieldset',
      actual: $('fieldset').prop('disabled'),
      expected: true,
    });

    assert({
      given: 'isResending is true',
      should: 'render loading icon',
      actual: $('svg.animate-spin').length,
      expected: 1,
    });
  });

  test('disabled state when submitting', () => {
    const props = createProps({
      isSubmitting: true,
      secondsLeft: 0,
    });
    const $ = render(<RegistrationVerificationAwaiting {...props} />);

    assert({
      given: 'isSubmitting is true',
      should: 'disable the fieldset even when countdown is zero',
      actual: $('fieldset').prop('disabled'),
      expected: true,
    });
  });

  test('countdown message with different secondsLeft values', () => {
    const propsWithCountdown = createProps({ secondsLeft: 30 });
    const $withCountdown = render(
      <RegistrationVerificationAwaiting {...propsWithCountdown} />,
    );

    assert({
      given: '30 seconds left',
      should: 'show countdown message with 30 seconds',
      actual: $withCountdown('.text-muted-foreground.text-xs').text(),
      expected: 'You can request a new registration link in 30 seconds.',
    });

    const propsAtZero = createProps({ secondsLeft: 0 });
    const $atZero = render(
      <RegistrationVerificationAwaiting {...propsAtZero} />,
    );

    assert({
      given: '0 seconds left',
      should: 'show message that new link can be requested',
      actual: $atZero('.text-muted-foreground.text-xs').text(),
      expected: 'You can now request a new registration link.',
    });

    const propsWithOne = createProps({ secondsLeft: 1 });
    const $withOne = render(
      <RegistrationVerificationAwaiting {...propsWithOne} />,
    );

    assert({
      given: '1 second left',
      should: 'show countdown message with 1 second',
      actual: $withOne('.text-muted-foreground.text-xs').text(),
      expected: 'You can request a new registration link in 1 seconds.',
    });
  });
});
