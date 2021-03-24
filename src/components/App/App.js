import React from 'react';
// Contexts
import ContextProvider from 'globalState/ContextProvider';
import ViewToShow from './ViewToShow';

function App() {
  return (
    <React.StrictMode>
      <ContextProvider>
        <ViewToShow />
      </ContextProvider>
    </React.StrictMode>
  );
}

export default App;
