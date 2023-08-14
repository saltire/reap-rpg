export const classList = (...classes: (string | boolean | null | undefined)[]) => classes
  .filter(Boolean).join(' ');

export const exists = <T>(n: T): n is NonNullable<T> => n !== null && n !== undefined;

export const signedNum = (number: number) => `${number > 0 ? '+' : ''}${number}`;
