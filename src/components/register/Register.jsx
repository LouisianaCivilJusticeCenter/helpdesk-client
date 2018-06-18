/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

import React, { PropTypes } from 'react';
import Validation from 'react-validation';
import { browserHistory } from 'react-router';
import validator from 'validator';
import _ from 'underscore';
import axios from 'axios';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import DatePicker from 'react-datepicker';
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
 
const genderOptions = [
  'Male', 'Female', 'N/A'
];
const genderDefaultOptions = genderOptions[0];

const raceOptions = [
  'Black', 'Hispanic/Latino', 'White', 'Asian', 'Pacific Islander','Native American', 'Multiracial', 'Other'
];
const raceDefaultOptions = raceOptions[0];

const incomeOptions = [
  'Employment', 'SSI', 'Disability', 'Child/Spousal support', 'Unemployment','Veteran\'s benefits','Retirement', 'None', 'Other'
];
const incomeDefaultOptions = incomeOptions[0];




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
//
class Register extends React.Component {
  constructor(props) {
    super(props);

    var deleteCookie = function delete_cookie(name) {
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.createUser = this.createUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      chatting: false
    };
    this._onSelectGender = this._onSelectGender.bind(this);
    this._onSelectRace = this._onSelectRace.bind(this);
    this._onSelectIncome = this._onSelectIncome.bind(this);

    deleteCookie("driftt_sid");
    deleteCookie("driftt_aid");
    deleteCookie("driftt_eid");
    deleteCookie("DFTT_LEAD_HAS_PREV_IDENTIFIED");

  }

  _onSelectGender (option) {
    console.log('You selected ', option.label)
    this.setState({selectedGender: option})
  }

  _onSelectRace (option) {
    console.log('You selected ', option.label)
    this.setState({selectedRace: option})
  }

  _onSelectIncome (option) {
    console.log('You selected ', option.label)
    this.setState({selectedIncome: option})
  }

 set_cookie(name, value) {
  document.cookie = name +'='+ value +'; Path=/;';
}


handleAlternate(event) {
    var deleteCookie = function delete_cookie(name) {
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    event.preventDefault();
    console.log("close");
    sessionStorage.clear();
    localStorage.clear();
    deleteCookie("driftt_sid");
    deleteCookie("driftt_aid");
    deleteCookie("driftt_eid");
    deleteCookie("DFTT_LEAD_HAS_PREV_IDENTIFIED");
    window.location = '/'

}


 

  onSubmit(e) {
    e.preventDefault();

    this.setState({ chatting: true });
    this.props.location.state = "chatting";

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
                placeholder="Birth Date"
                name="birth_date"
                validations={[]}
              />
            </div>

            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Address"
                name="address"
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
                <Dropdown options={genderOptions} onChange={this._onSelectGender} value={this.state.selectedGender} placeholder="Gender" />
            </div>
            <div className="form-group">
                <Dropdown options={raceOptions} onChange={this._onSelectRace} value={this.state.selectedRace} placeholder="Race" />
            </div>
            <div className="form-group">
              <Validation.components.Input
                className="form-control"
                value=""
                placeholder="Monthly Income"
                name="income"
                validations={[]}
              />
            </div>
            <div className="form-group">
                <Dropdown options={incomeOptions} onChange={this._onSelectIncome}  value={this.state.selectedIncome}  placeholder="Income source" />
            </div>

            <div className="form-group">
              { ! this.state.chatting ? <Validation.components.Button className="btn btn-default btn-block" > Start Chat</Validation.components.Button> : null }

              { this.state.chatting ?  <Validation.components.Button className="btn btn-danger btn-block" onClick={this.handleAlternate.bind(this)}> End Chat</Validation.components.Button> : null }
             
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
