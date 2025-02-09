import React from 'react';

const Question = ({ question, answers, onAnswerSelection }) => {
  if (!question || !answers || !Array.isArray(answers) || answers.length === 0) {
    return <div className="error-message">Invalid question data or answers</div>;
  }

  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="answer-options">
        {answers.map((answer, index) => (
          <button
            key={index}
            className="answer-button"
            onClick={() => onAnswerSelection(answer.description)}
          >
            {answer.description}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
