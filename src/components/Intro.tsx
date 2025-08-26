import React, { useState } from 'react';
import FlagGallery from './FlagGallery';
import continents from '../lib/continents'
import FlagQuiz from './FlagQuiz';
import FlagMarquee from './FlagMarquee';

export default function Intro() {


  const [view, setView] = useState<'intro' | 'flags' | 'quiz'>('intro');
  const [quizSelection, setQuizSelection] = useState<string>('All');
  const [quizStarted, setQuizStarted] = useState(false);
  const continentOptions = ['All', ...Object.keys(continents)];

  if (view === 'flags') {
    return (
      <div>
        <button
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 items-start"
          onClick={() => setView('intro')}
        >
          ← Back
        </button>
        <FlagGallery />
      </div>
    );
  }

  if (view === 'quiz') {
    if (!quizStarted) {
      return (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => { setView('intro'); setQuizStarted(false); }}
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-4">Choose a continent or quiz yourself on every flag!</h2>
          <div className='flex items-baseline gap-4 justify-center'>
            <select
              className="mb-6 px-3 py-2 border rounded"
              value={quizSelection}
              onChange={e => setQuizSelection(e.target.value)}
            >
              {continentOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </button>
          </div>
        </div>
      );
    }
    return <FlagQuiz selection={quizSelection} onBack={() => { setQuizStarted(false); }} />;
  }

  return (
    <div className="px-2 py-4 w-full max-h-screen flex flex-col items-center justify-start">
      <div className="w-full overflow-x-hidden mb-4 flex justify-center">
        <FlagMarquee />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-shadow-lg text-shadow-sky-600 mb-4 text-center leading-tight">Welcome to flag trainer</h1>
      <h2 className="mb-4 text-lg sm:text-xl font-extralight text-center leading-loose">Your one stop shop for flag training</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto mt-8">
        <button className="px-6 py-3 bg-blue-500 text-white rounded mb-2 sm:mb-0 w-full sm:w-auto text-lg font-semibold shadow-sm" onClick={() => setView('flags')}>Look at all flags</button>
        <button className="px-6 py-3 bg-green-500 text-white rounded w-full sm:w-auto text-lg font-semibold shadow-sm" onClick={() => setView('quiz')}>Take a quiz</button>
      </div>
    </div>
  );
}
