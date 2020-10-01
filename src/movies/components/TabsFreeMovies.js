import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const TabsFreeMovies = ({loadFreeMovies}) => {
  const [state, setState] = useState(true);
  const {btn, btnPressed, view} = styles;

  const onPressMovies = () => {
    setState(true);
    loadFreeMovies('movie/top_rated', 'free');
  };
  const onPressTv = () => {
    setState(false);
    loadFreeMovies('tv/top_rated', 'free');
  };

  return (
    <>
      <View style={view}>
        <Pressable onPress={() => onPressMovies()}>
          <Text style={[state ? btnPressed : btn]}>Movies</Text>
        </Pressable>
        <Pressable onPress={() => onPressTv()}>
          <Text style={[state ? btn : btnPressed]}>TV</Text>
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

export default TabsFreeMovies;
