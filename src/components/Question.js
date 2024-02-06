import React, { useEffect, useState } from "react";

function Question({ question, onAnswered, setQuestions }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      // Example: Updating questions in the Question component
      if (setQuestions) {
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          {
            id: 999,
            prompt: "New question",
            answers: ["A", "B", "C", "D"],
            correctIndex: 2,
          },
        ]);
      }
    }
  }, [timeRemaining, onAnswered, setQuestions]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
