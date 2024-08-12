export const formatRating = (rating_score) => {
  if (rating_score === 0 || rating_score === null) return '';
  let rating_star = '';
  for (let i = 0; i < rating_score; i++) {
    rating_star += '★';
  }
  return rating_star;
};
