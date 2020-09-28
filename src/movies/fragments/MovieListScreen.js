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
  TabsFreeMovies,
  TabsPopularMovies,
  TabsTrendingMovies,
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

  const {spinnerTextStyle} = styles;

  const handleSearchScreenOn = () => {
    if (!searchListState) {
      setState(true);
    }
  };
  const handleSearchScreenOff = () => {
    clearSearchMovies();
    setState(false);
  };

  const shouldRenderSearchList = () => {
    if (searchListState) {
      return (
        <>
          <Text style={styles.text}>Search Results</Text>
          <MoviesPopularList
            moviesArray={searchMovieState}
            loadMore={loadMoreMovies}
            navigation={navigation}
          />
        </>
      );
    } else {
      return (
        <ScrollView>
          <TabsPopularMovies navigation={navigation} />
          <TabsFreeMovies navigation={navigation} />
          <TabsTrendingMovies navigation={navigation} />
        </ScrollView>
      );
    }
  };

  const RenderList = shouldRenderSearchList();

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
      {RenderList}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default MovieListScreen;
