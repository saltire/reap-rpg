export const classList = (...classes: (string | boolean | null | undefined)[]) => classes
  .filter(Boolean).join(' ');

export const exists = <T>(n: T): n is NonNullable<T> => n !== null && n !== undefined;
