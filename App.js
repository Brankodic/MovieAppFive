import React from 'react';
import {View, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {screens} from './src/movies';
import {MOVIE_LIST, MOVIE_DETAILS} from './constants';
import {HeaderImage, HeaderBackImage} from './src/movies';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: 'white',
  },
  backgroundDarkBlue: {
    backgroundColor: '#0B253F',
  },
});
const {backgroundWhite, backgroundDarkBlue} = styles;

const navOptionsListScreen = {
  headerTitle: (props) => <HeaderImage {...props} />,
  cardStyle: backgroundWhite,
  headerStyle: backgroundDarkBlue,
};

const navOptionsDetailsScreen = {
  headerBackImage: () => <HeaderBackImage />, //component without function gives me an error
  headerTitle: (props) => <HeaderImage {...props} />,
  headerRight: () => <View />,
  cardStyle: backgroundWhite,
  headerStyle: backgroundDarkBlue,
  headerBackTitleVisible: false,
};

class App extends React.Component {
  render() {
    const {MovieDetailsScreen, MovieListScreen} = screens;

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={MOVIE_LIST}>
          <Stack.Screen
            options={navOptionsListScreen}
            name={MOVIE_LIST}
            component={MovieListScreen}
          />
          <Stack.Screen
            options={navOptionsDetailsScreen}
            name={MOVIE_DETAILS}
            component={MovieDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
