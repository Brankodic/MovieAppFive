import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import useMovieLists from '../services/useMovieLists';
import {MoviesList, TabsPopularMovies} from '../components';

const PopularMovies = ({navigation, keyHandler}) => {
  const [state, setState] = useState('movie/popular');
  const {text} = styles;
  const {popularMovies, loadMoreOnScroll, loadOnTabChange} = useMovieLists();

  const loadPopularMovies = (urlPath, moviesType) => {
    loadOnTabChange(urlPath, moviesType);
    setState(urlPath);
  };
  const handleOnEndReach = () => {
    loadMoreOnScroll(state, 'popular');
  };

  return (
    <>
      <Text style={text}>What's Popular</Text>
      <TabsPopularMovies loadPopularMovies={loadPopularMovies} />
      <MoviesList
        handleOnEndReach={handleOnEndReach}
        keyHandler={keyHandler}
        urlPath={state}
        movies={popularMovies}
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

export default PopularMovies;
