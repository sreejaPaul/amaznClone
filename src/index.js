import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
