export const MOVIE_DETAILS = 'MovieDetails';
export const MOVIE_LIST = 'MovieListScreen';
export const MOVIES = {
  POPULAR_MOVIES: {
    key: 'popular',
    title: "What's Popular",
    tabs: [
      {
        url: 'movie/popular',
        title: 'Popular',
      },
      {
        url: 'movie/upcoming',
        title: 'Upcoming',
      },
      {url: 'tv/popular', title: 'On TV'},
      {url: 'movie/now_playing', title: 'In Theaters'},
    ],
  },
  FREE_MOVIES: {
    key: 'free',
    title: 'Free to Watch',
    tabs: [
      {
        url: 'movie/top_rated',
        title: 'Movies',
      },
      {
        url: 'tv/top_rated',
        title: 'TV',
      },
    ],
  },
  TRENDING_MOVIES: {
    key: 'trending',
    title: 'Trending',
    tabs: [
      {
        url: 'trending/movie/day',
        title: 'Today',
      },
      {
        url: 'trending/movie/week',
        title: 'This Week',
      },
    ],
  },
};
