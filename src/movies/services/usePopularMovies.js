import {useState, useEffect} from 'react';

import {getData, getMovieListUrl, getMoreMoviesUrl} from './api';

const usePopularMovies = () => {
  const [movieState, setState] = useState({
    isLoading: true,
    apiMoviesPage: 2,
    moviesArray: [],
  });

  const {apiMoviesPage, moviesArray, isLoading} = movieState;

  useEffect(() => {
    (async () => {
      const res = await getData(getMovieListUrl());
      setState({
        ...movieState,
        moviesArray: res.results,
        isLoading: false,
      });
    })();
  }, []);

  const loadMoreMovies = () => {
    (async () => {
      const res = await getData(getMoreMoviesUrl(apiMoviesPage));
      setState({
        ...movieState,
        apiMoviesPage: apiMoviesPage + 1,
        moviesArray: moviesArray.concat(res.results),
      });
    })();
  };

  return {moviesArray, isLoading, loadMoreMovies};
};

export default usePopularMovies;
