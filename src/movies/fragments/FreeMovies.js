import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import usePopularMovies from '../services/usePopularMovies';
import {MoviesFreeList,TabsFreeMovies} from '../components';

const FreeMovies = ({navigation}) => {
  const {textButt, text, view} = styles;

  const {moviesArray, loadMoreMovies} = usePopularMovies();

  return (
    <>
      <Text style={text}>Free To Watch</Text>
     <TabsFreeMovies/>
      <MoviesFreeList
        moviesArray={moviesArray}
        loadMore={loadMoreMovies}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  text: {
    backgroundColor: '#fff',
    color: '#0B253F',
    fontSize: 25,
    margin: 15,
  },
  textButt: {
    backgroundColor: '#fff',
    color: '#0B253F',
    fontSize: 15,
    margin: '4%',
  },
});

export default FreeMovies;
