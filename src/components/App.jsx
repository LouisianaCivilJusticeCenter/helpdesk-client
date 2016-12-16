import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './home/Home.jsx';
import NotFound from './NotFound.jsx';
import SignIn from './SignIn.jsx';
import FlowContainer from './flow/FlowContainer.jsx';
import Register from './register/Register.jsx';
import Settings from './settings/Settings.jsx';
import MainContainer from './MainContainer.jsx';
import AdminContainer from './admin/AdminContainer.jsx';
import ClientChatContainer from './clientChat/ClientChatContainer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
    this.requireSuperAuth = this.requireSuperAuth.bind(this);
  }

  requireAuth(nextState, replace, next) {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token || !id) {
      replace('sign-in');
    }
    // console.log(token);

    fetch(`/v1/users/${id}?access_token=${token}`)
      .then(res => res.json())
      .then((data) => {
        if (data.meta.error) {
          localStorage.clear();
          replace('sign-in');
        } else {
          // localStorage.setItem('user.name', data.name);
          // localStorage.setItem('user.id', data.id);
        }
      })
      .then(() => next())
      .catch((err) => {
        console.error(err);
        replace('sign-in');
      });
  }

  requireSuperAuth(nextState, replace, next) {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token || !id) {
      // console.log('no token or id in super auth');
      localStorage.clear();
      replace('sign-in');
    }

    fetch(`/v1/users/${id}?access_token=${token}`)
      .then(res => res.json())
      .then((data) => {
        if (data.meta.error || data.data.id !== 1) {
          replace('sign-in');
        }
      })
      .then(() => next())
      .catch((err) => {
        console.error(err);
        replace('sign-in');
      });
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainContainer}>
          <IndexRoute component={Home} />
          <Route path="sign-in" component={SignIn} />
          <Route path="flow/:issue" component={FlowContainer} />
          <Route path="register/:title" component={Register} />
          <Route path="chat/:id" onEnter={this.requireAuth} component={ClientChatContainer} />
          <Route path="settings" onEnter={this.requireAuth} component={Settings} />
          <Route path="admin" onEnter={this.requireSuperAuth} component={AdminContainer} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}

export default App;
