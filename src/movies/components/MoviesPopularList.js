import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';

import MovieCard from './MovieCard';

const MoviesPopularList = (props) => {
  const {moviesArray, loadMore, navigation, urlPath} = props;
  const {movieContainer, item} = styles;

  const handlerKey = (movie) => {
    const key = movie.id + Math.floor(Math.random() * 1000);
    return key.toString();
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
        onEndReachedThreshold={0.01}
        horizontal
        onEndReached={() => loadMore(urlPath, 'popular')}
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
export default MoviesPopularList;
