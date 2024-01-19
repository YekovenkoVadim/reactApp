import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
    baseUrl: 'https://app-cmo8zo3vh6q4.frontegg.com',
    clientId: '7e5767c2-5395-4654-a800-9a0fda070141',
    // redirectUrl: 'http://localhost:3000/oauth/callback'
    redirectUrl: 'http://127.0.0.1:3000/oauth/callback'
};

const authOptions = {
  keepSessionAlive: true // Uncomment this in order to maintain the session alive
 };

ReactDOM.render(
  <FronteggProvider 
  contextOptions={contextOptions}
  hostedLoginBox={true}
  tracing={true} 
  authOptions={authOptions}>
      <App />
  </FronteggProvider>,
  document.getElementById('root')
);
