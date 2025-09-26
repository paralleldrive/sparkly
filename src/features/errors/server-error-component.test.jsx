import render from 'riteway/render-component';
import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import ServerError from './server-error-component';

describe('ServerError component', () => {
  test('basic elements', () => {
    const $ = render(<ServerError />);

    assert({
      given: 'the ServerError component is rendered',
      should: 'render the error status text',
      actual: $('p:contains("Error")').text(),
      expected: 'Error',
    });

    assert({
      given: 'the ServerError component is rendered',
      should: 'render the main error heading',
      actual: $('h1').text(),
      expected: 'Something went wrong',
    });

    assert({
      given: 'the ServerError component is rendered',
      should: 'render the error description',
      actual: $(
        'p:contains("Sorry, we encountered an unexpected error")',
      ).text(),
      expected: 'Sorry, we encountered an unexpected error. Please try again.',
    });

    assert({
      given: 'the ServerError component is rendered',
      should: 'render the back to home link',
      actual: $('a[href="/"]').text(),
      expected: '← Back to home',
    });
  });

  test('image element', () => {
    const $ = render(<ServerError />);

    assert({
      given: 'the ServerError component is rendered',
      should: 'render the error illustration image',
      actual: $('img[alt="Error illustration"]').length,
      expected: 1,
    });

    assert({
      given: 'the ServerError component is rendered',
      should: 'use the correct error image source',
      actual: $('img[alt="Error illustration"]').attr('src'),
      expected: '/images/error.png',
    });
  });

  test('layout structure', () => {
    const $ = render(<ServerError />);

    assert({
      given: 'the ServerError component is rendered',
      should: 'render within a main element',
      actual: $('main').length,
      expected: 1,
    });

    assert({
      given: 'the ServerError component is rendered',
      should: 'contain a content wrapper div within main',
      actual: $('main div').length > 0,
      expected: true,
    });
  });

  test('navigation link', () => {
    const $ = render(<ServerError />);

    const backLink = $('a[href="/"]');

    assert({
      given: 'the ServerError component is rendered',
      should: 'render a link back to home page',
      actual: backLink.attr('href'),
      expected: '/',
    });

    assert({
      given: 'the ServerError component is rendered',
      should: 'include arrow character in back link',
      actual: backLink.text().includes('←'),
      expected: true,
    });
  });
});
