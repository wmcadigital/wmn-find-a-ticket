import React from 'react';
// Contexts
import ContextProvider from '../../globalState/ContextProvider';

function App() {
  return (
    <React.StrictMode>
      <ContextProvider>
        <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg wmnds-grid">
          <div className="wmnds-col-1">
            <h1>Find a ticket</h1>
            <p>Find and buy day, week and season tickest based on the way you travel.</p>
          </div>
        </div>
      </ContextProvider>
    </React.StrictMode>
  );
}

export default App;
