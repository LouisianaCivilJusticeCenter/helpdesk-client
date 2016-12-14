  // TODO: if you click the logo while logged in send user to dashboard
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Header from './Header.jsx';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    console.log(token, 'token in compontent did mount');
    fetch(`/v1/access_tokens?access_token=${token}`)
    .then(res => res.json())
    .then((data) => {
      console.log(data, 'this is data');
      if (data.meta.error || !data.data.length) {
        localStorage.clear();
      } else {
        console.log(data.data[0], 'this is data[0]');
        console.log(data.data[0].user_id, 'this is dat.userid');
        localStorage.setItem('id', data.data[0].user_id);
      }
    })
    .catch(err => console.error(err));
  }

  signOut() {
    console.log('signOut');
    const token = localStorage.getItem('token');
    console.log('token before signout', token);
    fetch(`/v1/access_tokens?access_token=${token}`, {
      method: 'DELETE',
    }).then(res => {
      console.log(res);
      localStorage.clear();
      browserHistory.push('/');
    }).catch((err) => {
      localStorage.clear();
      browserHistory.push('/');
      console.error(err);
    });
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
