/* eslint-disable import/prefer-default-export */
export const exists = <T>(n: T): n is NonNullable<T> => n !== null && n !== undefined;
