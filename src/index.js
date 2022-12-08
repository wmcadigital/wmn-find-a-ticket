// IE 11 support
import 'react-app-polyfill/stable';
// React
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';

import App from './components/App/App';

ReactDOM.render(
  <Sentry.ErrorBoundary>
    <App />
  </Sentry.ErrorBoundary>,
  document.getElementById('wmn-app-name'),
);
