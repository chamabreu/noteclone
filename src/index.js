import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import axios from 'axios'
import StateManager from './Context/StateManager';

/* AXIOS SETTINGS */
/* Switch URL of API for DEV or PROD */
axios.defaults.baseURL = process.env.NODE_ENV === "production"
  ? 'https://api.simplenote.jmbcode.de'
  : ""
axios.defaults.withCredentials = true






/* REACT RENDER */
ReactDOM.render(

  /* Router */
  <BrowserRouter>

    {/* State Context - hold all states used in App */}
    <StateManager>

      {/* The main App */}
      <App />

    </StateManager>
  </BrowserRouter>,

  /* Render to specified html-element by ID */
  document.getElementById('reactRoot')
);
