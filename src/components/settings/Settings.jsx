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
  zip: {
    rule: value => value.length === 5,
    hint: value => <span className="form-error is-visible">{value} Must be 5 Characters.</span>,
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
      dobInputType: 'text',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.removeApiError = this.removeApiError.bind(this);
    this.onDobInputFocus = this.onDobInputFocus.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  onSubmit(event) {
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
      householdSize: event.target.householdSize.value,
    };
    data = JSON.stringify(data);
    this.updateSettings(data);
  }

  onDobInputFocus() {
    this.setState({ dobInputType: 'date' });
  }

  removeApiError() {
    this.form.hideError('username');
  }

  updateSettings(data) {
    const token = localStorage.getItem('token');

    $.ajax({
      type: 'PUT',
      url: `/v1/users?access_token=${token}`,
      contentType: 'application/json',
      data,
      success: res => this.sendEmail(res),
      error: err => console.error(err),
      dataType: 'json',
    });
  }

  sendEmail(res) {
    console.log('send email hit');
    const id = res.data[0].id;
    fetch(`/v1/mailer/${id}?type=newChat`, {
      method: 'POST',
    }).then(() => {
      console.warn('email send success');
      browserHistory.push(`chat/${id}`);
    }).catch((err) => {
      console.error(err, 'there was an error');
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-offset-4 col-md-4 text-center">
          <h3>Tell Me About Yourself</h3>
          <Validation.components.Form ref={c => { this.form = c; }} onSubmit={this.onSubmit}>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Date Of Birth"
                onFocus={this.onDobInputFocus}
                name="dob"
                type={this.state.dobInputType}
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Home Address"
                name="street"
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="City"
                name="city"
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value="Louisiana"
                name="state"
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Zipcode"
                type="number"
                title="5 to 10 characters"
                name="zip"
                validations={['required', 'zip']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Monthly household income"
                type="number"
                name="income"
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Number of Adults/Minors in your Household"
                type="number"
                name="householdSize"
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Select
                className="form-control"
                value=""
                name="gender"
                validations={['required']}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Validation.components.Select>

            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Race/Ethnicity"
                name="race"
                validations={['required']}
              />
            </div>
            <div className="form-group">
              <Validation.components.Select
                className="form-control"
                value=""
                name="veteran"
                validations={['required']}
              >
                <option value="">Are you a veteran?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Validation.components.Select>
            </div>
            <div className="form-group">
              <Validation.components.Button
                className="btn btn-default btn-block"
              >Login & Chat</Validation.components.Button>
            </div>
          </Validation.components.Form>
        </div>
      </div>
    );
  }
}

export default Settings;
