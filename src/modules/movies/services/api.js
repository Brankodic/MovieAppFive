import Config from 'react-native-config';
import _ from 'lodash';
import {MOVIES} from '../../../constants';

const API_KEY = Config.API_KEY;
const MAIN_URL = 'https://api.themoviedb.org/3/';
const SINGLE_MOVIE = {
  title: 'singleMovie',
  url: '/credits',
  jobs: ['Director', 'Production'],
};
const MOVIES_STRING = 'movies';
const {title, url, jobs} = SINGLE_MOVIE;
const {POPULAR_MOVIES, FREE_MOVIES, TRENDING_MOVIES} = MOVIES;

export const urlPathConstructor = (reqType, specPath) => {
  let urlPath;
  switch (reqType) {
    case 'movies':
      urlPath = `${MAIN_URL}${specPath[0]}?api_key=${API_KEY}&language=en-US&page=${specPath[1]}`;
      break;
    case 'singleMovie':
      urlPath = `${MAIN_URL}movie/${specPath}?api_key=${API_KEY}`;
      break;
    case 'searchMovies':
      urlPath = `${MAIN_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${specPath}&page=1&include_adult=false`;
  }
  return urlPath;
};

export function getSingleMovieDetails(movieId) {
  let data = [];
  return Promise.all([
    getData(urlPathConstructor(title, movieId)),
    getData(urlPathConstructor(title, movieId + url)),
  ])
    .then((responses) => {
      responses.map((res) => {
        data.push(res);
      });
    })
    .then(() => {
      return (singleMovieData = {
        movieData: data[0],
        crewData: data[1],
        directorData: _.filter(data[1].crew, (crewMember) => {
          return crewMember.job === jobs[0];
        }),
        productionData: _.filter(data[1].crew, (crewMember) => {
          return crewMember.department === jobs[1];
        }),
      });
    });
}

export function getInitialMoviesData() {
  let data = [];
  return Promise.all([
    getData(urlPathConstructor(MOVIES_STRING, [POPULAR_MOVIES.tabs[0].url, 1])),
    getData(urlPathConstructor(MOVIES_STRING, [FREE_MOVIES.tabs[0].url, 1])),
    getData(
      urlPathConstructor(MOVIES_STRING, [TRENDING_MOVIES.tabs[0].url, 1]),
    ),
  ])
    .then((responses) => {
      responses.map((res) => {
        data.push(res);
      });
    })
    .then(() => {
      return (initMovies = {
        popMoviesData: data[0].results,
        freeMoviesData: data[1].results,
        trendMoviesData: data[2].results,
      });
    });
}

export async function getData(url) {
  let res = await fetch(url);
  return res.json().catch((err) => console.log(err));
}
