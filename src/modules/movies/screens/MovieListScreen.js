import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import useSearchMovies from '../services/useSearchMovies';
import {useFreeMovies, usePopMovies, useTrendMovies} from '../services';
import {MOVIES} from '../../../constants';
import {SearchInput, MoviesList} from '../components';
import {Movies} from '../fragments';

const MovieListScreen = ({navigation}) => {
  const [searchListState, setState] = useState(false);
  const {spinnerContainer} = styles;
  const {POPULAR_MOVIES, FREE_MOVIES, TRENDING_MOVIES} = MOVIES;
  const {
    searchMovieState,
    handleSearchQuery,
    clearSearchMovies,
  } = useSearchMovies();

  const {
    isLoading,
    popMovies,
    loadPopOnTabChange,
    loadPopOnScroll,
  } = usePopMovies();
  const {freeMovies, loadFreeOnTabChange, loadFreeOnScroll} = useFreeMovies();
  const {
    trendMovies,
    loadTrendOnTabChange,
    loadTrendOnScroll,
  } = useTrendMovies();

  const handleSearchScreenChange = (searchState) => {
    if (!searchListState && searchState) {
      setState(true);
    } else if (!searchState) {
      clearSearchMovies();
      setState(false);
    }
  };

  const handleTabPress = (tabTitle, moviesType) => {
    if (moviesType === POPULAR_MOVIES.key) {
      loadPopOnTabChange(tabTitle);
    } else if (moviesType === FREE_MOVIES.key) {
      loadFreeOnTabChange(tabTitle);
    } else {
      loadTrendOnTabChange(tabTitle);
    }
  };

  const handleOnEndReach = (moviesType) => {
    if (moviesType === POPULAR_MOVIES.key) {
      loadPopOnScroll();
    } else if (moviesType === FREE_MOVIES.key) {
      loadFreeOnScroll();
    } else {
      loadTrendOnScroll();
    }
  };

  const keyHandler = (movie) => {
    return movie.id.toString() + new Date().getTime().toString();
  };

  const renderLists = () => {
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
          <Movies
            moviesArray={popMovies}
            moviesType={POPULAR_MOVIES.key}
            handleTabPress={handleTabPress}
            handleOnEndReach={handleOnEndReach}
            navigation={navigation}
            keyHandler={keyHandler}
          />
          <Movies
            moviesArray={freeMovies}
            moviesType={FREE_MOVIES.key}
            handleTabPress={handleTabPress}
            handleOnEndReach={handleOnEndReach}
            navigation={navigation}
            keyHandler={keyHandler}
          />
          <Movies
            moviesArray={trendMovies}
            moviesType={TRENDING_MOVIES.key}
            handleTabPress={handleTabPress}
            handleOnEndReach={handleOnEndReach}
            navigation={navigation}
            keyHandler={keyHandler}
          />
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
        setSearchActiveState={handleSearchScreenChange}
        onInputValueChange={handleSearchQuery}
      />
      {renderLists()}
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
