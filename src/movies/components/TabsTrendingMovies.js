import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

const TabsTrendingMovies = ({loadTrendingMovies}) => {
  const [state, setState] = useState(true);
  const {btn, btnPressed, view} = styles;

  return (
    <>
      <View style={view}>
        <Pressable
          onPress={() => {
            setState(true);
            loadTrendingMovies('trending/movie/day', 'trending');
          }}>
          <Text style={[state ? btnPressed : btn]}>Today</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setState(false);
            loadTrendingMovies('trending/movie/week', 'trending');
          }}>
          <Text style={[state ? btn : btnPressed]}>This Week</Text>
        </Pressable>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginLeft: '4%',
  },
  btnPressed: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    margin: '3%',
    borderBottomWidth: 2,
    borderBottomColor: '#0B253F',
    textAlign: 'center',
  },
  btn: {
    color: '#0B253F',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    fontSize: 14,
    margin: '3%',
  },
});
export default TabsTrendingMovies;