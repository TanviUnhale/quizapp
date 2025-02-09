import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Timer from "./components/Timer";

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [darkMode, setDarkMode] = useState(false); 
  const [quizStarted, setQuizStarted] = useState(false); 

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await fetch("/Uw5CrX"); 
      if (!response.ok) throw new Error("API response not OK");
      const data = await response.json();
      setQuizData(data.questions || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setQuizData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  const handleSubmit = () => {
    let currentScore = 0;

    quizData.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.id];
      const correctOption = question.options.find((option) => option.is_correct);

      if (selectedAnswer === correctOption.description) {
        currentScore += 4;
      } else if (selectedAnswer) {
        currentScore -= 1;
      }
    });

    setScore(Math.max(0, currentScore));
    setQuizFinished(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  return (
    <div className={`quiz-container ${darkMode ? "dark-mode" : ""}`}>
      <button className="toggle-dark-mode" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {!quizStarted ? ( 
        <div>
          <h1>Welcome to the Quiz!</h1>
          <button onClick={() => setQuizStarted(true)} className="start-button">
            Start Quiz
          </button>
        </div>
      ) : (
        <>
          <h1>{loading ? "Loading quiz..." : "Quiz: Genetics and Evolution"}</h1>

          {quizFinished ? (
            <div className="score-container">
              <h2>Quiz Completed!</h2>
              <h3>Your Final Score: {score}</h3>
              <button onClick={() => window.location.reload()}>Restart Quiz</button>
            </div>
          ) : (
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <Question
                    question={quizData[currentQuestionIndex]?.description}
                    answers={quizData[currentQuestionIndex]?.options}
                    onAnswerSelection={(selectedAnswer) =>
                      handleOptionChange(quizData[currentQuestionIndex]?.id, selectedAnswer)
                    }
                  />
                  <div>
                    <Timer onTimeUp={handleTimeUp} />
                    <button onClick={handleNextQuestion} disabled={loading}>
                      Next Question
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
