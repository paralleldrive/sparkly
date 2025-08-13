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
  // eslint-disable-next-line @next/next/no-img-element
  default: props => <img alt="Next.js image mock" {...props} />,
}));
