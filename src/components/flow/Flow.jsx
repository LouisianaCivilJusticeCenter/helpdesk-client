import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import FlowQuestion from './FlowQuestion.jsx';

class Flow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: this.props.issue,
      prevQuestion: {},
      error: '',
      success: false,
    };
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.renderChatButton = this.renderChatButton.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleYes() {
    const { question } = this.state.answer;
    const curr = this.state.answer;
    if (question.yes.success) {
      this.setState({ success: true });
    } else if (!question.yes.error) {
      const next = question.yes;
      next.prev = curr;
      this.setState({ answer: next });
    } else {
      const next = question.yes;
      next.prev = curr;
      this.setState({ answer: next, error: question.yes.error });
    }
  }

  handleNo() {
    const { question } = this.state.answer;
    const curr = this.state.answer;
    this.setState({ prevQuestion: question });
    if (question.no.success) {
      this.setState({ success: true });
    } else if (!question.no.error) {
      const next = question.no;
      next.prev = curr;
      this.setState({ answer: next });
    } else {
      this.setState({ error: question.no.error });
    }
  }

  handleBack() {
    this.setState({ answer: this.state.answer.prev, error: '', success: false });
  }

  renderChatButton() {
    return (
      <div className="eligible">
        <p>You're eligible to receive free advice from an attorney via chat.
        We just need some basic information first.</p>
        <Link to={`/register/${this.props.issue.title.toLowerCase()}`}>
          <button
            className="btn btn-default btn-lg btn-block"
          >
            Register
          </button>
        </Link>
      </div>
    );
  }

  render() {
    const { answer, error, success } = this.state;
    return (
      <div className="flow-wrap">
        <div className="row">
          <div className="col-md-offset-3 col-md-6 text-center">
            <h1>{this.props.issue.title}</h1>
            <FlowQuestion
              answer={answer}
              onNo={this.handleNo}
              onYes={this.handleYes}
              error={error}
              renderChatButton={this.renderChatButton}
              success={success}
              handleBack={this.handleBack}
            />
          </div>
        </div>
      </div>
    );
  }
}

Flow.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default Flow;
