import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';

import usePopularMovies from '../services/usePopularMovies';
import {MoviesFreeList, TabsFreeMovies} from '../components';

const FreeMovies = ({navigation}) => {
  const [state, setState] = useState('movie/top_rated');
  const {text} = styles;
  const {freeMovies, loadMoreMovies, loadMovies} = usePopularMovies();

  const loadFreeMovies = (urlPath, moviesType) => {
    loadMovies(urlPath, moviesType);
    setState(urlPath);
  };

  return (
    <>
      <Text style={text}>Free To Watch</Text>
      <TabsFreeMovies loadFreeMovies={loadFreeMovies} />
      <MoviesFreeList
        urlPath={state}
        freeMovies={freeMovies}
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
export default FreeMovies;
