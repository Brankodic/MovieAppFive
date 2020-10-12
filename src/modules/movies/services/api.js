import Config from 'react-native-config';
import _ from 'lodash';
import {MOVIES} from '../../../constants';

const API_KEY = Config.API_KEY;
const MAIN_URL = 'https://api.themoviedb.org/3/';
const {POPULAR_MOVIES, FREE_MOVIES, TRENDING_MOVIES} = MOVIES;

export const urlPathConstructor = (reqType, specPath) => {
  let urlPath;
  switch (reqType) {
    case 'movies':
      urlPath = `${MAIN_URL}${specPath[0]}?api_key=${API_KEY}&language=en-US&page=${specPath[1]}`; // specPath [1] = apiMoviePage
      break;
    case 'singleMovie':
      urlPath = `${MAIN_URL}movie/${specPath}?api_key=${API_KEY}`; // specPath = movieId + /credits?  , add path for TV
      break;
    case 'searchMovies':
      urlPath = `${MAIN_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${specPath}&page=1&include_adult=false`; //specPath = name
      break;
  }
  return urlPath;
};

export function getSingleMovieDetails(movieId) {
  let data = [];
  return Promise.all([
    getData(urlPathConstructor('singleMovie', movieId)),
    getData(urlPathConstructor('singleMovie', movieId + '/credits')), //make it cleaner
  ]).then((responses) => {
    return Promise.all(
      responses.map((res) => {
        data.push(res);
      }),
    ).then(() => {
      return (singleMovieData = {
        movieData: data[0],
        crewData: data[1],
        directorData: _.filter(data[1].crew, (crewMember) => {
          return crewMember.job === 'Director';
        }),
        productionData: _.filter(data[1].crew, (crewMember) => {
          return crewMember.department === 'Production';
        }),
      });
    });
  });
}

export function getInitialMoviesData() {
  let data = [];
  return Promise.all([
    getData(urlPathConstructor('movies', [POPULAR_MOVIES.tabs[0].url, 1])),
    getData(urlPathConstructor('movies', [FREE_MOVIES.tabs[0].url, 1])),
    getData(urlPathConstructor('movies', [TRENDING_MOVIES.tabs[0].url, 1])), //make it cleaner
  ])
    .then((responses) => {
      return Promise.all(
        responses.map((res) => {
          data.push(res);
        }),
      );
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
