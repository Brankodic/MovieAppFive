import {useState, useEffect} from 'react';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';

const useTrendMovies = () => {
  const [trendMoviesState, setState] = useState({
    isLoading: true,
    nextTrendPage: 2,
    trendMovies: [],
  });

  const {isLoading, trendMovies, nextTrendPage} = trendMoviesState;

  const getInitialData = () => {
    getInitialMoviesData().then(() => {
      const {trendMoviesData} = initMovies;
      setState({
        ...trendMoviesState,
        trendMovies: trendMoviesData,
        isLoading: false,
      });
    });
  };
  useEffect(() => {
    getInitialData();
  }, []);

  function getDataOnChangeType(urlPath) {
    return getData(urlPathConstructor('movies', [urlPath, 1])).then((res) => {
      setState({
        ...trendMoviesState,
        nextTrendPage: 2,
        trendMovies: res.results,
        isLoading: false,
      });
    });
  }
  const loadTrendOnTabChange = (urlPath, moviesType) => {
    getDataOnChangeType(urlPath, moviesType);
  };

  function getMoreTrend(urlPath) {
    return getData(urlPathConstructor('movies', [urlPath, nextTrendPage])).then(
      (res) => {
        setState({
          ...trendMoviesState,
          nextTrendPage: nextTrendPage + 1,
          trendMovies: trendMovies.concat(res.results),
        });
      },
    );
  }
  const loadTrendOnScroll = (urlPath) => {
    getMoreTrend(urlPath);
  };

  return {
    trendMovies,
    isLoading,
    loadTrendOnTabChange,
    loadTrendOnScroll,
  };
};

export default useTrendMovies;
