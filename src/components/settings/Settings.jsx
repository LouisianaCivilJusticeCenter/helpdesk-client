/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';
import { browserHistory } from 'react-router';
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
  api: {
    hint: value => (
      <button className="form-error is-visible">
        API Error on "{value}" value. Focus to hide.
      </button>
    ),
  },
});

class Settings extends React.Component {
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
    const token = localStorage.getItem('token');
    event.preventDefault();

    let data = {
      dob: event.target.dob.value,
      street: event.target.street.value,
      city: event.target.city.value,
      state: event.target.state.value,
      zip: event.target.zip.value,
      income: event.target.income.value,
      gender: event.target.gender.value,
      race: event.target.race.value,
      veteran: event.target.veteran.value,
    };
    data = JSON.stringify(data);
    const success = (res) => {
      browserHistory.push(`chat/${res.data[0].user_id}`);
    };
    $.ajax({
      type: 'PUT',
      url: `/v1/users?access_token=${token}`,
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
      <Validation.components.Form ref={c => { this.form = c; }} onSubmit={this.onSubmit}>
        <h3>Settings</h3>
        <div>
          <label>
            <Validation.components.Input
              value=""
              placeholder="Date Of Birth"
              name="dob"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <label>
            <Validation.components.Input
              value=""
              placeholder="Home Address"
              name="street"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <label>
            <Validation.components.Input
              value=""
              placeholder="City"
              name="city"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <label>
            <Validation.components.Input
              value="Louisiana"
              name="state"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <label>
            <Validation.components.Input
              value=""
              placeholder="Zipcode"
              name="zip"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <label>
            <Validation.components.Input
              value=""
              placeholder="Monthly household income"
              name="income"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <label>
            <Validation.components.Input
              value=""
              placeholder="Gender"
              name="gender"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <label>
            <Validation.components.Input
              value=""
              placeholder="Race/Ethnicity"
              name="race"
              validations={['required']}
            />
          </label>
        </div>
        <div>
          <label>
            <Validation.components.Input
              value=""
              placeholder="Are You A Veteran"
              name="veteran"
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

export default Settings;
