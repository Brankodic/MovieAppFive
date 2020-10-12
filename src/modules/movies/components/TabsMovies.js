import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {MOVIES} from '../../../constants.js';
import PressableTab from './PressableTab';

const TabsMovies = ({onTabPress, moviesType}) => {
  const {POPULAR_MOVIES, FREE_MOVIES, TRENDING_MOVIES} = MOVIES;

  const [tabState, setTab] = useState({
    popular: POPULAR_MOVIES.tabs[0].title,
    free: FREE_MOVIES.tabs[0].title,
    trending: TRENDING_MOVIES.tabs[0].title,
  });
  const {popular, free, trending} = tabState;
  const {view} = styles;

  const onPressTab = (tabTitle) => {
    if (moviesType === POPULAR_MOVIES.key) setTab({popular: tabTitle});
    else if (moviesType === FREE_MOVIES.key) setTab({free: tabTitle});
    else setTab({trending: tabTitle});
    onTabPress(tabTitle, moviesType);
  };

  const renderPopTabs = () => {
    return POPULAR_MOVIES.tabs.map((tab) => {
      return (
        <PressableTab
          key={tab.title}
          onPressTab={onPressTab}
          tabState={popular}
          tabTitle={tab.title}
        />
      );
    });
  };

  const renderFreeTabs = () => {
    return FREE_MOVIES.tabs.map((tab) => {
      return (
        <PressableTab
          key={tab.title}
          onPressTab={onPressTab}
          tabState={free}
          tabTitle={tab.title}
        />
      );
    });
  };

  const renderTrendTabs = () => {
    return TRENDING_MOVIES.tabs.map((tab) => {
      return (
        <PressableTab
          key={tab.title}
          onPressTab={onPressTab}
          tabState={trending}
          tabTitle={tab.title}
        />
      );
    });
  };

  const renderTabs = () => {
    if (moviesType === POPULAR_MOVIES.key) {
      return renderPopTabs();
    } else if (moviesType === FREE_MOVIES.key) {
      return renderFreeTabs();
    } else {
      return renderTrendTabs();
    }
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
