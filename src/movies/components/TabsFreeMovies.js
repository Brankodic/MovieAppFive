import React from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';

const TabsFreeMovies = () => {
    const {text,view} = styles;

    return (
      <View style={view}>
        <Text style={text}>Movies</Text>
        <Text style={text}>TV</Text>
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
export default TabsFreeMovies;
