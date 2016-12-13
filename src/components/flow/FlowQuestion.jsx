/* eslint max-len: 0 */
import React, { PropTypes } from 'react';

const FlowQuestion = ({ renderChatButton, success, error, answer, onNo, onYes, handleBack }) => (
  <div>
    <div className="row">
      {!answer.prev ?
        <div>
          <h2>
            We need you to answer some questions first to see what level of support you're eligible to recieve
          </h2>
          <h3>
            (it takes 5 minutes)
          </h3>
        </div>
        :
        null
      }
      {!error.length ?
        <div>
          <h3>{answer.question.text}</h3>
          <button
            type="button"
            onClick={onYes}
            className="btn btn-default"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onNo}
            className="btn btn-default"
          >
            No
          </button>
        </div>
        :
        <h3>{error}</h3>
      }
    </div>
    <div>
      {success ? renderChatButton() : null}
      {answer.prev ?
        <button
          type="button"
          onClick={handleBack}
          className="btn btn-default"
        >
          <span
            className="glyphicon glyphicon-menu-left"
            aria-hidden="true"
          />
          back
        </button>
        :
        null
      }
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
