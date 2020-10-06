import Config from 'react-native-config';

const API_KEY = Config.API_KEY;
const MAIN_URL = 'https://api.themoviedb.org/3/';

export const getMoviesByPathUrl = (urlPath) => {
  return `${MAIN_URL}${urlPath}?api_key=${API_KEY}&language=en-US&page=1`;
};
export const getMoreMoviesUrl = (urlPath, apiMoviesPage) => {
  return `${MAIN_URL}${urlPath}?api_key=${API_KEY}&language=en-US&page=${apiMoviesPage}`;
};
export const getSingleMovieUrl = (movieId) => {
  return `${MAIN_URL}movie/${movieId}?api_key=${API_KEY}`;
};
export const getMovieCreditsUrl = (movieId) => {
  return `${MAIN_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
};
export const getSearchMoviesUrl = (name) => {
  return `${MAIN_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
};

export async function getData(url) {
  let res = await fetch(url);
  return res
    .json()
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}
