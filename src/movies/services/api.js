const API_KEY = '949998e8e5e4f813a43d4d37edfdb2c9'

export const getPopularMoviesUrl = () => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
};

export const getFreeMoviesUrl = () => {
  return `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
};

export const getTrendingTodayUrl = () => {
  return `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`;
};

export const getMoviesByPathUrl = (urlPath) => {
  return `https://api.themoviedb.org/3/${urlPath}?api_key=${API_KEY}&language=en-US&page=1`
}

export const getMoreMoviesUrl = (apiMoviesPage) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${apiMoviesPage}`;
};

export const getSingleMovieUrl = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
};

export const getMovieCreditsUrl = (movieId) => {
  return `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
};

export const getSearchMoviesUrl = (name) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
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

export async function postData(url, item) {
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(item),
  });
  return res
    .json()
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}
