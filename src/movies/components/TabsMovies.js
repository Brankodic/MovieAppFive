import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  POPULAR_MOVIES,
  FREE_MOVIES,
  POPULAR_URL_PATH,
  UPCOMING_URL_PATH,
  POPULAR_TV_URL_PATH,
  THEATERS_URL_PATH,
  TOP_RATED_URL_PATH,
  TV_TOP_RATED_URL_PATH,
  TRENDING_DAY_URL_PATH,
  TRENDING_WEEK_URL_PATH,
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

  const tabsToRender = () => {
    if (moviesType === POPULAR_MOVIES) {
      return (
        <View style={view}>
          <PressableTab
            onPressTab={onPressTab}
            tabState={popular}
            urlPath={POPULAR_URL_PATH}
            tabTitle={TAB_TITLES[0]}
          />
          <PressableTab
            onPressTab={onPressTab}
            tabState={popular}
            urlPath={UPCOMING_URL_PATH}
            tabTitle={TAB_TITLES[1]}
          />
          <PressableTab
            onPressTab={onPressTab}
            tabState={popular}
            urlPath={POPULAR_TV_URL_PATH}
            tabTitle={TAB_TITLES[2]}
          />
          <PressableTab
            onPressTab={onPressTab}
            tabState={popular}
            urlPath={THEATERS_URL_PATH}
            tabTitle={TAB_TITLES[3]}
          />
        </View>
      );
    } else if (moviesType === FREE_MOVIES) {
      return (
        <View style={view}>
          <PressableTab
            onPressTab={onPressTab}
            tabState={free}
            urlPath={TOP_RATED_URL_PATH}
            tabTitle={TAB_TITLES[4]}
          />
          <PressableTab
            onPressTab={onPressTab}
            tabState={free}
            urlPath={TV_TOP_RATED_URL_PATH}
            tabTitle={TAB_TITLES[5]}
          />
        </View>
      );
    } else {
      return (
        <View style={view}>
          <PressableTab
            onPressTab={onPressTab}
            tabState={trending}
            urlPath={TRENDING_DAY_URL_PATH}
            tabTitle={TAB_TITLES[6]}
          />
          <PressableTab
            onPressTab={onPressTab}
            tabState={trending}
            urlPath={TRENDING_WEEK_URL_PATH}
            tabTitle={TAB_TITLES[7]}
          />
        </View>
      );
    }
  };

  return tabsToRender();
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginLeft: '4%',
  },
});

export default TabsMovies;
