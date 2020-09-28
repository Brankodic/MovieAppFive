import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import usePopularMovies from '../services/usePopularMovies';
import MoviesPopularList from './MoviesPopularList';

const TabsPopularMovies = ({navigation}) => {
  const {textButt, text, view} = styles;

  const {moviesArray, loadMoreMovies} = usePopularMovies();

  return (
    <>
      <Text style={text}>What's Popular</Text>
      <View style={view}>
        <Text style={textButt}>Streaming</Text>
        <Text style={textButt}>On TV</Text>
        <Text style={textButt}>For Rent</Text>
        <Text style={textButt}>In Theaters</Text>
      </View>
      <MoviesPopularList
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
export default TabsPopularMovies;
