import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  POPULAR_MOVIES,
  FREE_MOVIES,
  POPULAR_URL_PATH,
  TOP_RATED_URL_PATH,
  TRENDING_DAY_URL_PATH,
  popularUrlArray,
  freeUrlArray,
  trendingUrlArray,
} from '../../../constants.js';
import PressableTab from './PressableTab';

const TAB_TITLES = [
  'Popular',
  'Upcoming',
  'On TV',
  'In Theaters',
  'Movies',
  'TV',
  'Today',
  'This Week',
];

const TabsMovies = ({onTabPress, moviesType}) => {
  const [tabState, setTab] = useState({
    popular: POPULAR_URL_PATH,
    free: TOP_RATED_URL_PATH,
    trending: TRENDING_DAY_URL_PATH,
  });
  const {popular, free, trending} = tabState;
  const {view} = styles;

  const onPressTab = (urlPath) => {
    if (moviesType === POPULAR_MOVIES) setTab({popular: urlPath});
    else if (moviesType === FREE_MOVIES) setTab({free: urlPath});
    else setTab({trending: urlPath});

    onTabPress(urlPath, moviesType);
  };

  const renderPopTabs = () => {
    return popularUrlArray.map((urlPath, i) => {
      return (
        <PressableTab
          key={urlPath}
          onPressTab={onPressTab}
          tabState={popular}
          urlPath={urlPath}
          tabTitle={TAB_TITLES[i]}
        />
      );
    });
  };
  const renderFreeTabs = () => {
    return freeUrlArray.map((urlPath, i) => {
      return (
        <PressableTab
          key={urlPath}
          onPressTab={onPressTab}
          tabState={free}
          urlPath={urlPath}
          tabTitle={TAB_TITLES[i + 4]}
        />
      );
    });
  };
  const renderTrendTabs = () => {
    return trendingUrlArray.map((urlPath, i) => {
      return (
        <PressableTab
          key={urlPath}
          onPressTab={onPressTab}
          tabState={trending}
          urlPath={urlPath}
          tabTitle={TAB_TITLES[i + 6]}
        />
      );
    });
  };

  const resolveTabsToRender = () => {
    if (moviesType === POPULAR_MOVIES) {
      return renderPopTabs();
    } else if (moviesType === FREE_MOVIES) {
      return renderFreeTabs();
    } else {
      return renderTrendTabs();
    }
  };

  return <View style={view}>{resolveTabsToRender()}</View>;
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginLeft: '4%',
  },
});

export default TabsMovies;
