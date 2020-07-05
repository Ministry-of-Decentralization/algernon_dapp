import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks';
import { BaseStyles } from "rimble-ui";
import { ThemeProvider } from "styled-components";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import apolloClient from './utils/apolloClient'
import algernonTheme from './theme'
require('dotenv').config()


ReactDOM.render((
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <ThemeProvider theme={algernonTheme}>
        <BaseStyles>
          <App />
        </BaseStyles>
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>),
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
