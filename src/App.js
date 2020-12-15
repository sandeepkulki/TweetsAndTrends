import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import TweetsComponent from './components/TweetsComponent';
import TrendsComponent from './components/TrendsComponent';
import NotFound from './components/NotFound';
import HomeComponent from './components/HomeComponent';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/tweets" component={TweetsComponent} />
            <Route path="/trends" component={TrendsComponent} />
            <Route exact path="/" component={HomeComponent} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;