import React from 'react';
import { AutoCompleteProvider } from './AutoCompleteContext';
import SearchComponents from './SearchComponents/SearchComponents';

const AutoComplete = () => {
  return (
    <AutoCompleteProvider>
      <SearchComponents />
    </AutoCompleteProvider>
  );
};

export default AutoComplete;
