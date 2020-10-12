import {useState, useEffect} from 'react';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';
import {MOVIES} from '../../../constants';

const useTrendMovies = () => {
  const [trendMoviesState, setState] = useState({
    isLoading: true,
    nextTrendPage: 2,
    trendMovies: [],
  });
  const {TRENDING_MOVIES} = MOVIES;
  const {
    isLoading,
    trendMovies,
    nextTrendPage,
    urlTrendPath,
  } = trendMoviesState;

  const getInitialData = () => {
    getInitialMoviesData().then(() => {
      const {trendMoviesData} = initMovies;
      setState({
        ...trendMoviesState,
        trendMovies: trendMoviesData,
        isLoading: false,
        urlTrendPath: TRENDING_MOVIES.tabs[0].url,
      });
    });
  };
  useEffect(() => {
    getInitialData();
  }, []);

  const getDataOnChangeType = (tabTitle) => {
    TRENDING_MOVIES.tabs.map((item) => {
      if (item.title === tabTitle)
        return getData(urlPathConstructor('movies', [item.url, 1])).then(
          (res) => {
            setState({
              ...trendMoviesState,
              nextTrendPage: 2,
              trendMovies: res.results,
              isLoading: false,
              urlTrendPath: item.url,
            });
          },
        );
    });
  };
  const loadTrendOnTabChange = (tabTitle) => {
    getDataOnChangeType(tabTitle);
  };

  const loadTrendOnScroll = () => {
    return getData(
      urlPathConstructor('movies', [urlTrendPath, nextTrendPage]),
    ).then((res) => {
      setState({
        ...trendMoviesState,
        nextTrendPage: nextTrendPage + 1,
        trendMovies: trendMovies.concat(res.results),
      });
    });
  };

  return {
    trendMovies,
    isLoading,
    loadTrendOnTabChange,
    loadTrendOnScroll,
  };
};

export default useTrendMovies;
