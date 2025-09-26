import render from 'riteway/render-component';
import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import NotFound from './not-found-component';

describe('NotFound component', () => {
  test('basic elements', () => {
    const $ = render(<NotFound />);

    assert({
      given: 'the NotFound component is rendered',
      should: 'render the error status text',
      actual: $('p:contains("Error")').text(),
      expected: 'Error',
    });

    assert({
      given: 'the NotFound component is rendered',
      should: 'render the main error heading',
      actual: $('h1').text(),
      expected: 'Page not found',
    });

    assert({
      given: 'the NotFound component is rendered',
      should: 'render the error description',
      actual: $('p:contains("Sorry, we couldn\'t find the page")').text(),
      expected: "Sorry, we couldn't find the page you're looking for.",
    });

    assert({
      given: 'the NotFound component is rendered',
      should: 'render the back to home link',
      actual: $('a[href="/"]').text(),
      expected: '← Back to home',
    });
  });

  test('image element', () => {
    const $ = render(<NotFound />);

    assert({
      given: 'the NotFound component is rendered',
      should: 'render the not found illustration image',
      actual: $('img[alt="Error illustration"]').length,
      expected: 1,
    });

    assert({
      given: 'the NotFound component is rendered',
      should: 'use the correct not found image source',
      actual: $('img[alt="Error illustration"]').attr('src'),
      expected: '/images/not-found.png',
    });
  });

  test('layout structure', () => {
    const $ = render(<NotFound />);

    assert({
      given: 'the NotFound component is rendered',
      should: 'render within a main element',
      actual: $('main').length,
      expected: 1,
    });

    assert({
      given: 'the NotFound component is rendered',
      should: 'contain a content wrapper div within main',
      actual: $('main div').length > 0,
      expected: true,
    });
  });

  test('navigation link', () => {
    const $ = render(<NotFound />);

    const backLink = $('a[href="/"]');

    assert({
      given: 'the NotFound component is rendered',
      should: 'render a link back to home page',
      actual: backLink.attr('href'),
      expected: '/',
    });

    assert({
      given: 'the NotFound component is rendered',
      should: 'include arrow character in back link',
      actual: backLink.text().includes('←'),
      expected: true,
    });
  });
});
