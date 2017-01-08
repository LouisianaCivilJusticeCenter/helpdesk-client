import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './home/Home.jsx';
import NotFound from './NotFound.jsx';
import AfterHours from './AfterHours.jsx';
import SignIn from './SignIn.jsx';
import FlowContainer from './flow/FlowContainer.jsx';
import Register from './register/Register.jsx';
import Settings from './settings/Settings.jsx';
import MainContainer from './MainContainer.jsx';
import AdminContainer from './admin/AdminContainer.jsx';
import ClientChatContainer from './clientChat/ClientChatContainer.jsx';
import Webster from './resources/Webster.jsx';
import Concordia from './resources/Concordia.jsx';
import Iberia from './resources/Iberia.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
    this.requireAuthAndTime = this.requireAuthAndTime.bind(this);
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

  requireAuthAndTime(nextState, replace, next) {
    const time = new Date().getHours();
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token || !id) {
      localStorage.clear();
      replace('sign-in');
    } else if (time > 16 || time < 9) {
      replace('afterHours');
    } else {
      next();
    }
  }


  render() {
    // onEnter={this.requireAuthAndTime}
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainContainer}>
          <IndexRoute component={Home} />
          <Route path="webster" component={Webster} />
          <Route path="concordia" component={Concordia} />
          <Route path="iberia" component={Iberia} />
          <Route path="sign-in" component={SignIn} />
          <Route path="flow/:issue" component={FlowContainer} />
          <Route path="register/:title" component={Register} />
          <Route
            path="chat/:id"
            component={ClientChatContainer}
          />
          <Route path="settings" onEnter={this.requireAuth} component={Settings} />
          <Route path="admin" onEnter={this.requireAuth} component={AdminContainer} />
          <Route path="afterHours" component={AfterHours} />
          <Route path="*" component={NotFound} />

        </Route>
      </Router>
    );
  }
}

export default App;
