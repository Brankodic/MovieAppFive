import React, {useState} from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';

const TabsMovies = ({onTabPress, moviesType}) => {
  const [tabState, setTab] = useState(1);
  const {btn, btnPressed, view} = styles;

  const onPressTab = (urlPath, tabState) => {
    setTab(tabState);
    onTabPress(urlPath, moviesType);
    console.log(urlPath);
  };

  const tabsToRender = () => {
    if (moviesType === 'popular') {
      return (
        <View style={view}>
          <Pressable onPress={() => onPressTab('movie/popular', 1)}>
            <Text style={[tabState === 1 ? btnPressed : btn]}>Popular</Text>
          </Pressable>
          <Pressable onPress={() => onPressTab('movie/upcoming', 2)}>
            <Text style={[tabState === 2 ? btnPressed : btn]}>Upcoming</Text>
          </Pressable>
          <Pressable onPress={() => onPressTab('tv/popular', 3)}>
            <Text style={[tabState === 3 ? btnPressed : btn]}>On TV</Text>
          </Pressable>
          <Pressable onPress={() => onPressTab('movie/now_playing', 4)}>
            <Text style={[tabState === 4 ? btnPressed : btn]}>In Theaters</Text>
          </Pressable>
        </View>
      );
    } else if (moviesType === 'free') {
      return (
        <View style={view}>
          <Pressable onPress={() => onPressTab('movie/top_rated', 1)}>
            <Text style={[tabState === 1 ? btnPressed : btn]}>Movies</Text>
          </Pressable>
          <Pressable onPress={() => onPressTab('tv/top_rated', 2)}>
            <Text style={[tabState === 2 ? btnPressed : btn]}>TV</Text>
          </Pressable>
        </View>
      );
    } else {
      return (
        <View style={view}>
          <Pressable onPress={() => onPressTab('trending/movie/day', 1)}>
            <Text style={[tabState === 1 ? btnPressed : btn]}>Today</Text>
          </Pressable>
          <Pressable onPress={() => onPressTab('trending/movie/week', 2)}>
            <Text style={[tabState === 2 ? btnPressed : btn]}>This Week</Text>
          </Pressable>
        </View>
      );
    }
  };

  return tabsToRender();
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

export default TabsMovies;
