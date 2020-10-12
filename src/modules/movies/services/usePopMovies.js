import {useState, useEffect} from 'react';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';
import {MOVIES} from '../../../constants';

const usePopMovies = () => {
  const [popMoviesState, setState] = useState({
    isLoading: true,
    nextPopPage: 2,
    popMovies: [],
  });

  const {POPULAR_MOVIES} = MOVIES;
  const {isLoading, popMovies, nextPopPage, urlPopPath} = popMoviesState;

  const getInitialData = () => {
    getInitialMoviesData().then(() => {
      const {popMoviesData} = initMovies;
      setState({
        ...popMoviesState,
        popMovies: popMoviesData,
        isLoading: false,
        urlPopPath: POPULAR_MOVIES.tabs[0].url,
      });
    });
  };
  useEffect(() => {
    getInitialData();
  }, []);

  const getDataOnChangeType = (tabTitle) => {
    POPULAR_MOVIES.tabs.map((item) => {
      if (item.title === tabTitle)
        return getData(urlPathConstructor('movies', [item.url, 1])).then(
          (res) => {
            setState({
              ...popMoviesState,
              nextPopPage: 2,
              popMovies: res.results,
              isLoading: false,
              urlPopPath: item.url,
            });
          },
        );
    });
  };
  const loadPopOnTabChange = (tabTitle) => {
    getDataOnChangeType(tabTitle);
  };

  const loadPopOnScroll = () => {
    return getData(
      urlPathConstructor('movies', [urlPopPath, nextPopPage]),
    ).then((res) => {
      setState({
        ...popMoviesState,
        nextPopPage: nextPopPage + 1,
        popMovies: popMovies.concat(res.results),
      });
    });
  };

  return {
    popMovies,
    isLoading,
    loadPopOnTabChange,
    loadPopOnScroll,
  };
};

export default usePopMovies;
