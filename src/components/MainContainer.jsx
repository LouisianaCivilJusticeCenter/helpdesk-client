  // TODO: if you click the logo while logged in send user to dashboard
import React from 'react';
import Header from './Header.jsx';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    fetch(`/v1/access_tokens?access_token=${token}`)
    .then(res => res.json())
    .then((data) => {
      if (data.meta.error || !data.data.length) {
        localStorage.clear();
      } else {
        localStorage.setItem('id', data.data[0].user_id);
      }
    })
    .catch(err => console.error(err));
  }

  signOut() {
    const token = localStorage.getItem('token');
    fetch(`/v1/access_tokens?access_token=${token}`, {
      method: 'DELETE',
    }).then(() => {
      // console.log(res);
      localStorage.clear();
      window.location = `${window.location.origin}`;
    }).catch((err) => {
      localStorage.clear();
      console.error(err);
      window.location = `${window.location.origin}`;
    });
  }

  render() {
    return (
      <div>
        <Header signOut={this.signOut} />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = { children: React.PropTypes.object };

export default MainContainer;
