import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {MOVIES} from '../../../constants';

const MoviesSectionTitle = ({type}) => {
  const {text} = styles;
  const {POPULAR_MOVIES, FREE_MOVIES, TRENDING_MOVIES} = MOVIES;

  const renderedHeader = () => {
    if (type === POPULAR_MOVIES.key) return POPULAR_MOVIES.title;
    else if (type === FREE_MOVIES.key) return FREE_MOVIES.title;
    else return TRENDING_MOVIES.title;
  };

  return <Text style={text}>{renderedHeader()}</Text>;
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
export default MoviesSectionTitle;
