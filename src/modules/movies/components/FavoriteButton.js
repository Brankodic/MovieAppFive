import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const FavoriteButton = () => {
  const {btn, heart} = styles;

  return (
    <Pressable style={btn}>
      <Icon size={25} style={heart} color={'white'} name="hearto" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    opacity: 0.5,
    position: 'relative',
    top: 7,
    left: 7,
    backgroundColor: '#0B253F',
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  heart: {
    alignSelf: 'center',
    top: 5,
  },
});

export default FavoriteButton;
