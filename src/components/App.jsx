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
      localStorage.clear();
      replace('sign-in');
    } else {
      next();
    }
  }

  requireSuperAuth(nextState, replace, next) {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token || !id) {
      console.warn('no token or id in super auth');
      replace('sign-in');
    } else {
      next();
    }
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
          <Route path="admin" onEnter={this.requireAuth} component={AdminContainer} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}

export default App;
