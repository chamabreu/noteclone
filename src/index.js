import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === "production"
  ? 'https://api.simplenote.jmbcode.de'
  : ""

axios.defaults.withCredentials = true


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('reactRoot')
);
