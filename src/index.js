import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './components/App';
import { UserProvider } from './context/UserContext';
import { AlertProvider } from './context/AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
       <AlertProvider>
        <App />
      </AlertProvider>
    </UserProvider>
  </React.StrictMode>
);
