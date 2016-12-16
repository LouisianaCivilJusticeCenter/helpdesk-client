/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React, { PropTypes } from 'react';
import Validation from 'react-validation';
import { browserHistory } from 'react-router';
import validator from 'validator';
import $ from 'jquery';

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
    this.state = {
      firstName: '',
      lastName: '',
      registered: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.removeApiError = this.removeApiError.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let data = {
      first_name: event.target.firstName.value,
      last_name: event.target.lastName.value,
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value,
      category: this.props.params.title,
    };
    let tokenData = {
      grant_type: 'password',
      username: data.username,
      password: data.password,
    };
    data = JSON.stringify(data);
    tokenData = JSON.stringify(tokenData);
    const tokenSuccess = (res) => {
      console.warn(res.data, 'this is res.data token success');
      console.warn(res.data[0].access_token, 'this is res in token success');
      localStorage.setItem('token', res.data[0].access_token);
      localStorage.setItem('id', res.data[0].user_id);
      localStorage.setItem('username', res.data[0].username);

      browserHistory.push('/settings');
    };

    const success = (res) => {
      console.warn(res.data, 'this is res.data success');
      $.ajax({
        type: 'POST',
        url: '/v1/access_tokens',
        contentType: 'application/json',
        data: tokenData,
        success: tokenSuccess,
        dataType: 'json',
      });
    };
    $.ajax({
      type: 'POST',
      url: '/v1/users',
      contentType: 'application/json',
      data,
      success,
      dataType: 'json',
    });
  }

  removeApiError() {
    this.form.hideError('username');
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-2 text-center">
          <Validation.components.Form ref={c => { this.form = c; }} onSubmit={this.onSubmit}>
            <h3>We need to collect some basic information first.</h3>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="First Name"
                name="firstName"
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Last Name"
                name="lastName"
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
                placeholder="Email"
                name="email"
                validations={['required', 'email']}
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
