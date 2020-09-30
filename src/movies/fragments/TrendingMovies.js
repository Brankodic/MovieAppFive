import React from 'react';
import {Text, StyleSheet} from 'react-native';

import usePopularMovies from '../services/usePopularMovies';
import {MoviesTrendingList, TabsTrendingMovies} from '../components';

const TrendingMovies = ({navigation}) => {
  const {text} = styles;
  const {trendingMovies, loadMoreMovies, loadMovies} = usePopularMovies();

  const loadTrendingMovies = (urlPath, moviesType) => {
    loadMovies(urlPath, moviesType);
  };

  return (
    <>
      <Text style={text}>Trending</Text>
      <TabsTrendingMovies loadTrendingMovies={loadTrendingMovies} />
      <MoviesTrendingList
        trendingMovies={trendingMovies}
        loadMore={loadMoreMovies}
        navigation={navigation}
      />
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    backgroundColor: '#fff',
    color: '#0B253F',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 15,
  },
});
export default TrendingMovies;
