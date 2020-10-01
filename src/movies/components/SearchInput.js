import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';
import useSearchMovies from '../services/useSearchMovies';

const SearchInput = ({searchScreenOn, searchScreenOff, handleSearchQuery}) => {
  const [inputState, setState] = useState('');
  const {clearSearchMovies} = useSearchMovies();

  const handlerInput = (value) => {
    searchScreenOn();
    setState(value);
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
