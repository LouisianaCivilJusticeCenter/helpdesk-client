/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Link } from 'react-router';

class Divorce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resident: '-',
      children: '-',
      seperate1: '-',
      seperate6: '-',
      error: {
        resident: null,
        seperate: null,
      },
    };
    this.renderSeperate = this.renderSeperate.bind(this);
    this.handleChangeResident = this.handleChangeResident.bind(this);
    this.handleChangeChildren = this.handleChangeChildren.bind(this);
    this.handleChangeSeperate1 = this.handleChangeSeperate1.bind(this);
    this.handleChangeSeperate6 = this.handleChangeSeperate6.bind(this);
  }

  handleChangeResident(event) {
    const error = 'You are not eligible for a 103.1 Divorce in Louisiana because you are not a resident.';
    return event.target.value === 'yes' ?
      this.setState({ resident: event.target.value, error: { resident: null } })
      :
      this.setState({
        resident: event.target.value,
        children: '-',
        seperate1: '-',
        seperate6: '-',
        error: { resident: error } });
  }
  handleChangeChildren(event) {
    return event.target.value === 'yes' ?
      this.setState({
        children: event.target.value,
        seperate1: '-',
        seperate6: '-',
        error: { seperate: null },
      })
      :
      this.setState({
        children: event.target.value,
        seperate1: '-',
        seperate6: '-',
        error: { seperate: null },
      });
  }
  handleChangeSeperate1(event) {
    const error = 'You are not eligible for a 103.1 divorce b/c you do not meet the separation time.';
    return event.target.value === 'yes' ?
      this.setState({ seperate1: event.target.value, error: { seperate: null } })
      :
      this.setState({ seperate1: event.target.value, error: { seperate: error } });
  }
  handleChangeSeperate6(event) {
    const error = 'You are not eligible for a 103.1 divorce b/c you do not meet the separation time.';
    return event.target.value === 'yes' ?
      this.setState({ seperate6: event.target.value, error: { seperate: null } })
      :
      this.setState({ seperate6: event.target.value, error: { seperate: error } });
  }

  renderSubmit() {
    const submitText = 'You are eligible for online assistance through this kiosk. Create your user profile and access free legal chat and documents HERE';
    return this.state.seperate6 === 'yes' || this.state.seperate1 === 'yes' ?
      // <button type="button" value={submitText} />
      <Link to="/register">{submitText}</Link>
      :
      null;
  }

  renderSeperate() {
    return this.state.children === 'yes' ?
      <div>
        <label htmlFor="seperate1">
          Have you been living apart for 1 year?
          <select value={this.state.seperate1} onChange={this.handleChangeSeperate1}>
            <option value="">-</option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </label>
      </div>
    :
      <div>
        <label htmlFor="seperate6">
          Have you been living apart for 6 months?
          <select value={this.state.seperate6} onChange={this.handleChangeSeperate6}>
            <option value="">-</option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </label>
      </div>;
  }

  render() {
    const title = 'Divorce Flow Chart';
    return (
      <div>
        <div>
          <h1>{title}</h1>
        </div>
        <form>
          <div>
            <label htmlFor="resident">
              Have you resided in Louisiana for at least 6 months?
              <select value={this.state.resident} onChange={this.handleChangeResident}>
                <option value="">-</option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </label>
          </div>
          {this.state.error.resident ?
            <div>{this.state.error.resident}</div>
            :
            <div>
              <label htmlFor="children">
                Do you have minor children with your spouse
                <select value={this.state.children} onChange={this.handleChangeChildren}>
                  <option value="">-</option>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                </select>
              </label>
            </div>
          }
          {this.state.children !== '-' ? this.renderSeperate() : null}
          {this.state.error.seperate}
          {this.renderSubmit()}
        </form>
        <div>
          You may speak to an intake specialist and obtain legal information,
          advice, and referrals by calling our hotline at 1-800-310-7029
        </div>
      </div>
    );
  }
}

export default Divorce;
