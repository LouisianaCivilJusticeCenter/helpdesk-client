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
  email: {
    rule: value => validator.isEmail(value),
    hint: value => <span className="form-error is-visible">{value} isnt an Email.</span>,
  },
  password: {
    rule: (value, components) => {
      const password = components.password.state;
      const passwordConfirm = components.passwordConfirm.state;
      const isBothUsed = password
          && passwordConfirm
          && password.isUsed
          && passwordConfirm.isUsed;
      const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

      if (!isBothUsed || !isBothChanged) {
        return true;
      }

      return password.value === passwordConfirm.value;
    },
    hint: () => <span className="form-error is-visible">Passwords should be equal.</span>,
  },
  phone: {
    rule: value => validator.isMobilePhone(value, 'en-US'),
    hint: value => <span className="form-error is-visible">{value} not a valid US Phone.</span>,
  },
  api: {
    hint: value => (
      <button className="form-error is-visible">
        API Error on "{value}" value. Focus to hide.
      </button>
    ),
  },
});

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeApiError = this.removeApiError.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const data = _.chain(e.target)
      .reduce((memo, { name, value }) => Object.assign({ [name]: value }, memo), {})
      .omit('passwordConfirm', '')
      .value();
    data.category = this.props.params.title;
    const tokenData = {
      grant_type: 'password',
      username: data.username,
      password: data.password,
    };

    this.createUser(data, tokenData);
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

  removeApiError() {
    this.form.hideError('username');
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
                placeholder="Username"
                name="username"
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
            {/* TODO:  Do we want email validations? Was told no */}
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
              <Validation.components.Input
                className="form-control"
                type="password"
                value=""
                placeholder="Password"
                name="password"
                validations={['required', 'password']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                type="password"
                value=""
                placeholder="Confirm Password"
                name="passwordConfirm"
                validations={['required', 'password']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Button
                className="btn btn-default btn-block"
              >
                Next
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
