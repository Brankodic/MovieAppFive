import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import usePopularMovies from '../services/usePopularMovies';
import MoviesTrendingList from './MoviesTrendingList';

const TabsTrendingMovies = ({navigation}) => {
  const {textButt, text, view} = styles;

  const {moviesArray, loadMoreMovies} = usePopularMovies();

  return (
    <>
      <Text style={text}>Trending</Text>
      <View style={view}>
        <Text style={textButt}>Today</Text>
        <Text style={textButt}>This Week</Text>
      </View>
      <MoviesTrendingList
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
export default TabsTrendingMovies;
