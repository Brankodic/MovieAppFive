import React from 'react';
import _ from 'lodash';
import {MOVIE_DETAILS} from '../../../constants';
import FavoriteButton from './FavoriteButton';
import {ImageBackground, StyleSheet, Pressable} from 'react-native';

const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POSTER = '/8RW2runSEc34IwKN2D1aPcJd2UL.jpg';

const MovieCard = ({movie, navigation}) => {
  const {img, imgContainer, container} = styles;
  const imageUrl = IMAGE_PATH + _.get(movie, 'poster_path', DEFAULT_POSTER);

  return (
    <Pressable
      style={container}
      title="Go to Details"
      onPress={() => navigation.navigate(MOVIE_DETAILS, {movieId: movie.id})}>
      <ImageBackground
        style={imgContainer}
        imageStyle={img}
        source={{
          uri: imageUrl,
        }}>
        <FavoriteButton />
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
  },
  img: {
    borderRadius: 12,
  },
  container: {
    flex: 1,
  },
});

export default MovieCard;
