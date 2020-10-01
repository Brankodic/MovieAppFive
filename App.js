import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MovieListScreen, MovieDetailsScreen } from './src/movies/screens';
import { HeaderImage, HeaderBackImage } from './src/movies/components';

const Stack = createStackNavigator();

const navOptionsListScreen = {
  headerTitle: (props) => <HeaderImage {...props} />,
  cardStyle: { backgroundColor: 'white' },
  headerStyle: { backgroundColor: '#0B253F' },
};

const navOptionsDetailsScreen = {
  headerBackImage: () => <HeaderBackImage />,
  headerTitle: (props) => <HeaderImage {...props} />,
  headerRight: () => <View />,
  cardStyle: { backgroundColor: 'white' },
  headerStyle: { backgroundColor: '#0B253F' },
  headerBackTitleVisible: false,
};

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MovieListScreen">
          <Stack.Screen
            options={navOptionsListScreen}
            name="MovieListScreen"
            component={MovieListScreen}
          />
          <Stack.Screen
            options={navOptionsDetailsScreen}
            name="MovieDetails"
            component={MovieDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
