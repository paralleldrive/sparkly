import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({
    className: 'mocked-geist-sans',
  }),
  Geist_Mono: () => ({
    className: 'mocked-geist-mono',
  }),
}));

vi.mock('next/image', () => ({
  default: ({ priority: _priority, fill: _fill, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="Next.js image mock" {...props} />
  ),
}));
