import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const PressableTab = (props) => {
  const {onPressTab, tabState, tabTitle} = props;
  const {btn, btnPressed} = styles;

  return (
    <Pressable onPress={() => onPressTab(tabTitle)}>
      <Text style={[tabState === tabTitle ? btnPressed : btn]}>{tabTitle}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnPressed: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    margin: '3%',
    borderBottomWidth: 2,
    borderBottomColor: '#0B253F',
    textAlign: 'center',
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
