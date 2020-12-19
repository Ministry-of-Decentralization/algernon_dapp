import React, { Component } from "react";
import {Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { DrizzleProvider } from "drizzle-react";
// import { LoadingContainer } from "drizzle-react-components";
import Overview from './components/pages/Overview'
import Tags from './components/pages/Tags'
import Tag from './components/pages/Tag'
import Profile from './components/pages/Profile'
import Topic from './components/pages/Topic'
import Topics from './components/pages/Topics'
import Users from './components/pages/Users'
import About from './components/pages/About'
import Admin from './components/pages/Admin'

import "./App.css";
import theme from './theme.js'
import WalletProvider from "./components/providers/WalletProvider";
import FileStoreProvider from "./components/providers/FileStoreProvider";

// import drizzleOptions from "./drizzleOptions";
// import MyContainer from "./MyContainer";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <WalletProvider>
          <FileStoreProvider>
            <Switch>
              <Route exact path='/' component={Overview} />
              <Route exact path='/admin' component={Admin} />
              <Route exact path='/about' component={About} />
              <Route exact path='/tags' component={Tags} />
              <Route exact path='/tags/:id' component={Tag} />
              <Route exact path='/profile/:address' component={Profile} />
              <Route exact path='/topic/:id' component={Topic} />
              <Route exact path='/topics' component={Topics} />
              <Route exact path='/users' component={Users} />
            </Switch>
          </FileStoreProvider>
        </WalletProvider>
      </MuiThemeProvider>

    );
  }
}

export default App;
