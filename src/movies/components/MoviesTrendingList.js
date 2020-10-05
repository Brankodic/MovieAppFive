import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MovieCard from './MovieCard';

const MoviesTrendingList = ({
  keyHandler,
  trendingMovies,
  loadMore,
  navigation,
  urlPath,
}) => {
  const {movieContainer, item} = styles;

  useEffect(() => {
    listViewRef.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [urlPath]);

  return (
    <View>
      <FlatList
        ref={(ref) => {
          listViewRef = ref;
        }}
        contentContainerStyle={movieContainer}
        horizontal
        onEndReached={() => loadMore(urlPath, 'trending')}
        data={trendingMovies}
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

export default MoviesTrendingList;
