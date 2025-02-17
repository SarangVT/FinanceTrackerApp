import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { UserContextProvider } from './Context/userData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </HashRouter>
);
