import {useState, useEffect} from 'react';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';

const useFreeMovies = () => {
  const [freeMoviesState, setState] = useState({
    isLoading: true,
    nextFreePage: 2,
    freeMovies: [],
  });

  const {isLoading, freeMovies, nextFreePage} = freeMoviesState;

  const getInitialData = () => {
    getInitialMoviesData().then(() => {
      const {freeMoviesData} = initMovies;
      setState({
        ...freeMoviesState,
        freeMovies: freeMoviesData,
        isLoading: false,
      });
    });
  };
  useEffect(() => {
    getInitialData();
  }, []);

  async function getDataOnChangeType(urlPath) {
    return getData(urlPathConstructor('movies', [urlPath, 1])).then((res) => {
      setState({
        ...freeMoviesState,
        nextFreePage: 2,
        freeMovies: res.results,
        isLoading: false,
      });
    });
  }
  const loadFreeOnTabChange = (urlPath, moviesType) => {
    getDataOnChangeType(urlPath, moviesType);
  };

  async function getMoreFree(urlPath) {
    return getData(urlPathConstructor('movies', [urlPath, nextFreePage])).then(
      (res) => {
        setState({
          ...freeMoviesState,
          nextFreePage: nextFreePage + 1,
          freeMovies: freeMovies.concat(res.results),
        });
      },
    );
  }
  const loadFreeOnScroll = (urlPath) => {
    getMoreFree(urlPath);
  };

  return {
    freeMovies,
    isLoading,
    loadFreeOnTabChange,
    loadFreeOnScroll,
  };
};

export default useFreeMovies;
