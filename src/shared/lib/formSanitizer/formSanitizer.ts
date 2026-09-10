export const sanitizeString = (value: string) => value.trim().replace(/\s+/g, ' ');

export const sanitizeEmail = (value: string) => value.trim().toLowerCase();