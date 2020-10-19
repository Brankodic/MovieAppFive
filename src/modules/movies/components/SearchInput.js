import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';
import useSearchMovies from '../services/useSearchMovies';

const SearchInput = ({onSearchScreenChange, onInputValueChange}) => {
  const [inputState, setState] = useState('');
  const {clearSearchMovies} = useSearchMovies();

  const handlerInput = (value) => {
    onSearchScreenChange(true);
    setState(value);
    onInputValueChange(value);
  };

  const handlerClear = () => {
    clearSearchMovies();
    setState('');
  };

  const onInputFieldClick = () => {
    onSearchScreenChange(true);
  };

  const onCancelClick = () => {
    onSearchScreenChange(false);
  };

  return (
    <SearchBar
      onTouchStart={onInputFieldClick}
      onChangeText={(text) => handlerInput(text)}
      onClear={handlerClear}
      onCancel={onCancelClick}
      value={inputState}
      platform="ios"
      placeholder="Search"
    />
  );
};

export default SearchInput;
