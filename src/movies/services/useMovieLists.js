import {useState, useEffect} from 'react';
import {
  POPULAR_MOVIES,
  FREE_MOVIES,
  POPULAR_URL_PATH,
  TOP_RATED_URL_PATH,
  TRENDING_DAY_URL_PATH,
} from '../../../constants.js';
import {getData, getMoreMoviesUrl, getMoviesByPathUrl} from './api';

const useMovieLists = () => {
  const [movieState, setState] = useState({
    isLoading: true,
    nextPopularPage: 2,
    nextFreePage: 2,
    nextTrendingPage: 2,
    popularMovies: [],
    freeMovies: [],
    trendingMovies: [],
  });

  const {
    isLoading,
    popularMovies,
    freeMovies,
    trendingMovies,
    nextPopularPage,
    nextFreePage,
    nextTrendingPage,
  } = movieState;

  useEffect(() => {
    (async () => {
      const popRes = await getData(getMoviesByPathUrl(POPULAR_URL_PATH));
      const freeRes = await getData(getMoviesByPathUrl(TOP_RATED_URL_PATH));
      const trendRes = await getData(getMoviesByPathUrl(TRENDING_DAY_URL_PATH));
      setState({
        ...movieState,
        popularMovies: popRes.results,
        freeMovies: freeRes.results,
        trendingMovies: trendRes.results,
        isLoading: false,
      });
    })();
  }, []);

  const loadOnTabChange = (urlPath, moviesType) => {
    (async () => {
      const res = await getData(getMoviesByPathUrl(urlPath));
      if (moviesType === POPULAR_MOVIES) {
        setState({
          ...movieState,
          nextPopularPage: 2,
          popularMovies: res.results,
          isLoading: false,
        });
      } else if (moviesType === FREE_MOVIES) {
        setState({
          ...movieState,
          nextFreePage: 2,
          freeMovies: res.results,
          isLoading: false,
        });
      } else {
        setState({
          ...movieState,
          nextTrendingPage: 2,
          trendingMovies: res.results,
          isLoading: false,
        });
      }
    })();
  };

  const loadMoreOnScroll = (urlPath, moviesType) => {
    if (moviesType === POPULAR_MOVIES) {
      (async () => {
        const res = await getData(getMoreMoviesUrl(urlPath, nextPopularPage));
        setState({
          ...movieState,
          nextPopularPage: nextPopularPage + 1,
          popularMovies: popularMovies.concat(res.results),
        });
      })();
    } else if (moviesType === FREE_MOVIES) {
      (async () => {
        const res = await getData(getMoreMoviesUrl(urlPath, nextFreePage));
        setState({
          ...movieState,
          nextFreePage: nextFreePage + 1,
          freeMovies: freeMovies.concat(res.results),
        });
      })();
    } else {
      (async () => {
        const res = await getData(getMoreMoviesUrl(urlPath, nextTrendingPage));
        setState({
          ...movieState,
          nextTrendingPage: nextTrendingPage + 1,
          trendingMovies: trendingMovies.concat(res.results),
        });
      })();
    }
  };

  return {
    popularMovies,
    freeMovies,
    trendingMovies,
    isLoading,
    loadOnTabChange,
    loadMoreOnScroll,
  };
};

export default useMovieLists;
