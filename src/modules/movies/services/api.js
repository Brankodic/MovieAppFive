import Config from 'react-native-config';
import _ from 'lodash';
import {
  POPULAR_URL_PATH,
  TOP_RATED_URL_PATH,
  TRENDING_DAY_URL_PATH,
} from '../../../constants';

const API_KEY = Config.API_KEY;
const MAIN_URL = 'https://api.themoviedb.org/3/';

export const urlPathConstructor = (reqType, specPath, ) => {
  let urlPath;
switch(reqType){
  case "movies":
    urlPath = `${MAIN_URL}${specPath[0]}?api_key=${API_KEY}&language=en-US&page=${specPath[1]}`; // specPath [1] = apiMoviePage
    break;
  case "singleMovie":
    urlPath = `${MAIN_URL}movie/${specPath}?api_key=${API_KEY}`; // specPath = movieId + /credits?  , add path for TV
    break;
  case "searchMovies":
    urlPath = `${MAIN_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${specPath}&page=1&include_adult=false`;  //specPath = name
    break;
}
return urlPath;
}

// export const getMoviesByPathUrl = (urlPath) => {
//   return `${MAIN_URL}${urlPath}?api_key=${API_KEY}&language=en-US&page=1`;
// };
// export const getMoreMoviesUrl = (urlPath, apiMoviesPage) => {
//   return `${MAIN_URL}${urlPath}?api_key=${API_KEY}&language=en-US&page=${apiMoviesPage}`;
// };

// export const getSingleMovieUrl = (movieId) => {
//   return `${MAIN_URL}movie/${movieId}?api_key=${API_KEY}`;
// };
// export const getMovieCreditsUrl = (movieId) => {
//   return `${MAIN_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

// };
// export const getSearchMoviesUrl = (name) => {
//   return `${MAIN_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`;
// };

export let initMoviesArray;
export let movieData;
export let crewData;
export let directorData;
export let productionData;

export function getSingleMovieDetails(movieId) {
  let singleMovieData=[];
  return Promise.all([
    getData(urlPathConstructor('singleMovie',movieId)),
    getData(urlPathConstructor('singleMovie',movieId + '/credits')),      //make it cleaner
  ]).then((responses) => {
    return Promise.all(
      responses.map((res) => {
        singleMovieData.push(res);
      }),
    ).then(() => {
      movieData = singleMovieData[0];
      crewData = singleMovieData[1];
      directorData = _.filter(singleMovieData[1].crew, (crewMember) => {
        return crewMember.job === 'Director';
      });
      productionData = _.filter(singleMovieData[1].crew, (crewMember) => {
        return crewMember.department === 'Production';
      });
    });
  });
}

export function getInitialMoviesData() {
  let data = [];
  return Promise.all([
    getData(urlPathConstructor('movies',[POPULAR_URL_PATH,1])),
    getData(urlPathConstructor('movies',[TOP_RATED_URL_PATH,1])),
    getData(urlPathConstructor('movies',[TRENDING_DAY_URL_PATH,1])),     //make it cleaner
  ]).then((responses) => {
    return Promise.all(
      responses.map((res) => {
        data.push(res);
      }),
    ).then(() => {
      let popMoviesData = data[0].results;
      let freeMoviesData = data[1].results;
      let trendMoviesData = data[2].results;
      initMoviesArray = {
        ...initMoviesArray,
        popMoviesData,
        freeMoviesData,
        trendMoviesData,
      };
    });
  });
}

export async function getData(url) {
  let res = await fetch(url);
  return res
    .json()
    .catch((err) => console.log(err));
}
