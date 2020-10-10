import {useState, useEffect} from 'react';
import {getData, getInitialMoviesData, urlPathConstructor} from './api';

const usePopMovies = () => {
  const [popMoviesState, setState] = useState({
    isLoading: true,
    nextPopPage: 2,
    popMovies: [],
  });

  const {isLoading, popMovies, nextPopPage} = popMoviesState;

  const getInitialData = () => {
    getInitialMoviesData().then(() => {
      const {popMoviesData} = initMovies;
      setState({
        ...popMoviesState,
        popMovies: popMoviesData,
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
        ...popMoviesState,
        nextPopPage: 2,
        popMovies: res.results,
        isLoading: false,
      });
    });
  }
  const loadPopOnTabChange = (urlPath) => {
    getDataOnChangeType(urlPath);
  };

  async function getMorePopular(urlPath) {
    return getData(
      urlPathConstructor('movies', [urlPath, nextPopPage]),
    ).then((res) => {
      setState({
        ...popMoviesState,
        nextPopPage: nextPopPage + 1,
        popMovies: popMovies.concat(res.results),
      });
    });
  }
  const loadPopOnScroll = (urlPath) => {
    getMorePopular(urlPath);
  };

  return {
    popMovies,
    isLoading,
    loadPopOnTabChange,
    loadPopOnScroll,
  };
};

export default usePopMovies;
