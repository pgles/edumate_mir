import React from 'react';
import './App.css';
import {compose} from 'recompose';
import { withFirebase } from './firebase/withFirebase';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import Main from './Components/Main';
import {connect} from 'react-redux';
import { Firebase } from './firebase';
import {fetchUser} from './redux';
import {Login} from './Components/Login';

const mapDispatchToProps = (dispatch: any) => ({
  fetchUser : () => {dispatch(fetchUser())}
});

const mapStateToProps = (state: any) => {
	return {
    user: state.user
  }
};

class App extends React.Component<any>{
  constructor(props:any) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Main firebase={Firebase} />}/>
      <Route exact path={'/login'} component={Login} />
    </Switch>
    </BrowserRouter>
  );
}
}

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
