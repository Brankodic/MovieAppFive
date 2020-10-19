import React, {useState} from 'react';
import {MoviesList, TabsMovies, MoviesSectionTitle} from '../components';

const Movies = (props) => {
  const [tabState, setTabState] = useState('');
  const {
    navigation,
    moviesArray,
    moviesType,
    handleTabPress,
    handleOnEndReach,
  } = props;

  const onTabPress = (tabTitle, moviesType) => {
    handleTabPress(tabTitle, moviesType);
    setTabState(tabTitle);
  };

  return (
    <>
      <MoviesSectionTitle type={moviesType} />
      <TabsMovies moviesType={moviesType} onTabPress={onTabPress} />
      <MoviesList
        onEndReach={handleOnEndReach}
        tabState={tabState}
        moviesType={moviesType}
        movies={moviesArray}
        navigation={navigation}
      />
    </>
  );
};

export default Movies;
