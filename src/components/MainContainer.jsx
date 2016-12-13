  // TODO: if you click the logo while logged in send user to dashboard
import React, { PropTypes } from 'react';
import Header from './Header.jsx';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.signOut = this.signOut.bind(this);
  }


  getChildContext() {
    return {
      user: this.state.user,
    };
  }

  componentDidMount() {
    // fetch('/api/v1/auth/verify', { credentials: 'include' })
    // .then(res => res.json())
    // .then((data) => {
    //   if (data.name) {
    //     localStorage.setItem('user.name', data.name);
    //     localStorage.setItem('user.id', data.id);
    //     this.setState({ user: data });
    //   } else {
    //     localStorage.clear();
    //     this.setState({ user: null });
    //   }
    // })
    // .catch(err => console.error(err));
    this.setState({ user: null });
  }

  signOut() {
    fetch('/api/v1/auth/logout', { credentials: 'include' })
    .catch(err => console.warn(err))
    .then(() => localStorage.clear())
    .then(() => this.setState({ user: null }));
  }

  render() {
    return (
      <div>
        <Header signOut={this.signOut} user={this.state.user} />
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = { children: React.PropTypes.object };

MainContainer.childContextTypes = {
  user: PropTypes.object,
};

export default MainContainer;
