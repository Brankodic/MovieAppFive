import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MovieCard from './MovieCard';

const MoviesList = (props) => {
  const {movieContainer, item} = styles;
  const {
    keyHandler,
    movies,
    tabState,
    onEndReach,
    navigation,
    moviesType,
  } = props;

  useEffect(() => {
    listViewRef.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [tabState]);

  return (
    <View>
      <FlatList
        ref={(ref) => {
          listViewRef = ref;
        }}
        contentContainerStyle={movieContainer}
        horizontal
        onEndReached={() => onEndReach(moviesType)}
        data={movies}
        keyExtractor={keyHandler}
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

export default MoviesList;
