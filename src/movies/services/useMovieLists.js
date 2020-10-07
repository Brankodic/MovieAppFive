import {useState, useEffect} from 'react';
import {POPULAR_MOVIES, FREE_MOVIES} from '../../../constants.js';
import {
  getData,
  getMoreMoviesUrl,
  getMoviesByPathUrl,
  getInitialMoviesData,
  initMoviesArray,
} from './api';

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
    getInitialData();
  }, []);

  const loadOnTabChange = (urlPath, moviesType) => {
    (async function loadingData() {
      const res = await getData(getMoviesByPathUrl(urlPath));
      resolveStateData(res, moviesType);
    })();
  };

  const getInitialData = () => {
    getInitialMoviesData().then(() => {
      const {popMoviesData, freeMoviesData, trendMoviesData} = initMoviesArray;
      setState({
        ...movieState,
        popularMovies: popMoviesData,
        freeMovies: freeMoviesData,
        trendingMovies: trendMoviesData,
        isLoading: false,
      });
    });
  };

  const resolveStateData = (res, moviesType) => {
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
  };

  const loadMoreOnScroll = (urlPath, moviesType) => {
    if (moviesType === POPULAR_MOVIES) {
      (async function getMorePopular() {
        const res = await getData(getMoreMoviesUrl(urlPath, nextPopularPage));
        setState({
          ...movieState,
          nextPopularPage: nextPopularPage + 1,
          popularMovies: popularMovies.concat(res.results),
        });
      })();
    } else if (moviesType === FREE_MOVIES) {
      (async function getMoreFree() {
        const res = await getData(getMoreMoviesUrl(urlPath, nextFreePage));
        setState({
          ...movieState,
          nextFreePage: nextFreePage + 1,
          freeMovies: freeMovies.concat(res.results),
        });
      })();
    } else {
      (async function getMoreTrending() {
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
