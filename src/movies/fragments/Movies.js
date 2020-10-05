import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import useMovieLists from '../services/useMovieLists';
import {MoviesList, TabsMovies} from '../components';

const Movies = (props) => {
  const [urlPathState, setUrlPath] = useState('movie/popular');
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
    if (moviesType === 'popular') return "What's Popular";
    else if (moviesType === 'free') return 'Free To Watch';
    else return 'Trending';
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
