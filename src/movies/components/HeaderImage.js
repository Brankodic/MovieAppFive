import React from 'react';
import {Image, StyleSheet} from 'react-native';
import tmdbLogo from '../../assets/tmdbLogo.png';

const HeaderImage = () => {
  return <Image style={styles.img} source={tmdbLogo} />;
};

const styles = StyleSheet.create({
  img: {
    width: 110,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default HeaderImage;
