import {useState, useEffect} from 'react';

import {
  getData,
  getPopularMoviesUrl,
  getFreeMoviesUrl,
  getTrendingTodayUrl,
  getMoreMoviesUrl,
  getMoviesByPathUrl,
} from './api';

const usePopularMovies = () => {
  const [movieState, setState] = useState({
    isLoading: true,
    popularMoviesPage: 2,
    freeMoviesPage: 2,
    trendingMoviesPage: 2,
    popularMovies: [],
    freeMovies: [],
    trendingMovies: [],
  });

  const {
    popularMovies,
    freeMovies,
    trendingMovies,
    isLoading,
    popularMoviesPage,
  } = movieState;
  //Getting movie lists on startup

  useEffect(() => {
    setState({...movieState, isLoading: true});
    (async () => {
      const popRes = await getData(getPopularMoviesUrl());
      const freeRes = await getData(getFreeMoviesUrl());
      const trendRes = await getData(getTrendingTodayUrl());
      setState({
        ...movieState,
        popularMovies: popRes.results,
        freeMovies: freeRes.results,
        trendingMovies: trendRes.results,
        isLoading: false,
      });
    })();
  }, []);

  //Getting movie lists on tab change

  const loadMovies = (urlPath, moviesType) => {
    setState({...movieState, isLoading: true});
    (async () => {
      const res = await getData(getMoviesByPathUrl(urlPath));
      if (moviesType === 'popular') {
        setState({
          ...movieState,
          popularMoviesPage: 2,
          popularMovies: res.results,
          isLoading: false,
        });
      } else if (moviesType === 'free') {
        setState({
          ...movieState,
          freeMoviesPage: 2,
          freeMovies: res.results,
          isLoading: false,
        });
      } else {
        setState({
          ...movieState,
          trendingMoviesPage: 2,
          trendingMovies: res.results,
          isLoading: false,
        });
      }
    })();
  };

  //Getting movie lists on scroll end

  const loadMoreMovies = () => {
    (async () => {
      const res = await getData(getMoreMoviesUrl(popularMoviesPage));
      setState({
        ...movieState,
        popularMoviesPage: popularMoviesPage + 1,
        popularMovies: popularMovies.concat(res.results),
      });
    })();
  };

  return {
    popularMovies,
    freeMovies,
    trendingMovies,
    isLoading,
    loadMoreMovies,
    loadMovies,
  };
};

export default usePopularMovies;
