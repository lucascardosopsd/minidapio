export const isEmpty = (value: string | null | undefined) => {
  return value == null || value.trim() === "";
};
