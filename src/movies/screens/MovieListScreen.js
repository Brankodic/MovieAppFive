import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import useSearchMovies from '../services/useSearchMovies';
import useMovieLists from '../services/useMovieLists';
import {SearchInput, MoviesList} from '../components';
import {FreeMovies, PopularMovies, TrendingMovies} from '../fragments';

const MovieListScreen = ({navigation}) => {
  const [searchListState, setState] = useState(false);
  const {isLoading} = useMovieLists();
  const {
    searchMovieState,
    handleSearchQuery,
    clearSearchMovies,
  } = useSearchMovies();
  const {spinnerContainer} = styles;

  const handleSearchScreenChange = (searchState) => {
    if (!searchListState && searchState) {
      setState(true);
    } else if (!searchState) {
      clearSearchMovies();
      setState(false);
    }
  };
  const keyHandler = (movie) => {
    return movie.id.toString() + new Date().getTime().toString();
  };

  const shouldRenderSearchList = () => {
    if (searchListState) {
      return (
        <>
          <Text style={styles.text}>Search Results</Text>
          <MoviesList
            movies={searchMovieState}
            navigation={navigation}
            keyHandler={keyHandler}
          />
        </>
      );
    } else {
      return (
        <ScrollView>
          <PopularMovies navigation={navigation} keyHandler={keyHandler} />
          <FreeMovies navigation={navigation} keyHandler={keyHandler} />
          <TrendingMovies navigation={navigation} keyHandler={keyHandler} />
        </ScrollView>
      );
    }
  };

  return (
    <>
      <View style={spinnerContainer}>
        <ActivityIndicator animating={isLoading} size="large" color="#aaa" />
      </View>
      <SearchInput
        isSearchActive={handleSearchScreenChange}
        onInputValueChange={handleSearchQuery}
      />
      {shouldRenderSearchList()}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MovieListScreen;
