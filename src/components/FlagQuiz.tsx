import React, { useState } from 'react';
import FlagQuestion from './FlagQuestion';
import continents, { CountryInfo } from '../lib/continents';
import FlagImageModal from './FlagImageModal';

type FlagQuizProps = {
	selection: string;
	onBack?: () => void;
};

function getFlagSrc(code: string) {
	return `/flags/png1000px/${code}.png`;
}

function getCountries(selection: string): CountryInfo[] {
	if (selection === 'All') {
		return Object.values(continents).flat();
	}
	return continents[selection] || [];
}

const shuffle = (arr: CountryInfo[]) => arr.sort(() => Math.random() - 0.5);

const FlagQuiz: React.FC<FlagQuizProps> = ({ selection, onBack }) => {
	const [showModal, setShowModal] = useState(false);
	const [countries] = useState<CountryInfo[]>(() => shuffle(getCountries(selection)));
	const [current, setCurrent] = useState(0);
	const [answer, setAnswer] = useState('');
	const [feedback, setFeedback] = useState<{ message: string; type: 'correct' | 'incorrect' | null } | null>(null);
	const [score, setScore] = useState(0);
	const [countdown, setCountdown] = useState<number | null>(null);

	const country = countries[current];

	// Countdown effect for incorrect answers
	React.useEffect(() => {
		if (feedback?.type === 'incorrect' && countdown !== null && countdown > 0) {
			const timer = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
			return () => clearTimeout(timer);
		}
		if (feedback?.type === 'incorrect' && countdown === 0) {
			setFeedback(null);
			setCountdown(null);
			setAnswer('');
			setCurrent(c => c + 1);
		}
	}, [countdown, feedback]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country) return;
    if (answer.trim().toLowerCase() === country.name.trim().toLowerCase()) {
      setScore(s => s + 1);
      setAnswer('');
      setFeedback({ message: 'Correct!', type: 'correct' });
      setTimeout(() => {
        setFeedback(null);
        setCurrent(c => c + 1);
      }, 700);
    } else {
      setFeedback({ message: `Incorrect! The correct answer is ${country.name}.`, type: 'incorrect' });
      setCountdown(5);
    }
  };

	if (!country) {
		return (
			<div className="flex flex-col items-center">
				<h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
				<p className="mb-4">Your score: {score} / {countries.length}</p>
				{onBack && <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onBack}>← Back</button>}
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center">
			{onBack && <button className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 self-start" onClick={onBack}>← Back</button>}
			<FlagQuestion
				country={country}
				answer={answer}
				onAnswerChange={setAnswer}
				onSubmit={handleSubmit}
				feedback={feedback}
				countdown={countdown}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
			<div className="mt-4 text-gray-500">Question {current + 1} of {countries.length}</div>
		</div>
	);
};

export default FlagQuiz;
