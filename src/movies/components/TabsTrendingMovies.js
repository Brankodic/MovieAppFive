import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TabsTrendingMovies = () => {
    const {text,view} = styles;

    return (
      <View style={view}>
        <Text style={text}>Today</Text>
        <Text style={text}>This Week</Text>
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
export default TabsTrendingMovies;
