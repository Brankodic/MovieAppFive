import React from 'react';
import _ from 'lodash';
import {Text, StyleSheet} from 'react-native';
import {MOVIES} from '../../../constants';

const MoviesSectionTitle = ({type}) => {
  const {text} = styles;

  const headerTitle = () => {
    const matchingTitle = _.find(
      MOVIES,
      (movieCategory) => movieCategory.key === type,
    );
    return matchingTitle.title;
  };

  return <Text style={text}>{headerTitle()}</Text>;
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
