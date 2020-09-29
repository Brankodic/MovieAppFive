import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import useMovieDetails from '../services/useMovieDetails';

import {MovieCastText} from '../components';

const MovieDetailsScreen = ({route}) => {
  const {state} = useMovieDetails(route.params.movieId);

  const {movie, image, year, genre, language, isLoading} = state;
  const {overview, title, release_date, runtime} = movie;

  const {
    container,
    imageStyle,
    imgContainer,
    titleStyle,
    yearStyle,
    colorWhite,
    boldText,
    overviewTitle,
    overviewStyle,
    spinnerTextStyle,
  } = styles;

  return (
    <View style={container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={spinnerTextStyle}
      />
      <ImageBackground source={{uri: image}} style={imageStyle}>
        <View style={imgContainer}>
          <Text style={titleStyle}>
            {title}
            <Text style={(colorWhite, yearStyle)}>({year})</Text>
          </Text>
          <Text style={colorWhite}>
            {release_date} ({language})
          </Text>
          <Text style={colorWhite}>
            {genre}
            <Text style={boldText}> {runtime}m</Text>
          </Text>
        </View>
      </ImageBackground>
      <Text style={overviewTitle}>Overview</Text>
      <Text style={overviewStyle}>{overview}</Text>
      <MovieCastText state={state} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageStyle: {
    flexDirection: 'column',
    flex: 4 / 5,
  },
  imgContainer: {
    position: 'absolute',
    bottom: '2%',
    marginLeft: 15,
  },
  colorWhite: {
    color: 'white',
  },
  boldText: {
    fontWeight: 'bold',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 10,
    fontSize: 30,
  },
  yearStyle: {
    fontWeight: 'normal',
  },
  overviewTitle: {
    padding: 12,
    paddingBottom: 0,
    color: '#0B253F',
    fontSize: 25,
  },
  overviewStyle: {
    padding: 12,
  },
});

export default MovieDetailsScreen;
