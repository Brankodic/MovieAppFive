import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {POPULAR_MOVIES, FREE_MOVIES} from '../../../constants.js';
import {MoviesList, TabsMovies} from '../components';

const POPULAR_TITLE = "What's Popular";
const FREE_TITLE = 'Free To Watch';
const TRENDING_TITLE = 'Trending';

const Movies = (props) => {
  const [urlPathState, setUrlPath] = useState(props.initUrlPath);
  const {text} = styles;
  const {
    navigation,
    keyHandler,
    moviesArray,
    moviesType,
    handleTabPress,
    handleOnEndReach,
  } = props;

  const renderedHeader = () => {
    if (moviesType === POPULAR_MOVIES) return POPULAR_TITLE;
    else if (moviesType === FREE_MOVIES) return FREE_TITLE;
    else return TRENDING_TITLE;
  };

  const onTabPress = (urlPath, moviesType) => {
    handleTabPress(urlPath, moviesType);
    setUrlPath(urlPath);
  };

  return (
    <>
      <Text style={text}>{renderedHeader()}</Text>
      <TabsMovies moviesType={moviesType} onTabPress={onTabPress} />
      <MoviesList
        onEndReach={handleOnEndReach}
        keyHandler={keyHandler}
        urlPath={urlPathState}
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
