import {useState, useEffect} from 'react';
import {getData, getMoreMoviesUrl, getMoviesByPathUrl} from './api';

const useMovieLists = () => {
  const [movieState, setState] = useState({
    isLoading: true,
    popularMoviesPage: 2,
    freeMoviesPage: 2,
    trendingMoviesPage: 2,
    popularMovies: [],
    freeMovies: [],
    trendingMovies: [],
  });

  const {
    isLoading,
    popularMovies,
    freeMovies,
    trendingMovies,
    popularMoviesPage,
    trendingMoviesPage,
    freeMoviesPage,
  } = movieState;

  useEffect(() => {
    (async () => {
      const popRes = await getData(getMoviesByPathUrl('movie/popular'));
      const freeRes = await getData(getMoviesByPathUrl('movie/top_rated'));
      const trendRes = await getData(getMoviesByPathUrl('trending/movie/day'));
      setState({
        ...movieState,
        popularMovies: popRes.results,
        freeMovies: freeRes.results,
        trendingMovies: trendRes.results,
        isLoading: false,
      });
    })();
  }, []);

  const loadOnTabChange = (urlPath, moviesType) => {
    (async () => {
      const res = await getData(getMoviesByPathUrl(urlPath));
      if (moviesType === 'popular') {
        setState({
          ...movieState,
          popularMoviesPage: 2,
          popularMovies: res.results,
          isLoading: false,
        });
      } else if (moviesType === 'free') {
        setState({
          ...movieState,
          freeMoviesPage: 2,
          freeMovies: res.results,
          isLoading: false,
        });
      } else {
        setState({
          ...movieState,
          trendingMoviesPage: 2,
          trendingMovies: res.results,
          isLoading: false,
        });
      }
    })();
  };

  const loadMoreOnScroll = (urlPath, moviesType) => {
    if (moviesType === 'popular') {
      (async () => {
        const res = await getData(getMoreMoviesUrl(urlPath, popularMoviesPage));
        setState({
          ...movieState,
          popularMoviesPage: popularMoviesPage + 1,
          popularMovies: popularMovies.concat(res.results),
        });
      })();
    } else if (moviesType === 'free') {
      (async () => {
        const res = await getData(getMoreMoviesUrl(urlPath, freeMoviesPage));
        setState({
          ...movieState,
          freeMoviesPage: freeMoviesPage + 1,
          freeMovies: freeMovies.concat(res.results),
        });
      })();
    } else {
      (async () => {
        const res = await getData(
          getMoreMoviesUrl(urlPath, trendingMoviesPage),
        );
        setState({
          ...movieState,
          trendingMoviesPage: trendingMoviesPage + 1,
          trendingMovies: trendingMovies.concat(res.results),
        });
      })();
    }
  };

  return {
    popularMovies,
    freeMovies,
    trendingMovies,
    isLoading,
    loadOnTabChange,
    loadMoreOnScroll,
  };
};

export default useMovieLists;
