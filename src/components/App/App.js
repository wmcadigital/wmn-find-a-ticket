import React from 'react';
// Contexts
import ContextProvider from '../../globalState/ContextProvider';
import StartPage from './StartPage';

function App() {
  return (
    <React.StrictMode>
      <ContextProvider>
        <StartPage />
      </ContextProvider>
    </React.StrictMode>
  );
}

export default App;
