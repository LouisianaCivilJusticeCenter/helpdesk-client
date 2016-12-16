/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import Validation from 'react-validation';
import { browserHistory } from 'react-router';
import $ from 'jquery';

Object.assign(Validation.rules, {
  required: {
    rule: value => value.toString().trim(),
    hint: () => <span className="form-error is-visible">Required</span>,
  },
  api: {
    hint: value => (
      <button className="form-error is-visible">
        API Error on "{value}" value. Focus to hide.
      </button>
    ),
  },
});

class SignIn extends React.Component {
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

    let tokenData = {
      grant_type: 'password',
      username: event.target.username.value,
      password: event.target.password.value,
    };
    tokenData = JSON.stringify(tokenData);
    const tokenSuccess = (res) => {
      console.warn(res.data[0].access_token, 'this is res in token success');
      console.warn(res.data[0], 'this is res.data in token success');
      localStorage.setItem('token', res.data[0].access_token);
      localStorage.setItem('id', res.data[0].user_id);
      localStorage.setItem('username', res.data[0].username);
      if (res.data[0].user_id === 1) {
        browserHistory.push('/admin');
      } else {
        browserHistory.push('/settings');
      }
    };
    // TODO: Add AJAX error handling
    $.ajax({
      type: 'POST',
      url: '/v1/access_tokens',
      contentType: 'application/json',
      data: tokenData,
      success: tokenSuccess,
      error: (err) => { console.error('error signing in', err); },
      dataType: 'json',
    });
  }

  removeApiError() {
    this.form.hideError('username');
  }

  render() {
    return (
      <Validation.components.Form ref={c => { this.form = c; }} onSubmit={this.onSubmit}>
        <h3>Log In</h3>
        <div>
          <label>
            Username*
            <Validation.components.Input
              value=""
              placeholder="JohnDoe"
              name="username"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <label>
            Password*
            <Validation.components.Input
              type="password"
              value=""
              placeholder="******"
              name="password"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <Validation.components.Button>Submit</Validation.components.Button>
        </div>
      </Validation.components.Form>
    );
  }
}

export default SignIn;
