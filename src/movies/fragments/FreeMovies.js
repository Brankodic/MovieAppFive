import React from 'react';
import {Text, StyleSheet} from 'react-native';

import usePopularMovies from '../services/usePopularMovies';
import {MoviesFreeList, TabsFreeMovies} from '../components';

const FreeMovies = ({navigation}) => {
  const {text} = styles;

  const {freeMovies, loadMoreMovies, loadMovies} = usePopularMovies();

  const loadFreeMovies = (urlPath, moviesType) => {
    loadMovies(urlPath, moviesType);
  };

  return (
    <>
      <Text style={text}>Free To Watch</Text>
      <TabsFreeMovies loadFreeMovies={loadFreeMovies} />
      <MoviesFreeList
        moviesArray={freeMovies}
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
export default FreeMovies;
