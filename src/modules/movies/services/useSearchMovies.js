import {useState} from 'react';
import {debounce} from 'lodash';
import {getData, urlPathConstructor} from './api';

const usePopularMovies = () => {
  const [searchMovieState, setState] = useState([]);

  const handleSearchQuery = (value) => {
    if (value.length > 2) {
      const handleChange = debounce((text) => {
        loadSearchMovies(text);
      }, 1000);
      handleChange(value);
    } else {
      setState([]);
    }
  };

  const clearSearchMovies = () => {
    setState([]);
  };

  const loadSearchMovies = (value) => {
    (async () => {
      const res = await getData(urlPathConstructor('searchMovies', value));
      setState(res.results.slice(0, 60));
    })();
  };

  return {
    searchMovieState,
    handleSearchQuery,
    clearSearchMovies,
  };
};

export default usePopularMovies;
