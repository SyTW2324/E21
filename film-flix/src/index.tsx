import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // StrictMode is a tool for highlighting potential problems in an application. At this case
  // we are using Tailwind CSS and it has some warnings that we can't fix, so we are disabling
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
