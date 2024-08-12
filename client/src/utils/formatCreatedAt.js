import { format, parseISO } from 'date-fns';

export const formatCreatedAt = (createdAt) => {
  if (!createdAt) return '';
  const createdAtDate = parseISO(createdAt);
  return format(createdAtDate, 'yyyy.MM.dd');
};
