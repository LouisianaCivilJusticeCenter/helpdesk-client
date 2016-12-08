import React, { PropTypes, Component } from 'react';
import FlowQuestion from './FlowQuestion.jsx';

class Flow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.issue.question,
      prevQuestion: {},
      error: '',
      success: false,
    };
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.renderChatButton = this.renderChatButton.bind(this);
  }

  handleYes() {
    this.setState({ prevQuestion: this.state.question });
    if (this.state.question.yes.success) {
      this.setState({ success: true });
    } else if (!this.state.question.yes.error) {
      this.setState({ question: this.state.question.yes.question });
    } else {
      this.setState({ error: this.state.question.yes.error });
    }
  }

  handleNo() {
    this.setState({ prevQuestion: this.state.question });
    if (this.state.question.no.success) {
      this.setState({ success: true });
    } else if (!this.state.question.no.error) {
      this.setState({ question: this.state.question.no.question });
    } else {
      this.setState({ error: this.state.question.no.error });
    }
  }

  handleBack() {
    const prev = this.state.question;
  }

  renderChatButton() {
    return (
      <button className="btn btn-default btn-lg btn-block">Chat Now</button>
    );
  }

  render() {
    return (
      <div>
        {/* <h1>{this.props.issue.title}</h1> */}
        <FlowQuestion
          question={this.state.question}
          onNo={this.handleNo}
          onYes={this.handleYes}
          error={this.state.error}
          renderChatButton={this.renderChatButton}
          success={this.state.success}
        />
      </div>
    );
  }
}

Flow.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default Flow;
