import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import MovieCard from './MovieCard';

const MoviesFreeList = (props) => {
  const {freeMovies, loadMore, navigation, urlPath} = props;
  const {movieContainer, item} = styles;

  const handlerKey = (movie) => {
    return (
      movie.id.toString() +
      new Date().getTime().toString() +
      Math.floor(Math.random() * Math.floor(new Date().getTime())).toString()
    );
  };

  useEffect(() => {
    return () => {
      listViewRef.scrollToOffset({
        offset: 0,
        animated: true,
      });
    };
  }, [urlPath]);

  return (
    <View>
      <FlatList
        ref={(ref) => {
          listViewRef = ref;
        }}
        contentContainerStyle={movieContainer}
        horizontal
        onEndReached={() => loadMore(urlPath, 'free')}
        data={freeMovies}
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
export default MoviesFreeList;
