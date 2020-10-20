import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import MovieCard from './MovieCard';

const MoviesList = (props) => {
  const {movieContainer, item} = styles;
  const {movies, tabState, onEndReach, navigation, moviesType} = props;

  useEffect(() => {
    listViewRef.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }, [tabState]);

  const keyHandler = (movie) => {
    return movie.id.toString() + new Date().getTime().toString();
  };

  return (
    <View>
      <FlatList
        ref={(ref) => {
          listViewRef = ref;
        }}
        contentContainerStyle={movieContainer}
        horizontal
        onEndReached={() => onEndReach(moviesType)} //There will allways be 3 different versions of this list,
        data={movies} //..and I handle onendReach in movielistscreen which creates 3 different lists
        keyExtractor={keyHandler} //so I pass this moviesType here as props so that the handler function would know which specific list is it
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
