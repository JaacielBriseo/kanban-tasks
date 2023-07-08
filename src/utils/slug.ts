export const convertToSlug = (str: string) => encodeURIComponent(str.replace(' ', '_'));
export const convertFromSlug = (str: string) => decodeURIComponent(str.replace('_', ' '));
