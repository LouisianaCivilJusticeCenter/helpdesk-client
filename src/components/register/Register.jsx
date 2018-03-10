/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

import React, { PropTypes } from 'react';
import Validation from 'react-validation';
import { browserHistory } from 'react-router';
import validator from 'validator';
import _ from 'underscore';
import axios from 'axios';

Object.assign(Validation.rules, {
  required: {
    rule: value => value.toString().trim(),
    hint: () => <span className="form-error is-visible">Required</span>,
  },
  phone: {
    rule: value => validator.isMobilePhone(value, 'en-US'),
    hint: value => <span className="form-error is-visible">{value} not a valid US Phone.</span>,
  },
});

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const data = _.chain(e.target)
      .reduce((memo, { name, value }) => Object.assign({ [name]: value }, memo), {})
      .omit('passwordConfirm', '')
      .value();
    data.category = this.props.params.title;
    console.log(data);
    //drift.api.widget.show()
    drift.api.sidebar.open()
    //drift.identify(data.first_name + "-" + data.last_name ,{email:data.email,phoneNumber:data.phone, category:data.category});
      drift.api.setUserAttributes({
    email: data.email,
    name: data.first_name + "-" + data.last_name,
    phoneNumber: data.phone

  })
  }

  createUser(data, tokenData) {
    axios.post('/v1/users', data)
      .then(() => this.loginUser(tokenData))
      .catch(error => console.error(error, 'Create user error'));
  }

  loginUser(tokenData) {
    axios.post('/v1/access_tokens', tokenData)
      .then(({ data: { data } }) => {
        localStorage.setItem('token', data[0].access_token);
        localStorage.setItem('id', data[0].user_id);
        localStorage.setItem('username', data[0].username);
        browserHistory.push('/settings');
      })
      .catch(error => console.error(error, 'Login User Error'));
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4 text-center">
          <Validation.components.Form ref={c => { this.form = c; }} onSubmit={this.onSubmit}>
            <h3>We need to collect some basic information first.</h3>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="First Name"
                name="first_name"
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Last Name"
                name="last_name"
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Phone"
                name="phone"
                validations={['required', 'phone']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Email"
                name="email"
                validations={[]}
              />
            </div>
            <div className="form-group">
              <Validation.components.Button
                className="btn btn-default btn-block"
              >
                Start Chat
              </Validation.components.Button>
            </div>
          </Validation.components.Form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  params: PropTypes.object.isRequired,
};

export default Register;
