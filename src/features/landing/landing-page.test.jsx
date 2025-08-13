import render from 'riteway/render-component';
import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import { LandingPage } from './landing-page.jsx';

describe('LandingPage component', () => {
  test('renders Next.js logo', () => {
    const $ = render(<LandingPage />);

    const nextLogo = $('img[alt="Next.js logo"]');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'display the Next.js logo',
      actual: nextLogo.length,
      expected: 1,
    });
  });

  test('renders "Get started" text', () => {
    const $ = render(<LandingPage />);

    const getStartedText = $('li:contains("Get started by editing")');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'display the get started instructions',
      actual: getStartedText.length,
      expected: 1,
    });
  });

  test('renders deployment button', () => {
    const $ = render(<LandingPage />);

    const deployButton = $('a:contains("Deploy now")');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'display a deploy now button that links to Vercel',
      actual: deployButton.attr('href').includes('vercel.com'),
      expected: true,
    });
  });

  test('renders footer links', () => {
    const $ = render(<LandingPage />);

    const learnLink = $('a:contains("Learn")');
    const examplesLink = $('a:contains("Examples")');
    const nextjsLink = $('a:contains("Go to nextjs.org →")');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'display all three footer navigation links',
      actual: learnLink.length + examplesLink.length + nextjsLink.length,
      expected: 3,
    });
  });
});
