import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {MOVIES} from '../../../constants.js';
import {MoviesList, TabsMovies} from '../components';

const Movies = (props) => {
  const [tabState, setTabState] = useState('');
  const {text} = styles;
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
      <Text style={text}>{renderedHeader()}</Text>
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

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#fff',
    color: '#0B253F',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 15,
  },
});

export default Movies;
