import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import useMovieLists from '../services/useMovieLists';
import {MoviesList, TabsFreeMovies} from '../components';

const FreeMovies = ({navigation, keyHandler}) => {
  const [state, setState] = useState('movie/top_rated');
  const {text} = styles;
  const {freeMovies, loadMoreOnScroll, loadOnTabChange} = useMovieLists();

  const loadFreeMovies = (urlPath, moviesType) => {
    loadOnTabChange(urlPath, moviesType);
    setState(urlPath);
  };
  const handleOnEndReach = () => {
    loadMoreOnScroll(state, 'free');
  };

  return (
    <>
      <Text style={text}>Free To Watch</Text>
      <TabsFreeMovies loadFreeMovies={loadFreeMovies} />
      <MoviesList
        handleOnEndReach={handleOnEndReach}
        keyHandler={keyHandler}
        urlPath={state}
        movies={freeMovies}
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
