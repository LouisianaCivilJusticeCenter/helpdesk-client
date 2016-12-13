  // TODO: if you click the logo while logged in send user to dashboard
import React, { PropTypes } from 'react';
import Header from './Header.jsx';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    console.log(token);
    fetch(`/v1/access_tokens?access_token=${token}`)
    .then(res => res.json())
    .then((data) => {
      console.log(data, 'this is data');
      if (data.meta.error) {
        localStorage.clear();
      } else {
        console.log(data.data[0], 'this is data[0]');
        console.log(data.data[0].user_id, 'this is dat.userid');
        localStorage.setItem('user_id', data.data[0].user_id);
      }
    })
    .catch(err => console.error(err));
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
        <Header signOut={this.signOut} />
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = { children: React.PropTypes.object };

export default MainContainer;
