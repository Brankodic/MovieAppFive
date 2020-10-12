import React from 'react';
import {Text, StyleSheet} from 'react-native';

const MoviesSectionTitle = ({title}) => {
  const {text} = styles;

  return <Text style={text}>{title}</Text>;
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
