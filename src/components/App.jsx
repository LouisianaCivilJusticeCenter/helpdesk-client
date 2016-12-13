import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './home/Home.jsx';
import NotFound from './NotFound.jsx';
import SignIn from './SignIn.jsx';
import FlowContainer from './flow/FlowContainer.jsx';
import Register from './register/Register.jsx';
import Settings from './settings/Settings.jsx';
import MainContainer from './MainContainer.jsx';
import Chat from './chat/Chat.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace, next) {
    const token = localStorage.getItem('token');
    console.log(token);

    fetch(`/v1/users?access_token=${token}`)
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
    .catch(() => replace('sign-in'));
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainContainer}>
          <IndexRoute component={Home} />
          <Route path="sign-in" component={SignIn} />
          <Route path="flow/:issue" component={FlowContainer} />
          <Route path="register" component={Register} />
          <Route path="chat/:id" component={Chat} />
          <Route path="settings" onEnter={this.requireAuth} component={Settings} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    );
  }
}

export default App;
