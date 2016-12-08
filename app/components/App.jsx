import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Home from './home/Home.jsx';
import NotFound from './NotFound.jsx';
import SignIn from './SignIn.jsx';
import FlowContainer from './flow/FlowContainer.jsx';
import Register from './register/Register.jsx';
import MainContainer from './MainContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace, next) {
    fetch('/api/v1/auth/verify', { credentials: 'include' })
    .then(res => res.json())
    .then((data) => {
      if (data.name) {
        localStorage.setItem('user.name', data.name);
        localStorage.setItem('user.id', data.id);
      } else {
        localStorage.clear();
        replace('sign-in');
      }
    })
    .then(() => next())
    .catch(err => console.error(err));
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={MainContainer}>
          <IndexRoute component={Home} />
          <Route path="sign-in" component={SignIn} />
          <Route path="flow/:issue" component={FlowContainer} />
          <Route path="register" component={Register} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}

export default App;
