import React, {useState} from 'react';
import _ from 'lodash';
import {View, StyleSheet} from 'react-native';
import {MOVIES} from '../../../constants.js';
import PressableTab from './PressableTab';

const TabsMovies = ({onTabPress, moviesType}) => {
  const {POPULAR_MOVIES, FREE_MOVIES, TRENDING_MOVIES} = MOVIES;

  const [tabState, setTab] = useState({
    [POPULAR_MOVIES.key]: POPULAR_MOVIES.tabs[0].title,
    [FREE_MOVIES.key]: FREE_MOVIES.tabs[0].title,
    [TRENDING_MOVIES.key]: TRENDING_MOVIES.tabs[0].title,
  });
  const {view} = styles;

  const matchingMovie = _.find(
    MOVIES,
    (movieCategory) => movieCategory.key === moviesType,
  );

  const onPressTab = (tabTitle) => {
    setTab({[matchingMovie.key]: tabTitle});
    onTabPress(tabTitle, moviesType);
  };

  const renderTabs = () => {
    return matchingMovie.tabs.map((tab) => {
      return (
        <PressableTab
          key={tab.title}
          onPressTab={onPressTab}
          tabState={tabState[matchingMovie.key]}
          tabTitle={tab.title}
        />
      );
    });
  };

  return <View style={view}>{renderTabs()}</View>;
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginLeft: '4%',
  },
});

export default TabsMovies;
