/* eslint max-len: 0 */

import React from 'react';
import { Link } from 'react-router';
import FlowQuestion from '../flow/FlowQuestion.jsx';

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
    const questions = {
      question: {
        text: 'Have you or your spouse filed for a divorce?',
        yes: {
          error: 'Due to Legal Ethics Concerns...call hotline',
        },
        no: {
          question: {
            text: 'Do you have any minor children of the marriage?',
            yes: {
              question: {
                text: 'Have you been living seperate and apart for 365 days?',
                yes: {
                  question: {
                    text: 'Do you have any community property that needs to be divided?',
                  },
                },
                no: {
                  error: 'Please call hotline',
                },
              },
            },
            no: 'Have you been living seperate and apart for 180 days?',
          },
        },
      },
    };
    return (
      <div>
        <FlowQuestion title={title} />
      </div>
    );
  }
}

export default Divorce;
