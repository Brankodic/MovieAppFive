import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import MovieCard from './MovieCard';

const MovieList = (props) => {
  const {moviesArray, loadMore, navigation} = props;
  const {row, movieContainer, item} = styles;

  const handlerKey = (movie) => {
    const key = movie.id + Math.floor(Math.random() * 100);
    return key.toString();
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={movieContainer}
        horizontal
        onEndReached={loadMore}
        data={moviesArray}
        keyExtractor={(movie) => {
          return handlerKey(movie);
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
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  movieContainer: {
    flexDirection: 'row',
  },
  item: {
    margin: 5,
    marginBottom: 30,
    width: 110,
    height: 150,
  },
});
export default MovieList;
