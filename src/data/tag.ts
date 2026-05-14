export const Tag = {
  A11y: '@a11y',
  Api: '@API',
  Functional: '@functional',
  Regression: '@regression',
  Visual: '@visual'
} as const;

export type Tag = (typeof Tag)[keyof typeof Tag];
