export const formatPosterPath = (poster_path, size = 400) => {
  if (!poster_path) return '';
  return `https://image.tmdb.org/t/p/w${size}${poster_path}`;
};
