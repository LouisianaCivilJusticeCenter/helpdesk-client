import React, { PropTypes } from 'react';

const FlowQuestion = ({ renderChatButton, success, error, answer, onNo, onYes, handleBack }) => (
  <div>
    <div className="row">
      {!error.length ?
        <div>
          <h3>{answer.question.text}</h3>
          <button type="button" onClick={onYes}>Yes</button>
          <button type="button" onClick={onNo}>No</button>
        </div>
        :
        <h3>{error}</h3>
      }
    </div>
    <div>
      {answer.prev ?
        <button type="button" onClick={handleBack}>back</button>
        :
        null
      }

      {success ? renderChatButton() : null}
    </div>
  </div>
);

FlowQuestion.propTypes = {
  answer: PropTypes.object,
  onNo: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
  renderChatButton: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  handleBack: PropTypes.func.isRequired,
};

export default FlowQuestion;
