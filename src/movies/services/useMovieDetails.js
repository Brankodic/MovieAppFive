import {useEffect, useState} from 'react';
import _ from 'lodash';
import {
  getSingleMovieDetails,
  movieData,
  crewData,
  directorData,
  productionData,
} from './api';

const useMovieDetails = (movieId) => {
  const [state, setState] = useState({
    isLoading: true,
    movie: {},
    image: 'https://image.tmdb.org/t/p/w500',
    year: '',
    language: '',
    genre: '',
    charachters: [],
    director: '',
    production: [],
  });

  function fetchData() {
    getSingleMovieDetails(movieId).then(() => {
      const {poster_path, release_date, original_language, genres} = movieData;
      const {cast} = crewData;
      setState({
        ...state,
        movie: movieData,
        image: state.image + poster_path,
        year: release_date.slice(0, 4),
        language: original_language.toUpperCase(),
        genre: genres[0].name,
        charachters: cast.slice(0, 2).map((n) => n.name),
        director: directorData[0].name,
        production: productionData.slice(0, 3).map((n) => n.name),
        isLoading: false,
      });
    });
  }

  useEffect(() => {
    fetchData();     //mmmm ...clean
  }, []);

  return {state};
};

export default useMovieDetails;
