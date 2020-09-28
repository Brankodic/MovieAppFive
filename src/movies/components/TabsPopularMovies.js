import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TabsPopularMovies = () => {
  const {text,view} = styles;

  return (
    <View style={view}>
      <Text style={text}>Streaming</Text>
      <Text style={text}>On TV</Text>
      <Text style={text}>For Rent</Text>
      <Text style={text}>In Theaters</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  text: {
    backgroundColor: '#fff',
    color: '#0B253F',
    fontSize: 15,
    margin: '4%',
  },
});
export default TabsPopularMovies;
