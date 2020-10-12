import React, {useState} from 'react';
import {MOVIES} from '../../../constants.js';
import {MoviesList, TabsMovies, MoviesSectionTitle} from '../components';

const Movies = (props) => {
  const [tabState, setTabState] = useState('');
  const {
    navigation,
    keyHandler,
    moviesArray,
    moviesType,
    handleTabPress,
    handleOnEndReach,
  } = props;
  const {POPULAR_MOVIES, FREE_MOVIES, TRENDING_MOVIES} = MOVIES;

  const onTabPress = (tabTitle, moviesType) => {
    handleTabPress(tabTitle, moviesType);
    setTabState(tabTitle);
  };

  const renderedHeader = () => {
    if (moviesType === POPULAR_MOVIES.key) return POPULAR_MOVIES.title;
    else if (moviesType === FREE_MOVIES.key) return FREE_MOVIES.title;
    else return TRENDING_MOVIES.title;
  };

  return (
    <>
      <MoviesSectionTitle title={renderedHeader()} />
      <TabsMovies moviesType={moviesType} onTabPress={onTabPress} />
      <MoviesList
        onEndReach={handleOnEndReach}
        tabState={tabState}
        keyHandler={keyHandler}
        moviesType={moviesType}
        movies={moviesArray}
        navigation={navigation}
      />
    </>
  );
};

export default Movies;
