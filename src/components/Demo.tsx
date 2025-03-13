import { useState, useEffect, useRef } from 'react';
import sdk from '@farcaster/frame-sdk';
import Button from './Button';
import Confetti from 'react-confetti';

export default function LanguageGame({ title }: { title?: string } = { title: "Translate Game" }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState<{ word: string; chosen: string; correct: string }[]>([]);
  const maxRounds = 10;
  const resultRef = useRef(null);

  const appUrl = process.env.NEXT_PUBLIC_URL;

  const [remainingQuestions, setRemainingQuestions] = useState([
    { word: "Bonjour", options: ["Hello", "Goodbye"], answer: "Hello" },
    { word: "Gracias", options: ["Thank you", "Sorry"], answer: "Thank you" },
    { word: "Danke", options: ["Hello", "Thanks"], answer: "Thanks" },
    { word: "Ciao", options: ["Hi", "Bye"], answer: "Bye" },
    { word: "Hola", options: ["Hey", "Hello"], answer: "Hello" },
    { word: "Merci", options: ["Please", "Thank you"], answer: "Thank you" },
    { word: "Adiós", options: ["Hello", "Goodbye"], answer: "Goodbye" },
    { word: "Salut", options: ["Hi", "Bye"], answer: "Hi" },
    { word: "Por favor", options: ["Please", "Excuse me"], answer: "Please" },
    { word: "Guten Morgen", options: ["Good night", "Good morning"], answer: "Good morning" }
  ]);

  useEffect(() => {
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      sdk.actions.ready();
    }
  }, [isSDKLoaded]);

  const handleAnswer = (choice: string) => {
    const currentQuestion = remainingQuestions[questionIndex];

    if (choice === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => [
        ...prev,
        { word: currentQuestion.word, chosen: choice, correct: currentQuestion.answer },
      ]);
    }

    if (round < maxRounds) {
      setRound((prev) => prev + 1);
      const updatedQuestions = [...remainingQuestions];
      updatedQuestions.splice(questionIndex, 1);
      setRemainingQuestions(updatedQuestions);
      if (updatedQuestions.length > 0) {
        setQuestionIndex(Math.floor(Math.random() * updatedQuestions.length));
      }
    } else {
      setGameOver(true);
    }
  };

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-4 px-2 text-center">
      <h1 className="text-2xl font-bold mb-4">Need Google Translate?</h1>

      {!gameOver ? (
        remainingQuestions.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-2">Round {round} / {maxRounds}</p>
            <p className="text-lg font-bold mb-4">
              What does <span className="text-blue-500">{remainingQuestions[questionIndex].word}</span> mean?
            </p>
            <div className="flex justify-center gap-4">
              {remainingQuestions[questionIndex].options.map((option) => (
                <Button key={option} onClick={() => handleAnswer(option)} className="bg-blue-500 px-6 py-2">
                  {option}
                </Button>
              ))}
            </div>
          </>
        )
      ) : (
        <div ref={resultRef} className="text-center bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          {score === maxRounds && <Confetti />}
          <h2 className="text-3xl font-bold mb-4">
            {score === maxRounds ? "Perfect Score 🎉" : score <= 3 ? "Oops 😂" : "Good Job 👍"}
          </h2>
          <p className="text-lg mb-4">
            You scored <span className="text-blue-500 font-bold">{score} / {maxRounds}</span>
          </p>

          {incorrectAnswers.length > 0 && (
            <div className="mt-6 p-4 bg-gray-700 text-white rounded-md">
              <h3 className="text-xl font-bold mb-2">Incorrect Answers ❌</h3>
              <ul className="text-left">
                {incorrectAnswers.map(({ word, chosen, correct }, index) => (
                  <li key={index} className="mb-2">
                    <strong>{word}</strong>: You chose "<span className="text-yellow-300">{chosen}</span>", correct was "<span className="text-green-300">{correct}</span>"
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col items-center gap-4 mt-6">
            <Button
              onClick={() => {
                const shareText = `Scored ${score}/${maxRounds} in this fun translate game, frame by @sarvesh371.eth`;
                const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${appUrl}`;
                window.open(url, '_blank');
              }}
              className="bg-green-500 px-4 py-2 w-full"
            >
              Share Score 📸
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}