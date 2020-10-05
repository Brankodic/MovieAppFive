import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

const TabsTrendingMovies = ({loadPopularMovies}) => {
  const [state, setState] = useState(1);
  const {btn, btnPressed, view} = styles;

  const onPressPopular = () => {
    setState(1);
    loadPopularMovies('movie/popular', 'popular');
  };
  const onPressUpcoming = () => {
    setState(2);
    loadPopularMovies('movie/upcoming', 'popular');
  };
  const onPressTv = () => {
    setState(3);
    loadPopularMovies('tv/popular', 'popular');
  };
  const onPressTheaters = () => {
    setState(4);
    loadPopularMovies('movie/now_playing', 'popular');
  };

  return (
    <>
      <View style={view}>
        <Pressable onPress={() => onPressPopular()}>
          <Text style={[state === 1 ? btnPressed : btn]}>Popular</Text>
        </Pressable>
        <Pressable onPress={() => onPressUpcoming()}>
          <Text style={[state === 2 ? btnPressed : btn]}>Upcoming</Text>
        </Pressable>
        <Pressable onPress={() => onPressTv()}>
          <Text style={[state === 3 ? btnPressed : btn]}>On TV</Text>
        </Pressable>
        <Pressable onPress={() => onPressTheaters()}>
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
