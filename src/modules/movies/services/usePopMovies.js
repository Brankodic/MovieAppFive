import {useState, useEffect} from 'react';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';
import {MOVIES, MOVIES_STRING} from '../../../constants';

const usePopMovies = () => {
  const [popMoviesState, setState] = useState({
    isLoading: true,
    nextPage: 2,
    movies: [],
  });

  const {POPULAR_MOVIES} = MOVIES;
  const {isLoading, movies, nextPage, urlPath} = popMoviesState;

  const getInitialData = () =>
    getInitialMoviesData().then((props) => {
      const {popMovies} = props;
      setState({
        ...popMoviesState,
        movies: popMovies,
        isLoading: false,
        urlPath: POPULAR_MOVIES.tabs[0].url,
      });
    });
  useEffect(() => {
    getInitialData();
  }, []);

  const getDataOnChangeType = (tabTitle) =>
    POPULAR_MOVIES.tabs.map((item) => {
      if (item.title === tabTitle)
        return getData(urlPathConstructor(MOVIES_STRING, [item.url, 1])).then(
          (res) => {
            setState({
              ...popMoviesState,
              nextPage: 2,
              movies: res.results,
              isLoading: false,
              urlPath: item.url,
            });
          },
        );
    });
  const loadPopOnTabChange = (tabTitle) => getDataOnChangeType(tabTitle);

  const loadPopOnScroll = () => {
    return getData(urlPathConstructor(MOVIES_STRING, [urlPath, nextPage])).then(
      (res) => {
        setState({
          ...popMoviesState,
          nextPage: nextPage + 1,
          movies: movies.concat(res.results),
        });
      },
    );
  };

  return {
    movies,
    isLoading,
    loadPopOnTabChange,
    loadPopOnScroll,
  };
};

export default usePopMovies;
