export const validateTitle = (title: string): string | null => {
  if (!title.trim()) {
    return 'Title is required';
  }
  return null;
};

export const validateContent = (content: string): string | null => {
  if (!content.trim()) {
    return 'Content is required';
  }
  return null;
};
