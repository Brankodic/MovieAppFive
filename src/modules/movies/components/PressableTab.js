import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const PressableTab = (props) => {
  const {onPressTab, tabState, tabTitle} = props;
  const {btn, btnPressed} = styles;

  const style = tabState === tabTitle ? [btn, btnPressed] : btn;

  return (
    <Pressable onPress={() => onPressTab(tabTitle)}>
      <Text style={style}>{tabTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnPressed: {
    color: '#000000',
    fontWeight: 'bold',
    borderBottomColor: '#0B253F',
  },
  btn: {
    color: '#0B253F',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    fontSize: 14,
    margin: '3%',
  },
});

export default PressableTab;
