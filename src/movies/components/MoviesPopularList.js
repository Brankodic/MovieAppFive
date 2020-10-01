import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MovieCard from './MovieCard';

const MoviesPopularList = ({keyHandler, popularMovies, loadMore, navigation, urlPath}) => {
  const {movieContainer, item} = styles;

  useEffect(() => {
    return () => {
      listViewRef.scrollToOffset({
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
        onEndReached={() => loadMore(urlPath, 'popular')}
        data={popularMovies}
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
    flexDirection: 'row',
  },
  item: {
    margin: 5,
    marginBottom: 20,
    width: 130,
    height: 170,
  },
});

export default MoviesPopularList;
