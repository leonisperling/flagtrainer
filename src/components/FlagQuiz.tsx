import React, { useState } from 'react';
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

  React.useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      setFeedback(null);
      setAnswer('');
      setCurrent(c => c + 1);
      return;
    }
    const timer = setTimeout(() => setCountdown(c => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

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
				<h2 className="text-2xl font-bold mb-4">Which country is this flag?</h2>
				<img
					src={getFlagSrc(country.code)}
					alt="Country flag"
					width={160}
					height={120}
					className="mb-4 rounded shadow cursor-pointer"
					onClick={() => setShowModal(true)}
					style={{ transition: 'box-shadow 0.2s', boxShadow: showModal ? '0 0 0 2px #2563eb' : undefined }}
				/>

        {showModal &&
          <FlagImageModal
            flagSource={getFlagSrc(country.code)}
            open={showModal}
            onClose={() => setShowModal(false)}
          />
        }
				<form onSubmit={handleSubmit} className="mb-4 w-full max-w-xs">
					<input
						type="text"
						value={answer}
						onChange={e => setAnswer(e.target.value)}
						className="border px-3 py-2 rounded w-full mb-2"
						placeholder="Enter country name"
						autoFocus
					/>
					<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full">Submit</button>
				</form>
				{feedback && (
					<div
						className={`mb-4 text-lg font-semibold ${
							feedback.type === 'correct' ? 'text-green-600' : feedback.type === 'incorrect' ? 'text-red-600' : 'text-gray-700'
						}`}
					>
						{feedback.message}
						{feedback.type === 'incorrect' && countdown !== null && (
							<span className="ml-2 text-base font-normal text-gray-700">Next question in {countdown}...</span>
						)}
					</div>
				)}
				<div className="mt-4 text-gray-500">Question {current + 1} of {countries.length}</div>
			</div>
	);
};

export default FlagQuiz;
