import render from 'riteway/render-component';
import { assert } from 'riteway/vitest';
import { describe, test } from 'vitest';

import { LandingPage } from './landing-page.jsx';

describe('LandingPage component', () => {
  test('renders Sparkly logo and brand name', () => {
    const $ = render(<LandingPage />);

    const sparklyText = $('span:contains("Sparkly")');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'display the Sparkly brand name',
      actual: sparklyText.length > 0,
      expected: true,
    });
  });

  test('renders main headline', () => {
    const $ = render(<LandingPage />);

    const headline = $('h1:contains("Ignite Learning, Inspire Creation")');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'display the main headline with the company motto',
      actual: headline.length,
      expected: 1,
    });
  });

  test('renders AI mentorship description', () => {
    const $ = render(<LandingPage />);

    const description = $('p:contains("AI-powered mentorship")');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'describe the AI-powered learning experience',
      actual: description.length,
      expected: 1,
    });
  });

  test('renders start learning button', () => {
    const $ = render(<LandingPage />);

    const startLearningButton = $('a:contains("Start Learning Free")');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'display a start learning button that links to registration',
      actual: startLearningButton.attr('href'),
      expected: '/register',
    });
  });

  test('renders navigation menu items', () => {
    const $ = render(<LandingPage />);

    const featuresLink = $('a:contains("Features")');
    const coursesLink = $('a:contains("Courses")');
    const aiMentorLink = $('a:contains("AI Mentor")');
    const aboutLink = $('a:contains("About")');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'display all navigation menu items',
      actual:
        featuresLink.length +
        coursesLink.length +
        aiMentorLink.length +
        aboutLink.length,
      expected: 4, // 4 navigation items (mobile menu may not be visible in test)
    });
  });

  test('renders image gallery', () => {
    const $ = render(<LandingPage />);

    const sparklyImage = $('img[alt="Sparkly app interface"]');
    const bookImage = $('img[alt="Book cover"]');
    const ericImage = $('img[alt="Eric profile"]');
    const janImage = $('img[alt="Jan profile"]');
    const sparkly2Image = $('img[alt="Sparkly app interface 2"]');

    assert({
      given: 'the LandingPage component is rendered',
      should: 'display all five images in the gallery',
      actual:
        sparklyImage.length +
        bookImage.length +
        ericImage.length +
        janImage.length +
        sparkly2Image.length,
      expected: 5,
    });
  });
});
