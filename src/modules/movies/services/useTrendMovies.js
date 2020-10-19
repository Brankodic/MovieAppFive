import {useState, useEffect} from 'react';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';
import {MOVIES, MOVIES_STRING} from '../../../constants';

const useTrendMovies = () => {
  const [trendMoviesState, setState] = useState({
    isLoading: true,
    nextPage: 2,
    movies: [],
  });
  const {TRENDING_MOVIES} = MOVIES;
  const {isLoading, movies, nextPage, urlPath} = trendMoviesState;

  const getInitialData = () =>
    getInitialMoviesData().then((props) => {
      const {trendMovies} = props;
      setState({
        ...trendMoviesState,
        movies: trendMovies,
        isLoading: false,
        urlPath: TRENDING_MOVIES.tabs[0].url,
      });
    });
  useEffect(() => {
    getInitialData();
  }, []);

  const getDataOnChangeType = (tabTitle) =>
    TRENDING_MOVIES.tabs.map((item) => {
      if (item.title === tabTitle)
        return getData(urlPathConstructor(MOVIES_STRING, [item.url, 1])).then(
          (res) => {
            setState({
              ...trendMoviesState,
              nextPage: 2,
              movies: res.results,
              isLoading: false,
              urlPath: item.url,
            });
          },
        );
    });
  const loadTrendOnTabChange = (tabTitle) => getDataOnChangeType(tabTitle);

  const loadTrendOnScroll = () => {
    return getData(urlPathConstructor(MOVIES_STRING, [urlPath, nextPage])).then(
      (res) => {
        setState({
          ...trendMoviesState,
          nextPage: nextPage + 1,
          movies: movies.concat(res.results),
        });
      },
    );
  };

  return {
    movies,
    isLoading,
    loadTrendOnTabChange,
    loadTrendOnScroll,
  };
};

export default useTrendMovies;
