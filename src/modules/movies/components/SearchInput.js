import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';
import useSearchMovies from '../services/useSearchMovies';

const SearchInput = ({setSearchActiveState, onInputValueChange}) => {
  const [inputState, setState] = useState('');
  const {clearSearchMovies} = useSearchMovies();

  const handlerInput = (value) => {
    setSearchActiveState(true);
    setState(value);
    onInputValueChange(value);
  };

  const handlerClear = () => {
    clearSearchMovies();
    setState('');
  };
  
  const onInputFieldClick = () => {
    setSearchActiveState(true);
  };
  
  const onCancelClick = () => {
    setSearchActiveState(false);
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
