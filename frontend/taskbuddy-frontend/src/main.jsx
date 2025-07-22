import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import RequestPage from './components/Requests/RequestPage'; // path as per your project

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RequestPage />
  </React.StrictMode>
);
