export const validateField = (fieldName: string, value: string): string | null => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};
