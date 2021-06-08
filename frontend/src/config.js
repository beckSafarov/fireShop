export const ROOT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://yoursite.com';

export const PASSWORD_LENGTH = 6;
export const MAX_NAME_CHARS = 20;
