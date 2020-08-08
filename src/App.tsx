import React from 'react';
import logo from './logo.svg';
import './App.css';
import {compose} from 'recompose';
import { withFirebase } from './firebase/withFirebase';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './Components/Main';
import { Firebase } from './firebase';


function App() {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Main firebase={Firebase} />}/>
      </Switch>
    </BrowserRouter>
  );
}

export default compose(
  withFirebase
  //connect redux store here
)(App);
