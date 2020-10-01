import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import useMovieLists from '../services/useMovieLists';
import {MoviesTrendingList, TabsTrendingMovies} from '../components';

const TrendingMovies = ({navigation, keyHandler}) => {
  const [state, setState] = useState('trending/movie/day');
  const {text} = styles;
  const {trendingMovies, loadMoreOnScroll, loadOnTabChange} = useMovieLists();

  const loadTrendingMovies = (urlPath, moviesType) => {
    loadOnTabChange(urlPath, moviesType);
    setState(urlPath);
  };

  return (
    <>
      <Text style={text}>Trending</Text>
      <TabsTrendingMovies loadTrendingMovies={loadTrendingMovies} />
      <MoviesTrendingList
        keyHandler={keyHandler}
        urlPath={state}
        trendingMovies={trendingMovies}
        loadMore={loadMoreOnScroll}
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
