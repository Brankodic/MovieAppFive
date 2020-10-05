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
import {Movies} from '../fragments';

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

  const {
    popularMovies,
    freeMovies,
    trendingMovies,
    loadMoreOnScroll,
    loadOnTabChange,
  } = useMovieLists();

  const handleTabPress = (urlPath, moviesType) => {
    loadOnTabChange(urlPath, moviesType);
  };
  const handleOnEndReach = (urlPath, moviesType) => {
    loadMoreOnScroll(urlPath, moviesType);
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
          <Movies
            moviesArray={popularMovies}
            moviesType={'popular'}
            handleTabPress={handleTabPress}
            handleOnEndReach={handleOnEndReach}
            navigation={navigation}
            keyHandler={keyHandler}
          />
          <Movies
            moviesArray={freeMovies}
            moviesType={'free'}
            handleTabPress={handleTabPress}
            handleOnEndReach={handleOnEndReach}
            navigation={navigation}
            keyHandler={keyHandler}
          />
          <Movies
            moviesArray={trendingMovies}
            moviesType={'trending'}
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
