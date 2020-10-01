import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';

import usePopularMovies from '../services/usePopularMovies';
import {MoviesPopularList, TabsPopularMovies} from '../components';

const PopularMovies = ({navigation}) => {
  const [state, setState] = useState('movie/popular');
  const {text} = styles;
  const {popularMovies, loadMoreMovies, loadMovies} = usePopularMovies();

  const loadPopularMovies = (urlPath, moviesType) => {
    loadMovies(urlPath, moviesType);
    setState(urlPath);
  };

  return (
    <>
      <Text style={text}>What's Popular</Text>
      <TabsPopularMovies loadPopularMovies={loadPopularMovies} />
      <MoviesPopularList
        urlPath={state}
        popularMovies={popularMovies}
        loadMore={loadMoreMovies}
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
