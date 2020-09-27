import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import useSearchMovies from '../services/useSearchMovies';
import usePopularMovies from '../services/usePopularMovies';
import {
  SearchInput,
  MoviesPopularList,
  MoviesFreeList,
  MoviesTrendingList,
} from '../components';
import {ScrollView} from 'react-native-gesture-handler';

const MovieListScreen = ({navigation}) => {
  const [searchListState, setState] = useState(false);

  const {isLoading, moviesArray, loadMoreMovies} = usePopularMovies();
  const {
    searchMovieState,
    handleSearchQuery,
    clearSearchMovies,
  } = useSearchMovies();

  const {text, spinnerTextStyle} = styles;

  const handleSearchScreenOn = () => {
    if (!searchListState) {
      setState(true);
    }
  };
  const handleSearchScreenOff = () => {
    clearSearchMovies();
    setState(false);
  };

  const handleRenderedList = () => {
    if (searchListState) {
      return searchMovieState;
    } else {
      return moviesArray;
    }
  };
  const handleRenderedText = () => {
    if (searchListState) {
      return 'Search Results';
    } else {
      return "What's Popular";
    }
  };

  return (
    <>
      <Spinner
        value={isLoading}
        textContent={'Loading...'}
        textStyle={spinnerTextStyle}
      />
      <SearchInput
        searchScreenOn={handleSearchScreenOn}
        searchScreenOff={handleSearchScreenOff}
        handleSearchQuery={handleSearchQuery}
      />
      <ScrollView>
        <Text style={text}>{handleRenderedText()}</Text>
        <MoviesPopularList
          moviesArray={handleRenderedList()}
          loadMore={loadMoreMovies}
          navigation={navigation}
        />
        <Text style={text}>Free To Watch</Text>
        <MoviesFreeList
          moviesArray={handleRenderedList()}
          loadMore={loadMoreMovies}
          navigation={navigation}
        />
        <Text style={text}>Trending</Text>
        <MoviesTrendingList
          moviesArray={handleRenderedList()}
          loadMore={loadMoreMovies}
          navigation={navigation}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  text: {
    backgroundColor: '#fff',
    color: '#0B253F',
    fontSize: 25,
    margin: 15,
  },
});

export default MovieListScreen;
