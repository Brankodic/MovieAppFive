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
import {
  POPULAR_MOVIES,
  FREE_MOVIES,
  TRENDING_MOVIES,
  POPULAR_URL_PATH,
  TOP_RATED_URL_PATH,
  TRENDING_DAY_URL_PATH,
} from '../../../constants';
import {SearchInput, MoviesList} from '../components';
import {Movies} from '../fragments';

const MovieListScreen = ({navigation}) => {
  const [searchListState, setState] = useState(false);
  const {spinnerContainer} = styles;

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
  const {
    freeMovies,
    loadFreeOnTabChange,
    loadFreeOnScroll,
  } = useFreeMovies();
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

  const handleTabPress = (urlPath, moviesType) => {
    if (moviesType === POPULAR_MOVIES) {
      loadPopOnTabChange(urlPath);
    } else if (moviesType === FREE_MOVIES) {
      loadFreeOnTabChange(urlPath);
    } else {
      loadTrendOnTabChange(urlPath);
    }
  };

  const handleOnEndReach = (urlPath, moviesType) => {
    if (moviesType === POPULAR_MOVIES) {
      loadPopOnScroll(urlPath);
    } else if (moviesType === FREE_MOVIES) {
      loadFreeOnScroll(urlPath);
    } else {
      loadTrendOnScroll(urlPath);
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
            moviesType={POPULAR_MOVIES}
            initUrlPath={POPULAR_URL_PATH}
            handleTabPress={handleTabPress}
            handleOnEndReach={handleOnEndReach}
            navigation={navigation}
            keyHandler={keyHandler}
          />
          <Movies
            moviesArray={freeMovies}
            moviesType={FREE_MOVIES}
            initUrlPath={TOP_RATED_URL_PATH}
            handleTabPress={handleTabPress}
            handleOnEndReach={handleOnEndReach}
            navigation={navigation}
            keyHandler={keyHandler}
          />
          <Movies
            moviesArray={trendMovies}
            moviesType={TRENDING_MOVIES}
            initUrlPath={TRENDING_DAY_URL_PATH}
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
