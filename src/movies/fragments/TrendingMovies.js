import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import useMovieLists from '../services/useMovieLists';
import {MoviesList, TabsTrendingMovies} from '../components';

const TrendingMovies = ({navigation, keyHandler}) => {
  const [state, setState] = useState('trending/movie/day');
  const {text} = styles;
  const {trendingMovies, loadMoreOnScroll, loadOnTabChange} = useMovieLists();

  const loadTrendingMovies = (urlPath, moviesType) => {
    loadOnTabChange(urlPath, moviesType);
    setState(urlPath);
  };
  const handleOnEndReach = () => {
    loadMoreOnScroll(state, 'trending');
  };

  return (
    <>
      <Text style={text}>Trending</Text>
      <TabsTrendingMovies loadTrendingMovies={loadTrendingMovies} />
      <MoviesList
        handleOnEndReach={handleOnEndReach}
        keyHandler={keyHandler}
        urlPath={state}
        movies={trendingMovies}
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

export default TrendingMovies;
