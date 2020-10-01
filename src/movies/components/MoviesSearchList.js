import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MovieCard from './MovieCard';

const MoviesSearchList = ({keyHandler, searchedMovies, navigation}) => {
  const {movieContainer, item} = styles;

  return (
    <View>
      <FlatList
        contentContainerStyle={movieContainer}
        vertical
        data={searchedMovies}
        keyExtractor={(movie) => {
          return keyHandler(movie);
        }}
        renderItem={(movie) => {
          return (
            <View style={item}>
              <MovieCard movie={movie.item} navigation={navigation} />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: 'column',
  },
  item: {
    margin: 5,
    marginBottom: 20,
    width: 160,
    height: 200,
  },
});

export default MoviesSearchList;
