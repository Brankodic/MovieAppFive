import {useState, useEffect} from 'react';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';
import {MOVIES} from '../../../constants';

const useFreeMovies = () => {
  const [freeMoviesState, setState] = useState({
    isLoading: true,
    nextFreePage: 2,
    freeMovies: [],
  });

  const {FREE_MOVIES} = MOVIES;
  const {isLoading, freeMovies, nextFreePage, urlFreePath} = freeMoviesState;

  const getInitialData = () => {
    getInitialMoviesData().then(() => {
      const {freeMoviesData} = initMovies;
      setState({
        ...freeMoviesState,
        freeMovies: freeMoviesData,
        isLoading: false,
        urlFreePath: FREE_MOVIES.tabs[0].url,
      });
    });
  };
  useEffect(() => {
    getInitialData();
  }, []);

  const getDataOnChangeType = (tabTitle) => {
    FREE_MOVIES.tabs.map((item) => {
      if (item.title === tabTitle)
        return getData(urlPathConstructor('movies', [item.url, 1])).then(
          (res) => {
            setState({
              ...freeMoviesState,
              nextFreePage: 2,
              freeMovies: res.results,
              isLoading: false,
              urlFreePath: item.url,
            });
          },
        );
    });
  };
  const loadFreeOnTabChange = (tabTitle) => {
    getDataOnChangeType(tabTitle);
  };

  const loadFreeOnScroll = () => {
    return getData(
      urlPathConstructor('movies', [urlFreePath, nextFreePage]),
    ).then((res) => {
      setState({
        ...freeMoviesState,
        nextFreePage: nextFreePage + 1,
        freeMovies: freeMovies.concat(res.results),
      });
    });
  };

  return {
    freeMovies,
    isLoading,
    loadFreeOnTabChange,
    loadFreeOnScroll,
  };
};

export default useFreeMovies;
