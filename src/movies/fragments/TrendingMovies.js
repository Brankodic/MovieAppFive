import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';

import usePopularMovies from '../services/usePopularMovies';
import {MoviesTrendingList, TabsTrendingMovies} from '../components';

const TrendingMovies = ({navigation}) => {
  const [state, setState] = useState('trending/movie/day');
  const {text} = styles;
  const {trendingMovies, loadMoreMovies, loadMovies} = usePopularMovies();

  const loadTrendingMovies = (urlPath, moviesType) => {
    loadMovies(urlPath, moviesType);
    setState(urlPath);
  };

  return (
    <>
      <Text style={text}>Trending</Text>
      <TabsTrendingMovies loadTrendingMovies={loadTrendingMovies} />
      <MoviesTrendingList
        urlPath={state}
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
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 15,
  },
});
export default TrendingMovies;
