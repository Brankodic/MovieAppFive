import {useState, useEffect} from 'react';
import {POPULAR_MOVIES, FREE_MOVIES} from '../../../constants.js';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';

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
    getDataOnChangeType(urlPath, moviesType);
  };

  const loadMoreOnScroll = (urlPath, moviesType) => {
    resolveMoviesOnScroll(urlPath, moviesType);
  };

  const getInitialData = () => {
    getInitialMoviesData().then(() => {
      const {popMoviesData, freeMoviesData, trendMoviesData} = initMovies;
      setState({
        ...movieState,
        popularMovies: popMoviesData,
        freeMovies: freeMoviesData,
        trendingMovies: trendMoviesData,
        isLoading: false,
      });
    });
  };

  async function getDataOnChangeType(urlPath, moviesType) {
    const res = await getData(urlPathConstructor('movies', [urlPath, 1]));
    resolveTypeOnChange(res, moviesType);
  }

  const resolveTypeOnChange = (res, moviesType) => {
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

  const resolveMoviesOnScroll = (urlPath, moviesType) => {
    if (moviesType === POPULAR_MOVIES) {
      return getMorePopular(urlPath);
    } else if (moviesType === FREE_MOVIES) {
      return getMoreFree(urlPath);
    } else {
      return getMoreTrending(urlPath);
    }

    async function getMorePopular(urlPath) {
      const res = await getData(
        urlPathConstructor('movies', [urlPath, nextPopularPage]),
      );
      setState({
        ...movieState,
        nextPopularPage: nextPopularPage + 1,
        popularMovies: popularMovies.concat(res.results),
      });
    }

    async function getMoreFree(urlPath) {
      const res = await getData(
        urlPathConstructor('movies', [urlPath, nextFreePage]),
      );
      setState({
        ...movieState,
        nextFreePage: nextFreePage + 1,
        freeMovies: freeMovies.concat(res.results),
      });
    }

    async function getMoreTrending(urlPath) {
      const res = await getData(
        urlPathConstructor('movies', [urlPath, nextTrendingPage]),
      );
      setState({
        ...movieState,
        nextTrendingPage: nextTrendingPage + 1,
        trendingMovies: trendingMovies.concat(res.results),
      });
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
