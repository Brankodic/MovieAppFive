import {useState, useEffect} from 'react';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';
import {MOVIES, MOVIES_STRING} from '../../../constants';

const useFreeMovies = () => {
  const [freeMoviesState, setState] = useState({
    isLoading: true,
    nextPage: 2,
    movies: [],
  });

  const {FREE_MOVIES} = MOVIES;
  const {isLoading, movies, nextPage, urlPath} = freeMoviesState;

  const getInitialData = () =>
    getInitialMoviesData().then((props) => {
      const {freeMovies} = props;
      setState({
        ...freeMoviesState,
        movies: freeMovies,
        isLoading: false,
        urlPath: FREE_MOVIES.tabs[0].url,
      });
    });
  useEffect(() => {
    getInitialData();
  }, []);

  const getDataOnChangeType = (tabTitle) =>
    FREE_MOVIES.tabs.map((item) => {
      if (item.title === tabTitle)
        return getData(urlPathConstructor(MOVIES_STRING, [item.url, 1])).then(
          (res) => {
            setState({
              ...freeMoviesState,
              nextPage: 2,
              movies: res.results,
              isLoading: false,
              urlPath: item.url,
            });
          },
        );
    });
  const loadFreeOnTabChange = (tabTitle) => getDataOnChangeType(tabTitle);

  const loadFreeOnScroll = () => {
    return getData(urlPathConstructor(MOVIES_STRING, [urlPath, nextPage])).then(
      (res) => {
        setState({
          ...freeMoviesState,
          nextPage: nextPage + 1,
          movies: movies.concat(res.results),
        });
      },
    );
  };

  return {
    movies,
    isLoading,
    loadFreeOnTabChange,
    loadFreeOnScroll,
  };
};

export default useFreeMovies;
