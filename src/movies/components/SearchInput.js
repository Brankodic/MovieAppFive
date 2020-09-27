import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';

import useSearchMovies from '../services/useSearchMovies';

const SearchInput = (props) => {
  const [inputState, setState] = useState('');

  const {searchScreenOn, searchScreenOff, handleSearchQuery} = props;

  const {clearSearchMovies} = useSearchMovies();

  const handlerInput = (value) => {
    setState(value);
    searchScreenOn();
    handleSearchQuery(value);
  };
  const handlerClear = () => {
    clearSearchMovies();
    setState('');
  };

  return (
    <SearchBar
      onTouchStart={searchScreenOn}
      onChangeText={(text) => handlerInput(text)}
      onClear={handlerClear}
      onCancel={searchScreenOff}
      value={inputState}
      platform="ios"
      placeholder="Search"
    />
  );
};

export default SearchInput;
