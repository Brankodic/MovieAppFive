import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

const TabsTrendingMovies = ({loadPopularMovies}) => {
  const [state, setState] = useState(1);
  const {btn, btnPressed, view} = styles;

  return (
    <>
      <View style={view}>
        <Pressable
          onPress={() => {
            setState(1);
            loadPopularMovies('movie/popular', 'popular');
          }}>
          <Text style={[state === 1 ? btnPressed : btn]}>Popular</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setState(2);
            loadPopularMovies('movie/upcoming', 'popular');
          }}>
          <Text style={[state === 2 ? btnPressed : btn]}>Upcoming</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setState(3);
            loadPopularMovies('tv/popular', 'popular');
          }}>
          <Text style={[state === 3 ? btnPressed : btn]}>On TV</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setState(4);
            loadPopularMovies('movie/now_playing', 'popular');
          }}>
          <Text style={[state === 4 ? btnPressed : btn]}>In Theaters</Text>
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
