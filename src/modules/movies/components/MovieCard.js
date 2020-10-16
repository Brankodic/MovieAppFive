import React from 'react';
import _ from 'lodash';
import {MOVIE_DETAILS} from '../../../constants';
import FavoriteButton from './FavoriteButton';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POSTER = '/8RW2runSEc34IwKN2D1aPcJd2UL.jpg';

const MovieCard = ({movie, navigation}) => {
  const {img} = styles;
  const imageUrl = IMAGE_PATH + _.get(movie, 'poster_path', DEFAULT_POSTER);

  return (
    <TouchableOpacity
      style={img}
      title="Go to Details"
      onPress={() => navigation.navigate(MOVIE_DETAILS, {movieId: movie.id})}>
      <ImageBackground
        style={img}
        imageStyle={{borderRadius: 12}}
        source={{
          uri: imageUrl,
        }}>
        <FavoriteButton />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default MovieCard;
