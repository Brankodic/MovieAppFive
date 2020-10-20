import Config from 'react-native-config';
import _ from 'lodash';
import {MOVIES} from '../../../constants';

const API_KEY = Config.API_KEY;
const MAIN_URL = 'https://api.themoviedb.org/3/';
const MOVIES_STRING = 'movies';
const SINGLE_MOVIE = {
  TITLE: 'singleMovie',
  URL: '/credits',
  JOBS: ['Director', 'Production'],
};
const SEARCH_MOVIES = 'searchMovies';
const {TITLE, URL, JOBS} = SINGLE_MOVIE;
const {POPULAR_MOVIES, FREE_MOVIES, TRENDING_MOVIES} = MOVIES;

export const urlPathConstructor = (reqType, specPath) => {
  let urlPath;
  switch (reqType) {
    case MOVIES_STRING:
      urlPath = `${MAIN_URL}${specPath[0]}?api_key=${API_KEY}&language=en-US&page=${specPath[1]}`;
      break;
    case title:
      urlPath = `${MAIN_URL}movie/${specPath}?api_key=${API_KEY}`;
      break;
    case SEARCH_MOVIES:
      urlPath = `${MAIN_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${specPath}&page=1&include_adult=false`;
  }
  return urlPath;
};

export function getSingleMovieDetails(movieId) {
  return Promise.all([
    getData(urlPathConstructor(TITLE, movieId)),
    getData(urlPathConstructor(TITLE, movieId + URL)),
  ]).then(([movieData, crewData]) => {
    return {
      movieData,
      crewData,
      directorData: _.filter(crewData.crew, (crewMember) => {
        return crewMember.job === JOBS[0];
      }),
      productionData: _.filter(crewData.crew, (crewMember) => {
        return crewMember.department === JOBS[1];
      }),
    };
  });
}

export function getInitialMoviesData() {
  return Promise.all([
    getData(urlPathConstructor(MOVIES_STRING, [POPULAR_MOVIES.tabs[0].url, 1])),
    getData(urlPathConstructor(MOVIES_STRING, [FREE_MOVIES.tabs[0].url, 1])),
    getData(
      urlPathConstructor(MOVIES_STRING, [TRENDING_MOVIES.tabs[0].url, 1]),
    ),
  ]).then(([popMoviesData, freeMoviesData, trendMoviesData]) => {
    return {
      popMovies: popMoviesData.results,
      freeMovies: freeMoviesData.results,
      trendMovies: trendMoviesData.results,
    };
  });
}

export async function getData(url) {
  let res = await fetch(url);
  return res.json().catch((err) => console.log(err));
}
