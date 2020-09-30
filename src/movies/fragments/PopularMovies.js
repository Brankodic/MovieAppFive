import React from 'react';
import {Text, StyleSheet} from 'react-native';

import usePopularMovies from '../services/usePopularMovies';
import {MoviesPopularList, TabsPopularMovies} from '../components';

const PopularMovies = ({navigation}) => {
  const {text} = styles;

  const {popularMovies, loadMoreMovies, loadMovies} = usePopularMovies();

  const loadPopularMovies = (urlPath, moviesType) => {
    loadMovies(urlPath, moviesType);
  };

  return (
    <>
      <Text style={text}>What's Popular</Text>
      <TabsPopularMovies loadPopularMovies={loadPopularMovies}/>
      <MoviesPopularList
        moviesArray={popularMovies}
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
export default PopularMovies;
