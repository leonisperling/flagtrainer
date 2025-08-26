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
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
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
          <h2 className="text-2xl font-bold mb-4">Choose a continent to start the quiz</h2>
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
      );
    }
    return <FlagQuiz selection={quizSelection} onBack={() => { setQuizStarted(false); }} />;
  }

  return (
    <div className="px-2 py-4 w-full min-h-screen flex flex-col items-center justify-start">
      <div className="w-full overflow-x-hidden mb-4 flex justify-center">
        <FlagMarquee />
      </div>
      <h1 className="text-2xl sm:text-3xl text-amber-300 mb-3 text-center leading-tight">Welcome to flag trainer</h1>
      <h2 className="mb-8 text-base sm:text-lg text-center leading-snug">You can look all the flags per continent or you can take the quiz</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto">
        <button className="px-6 py-3 bg-blue-500 text-white rounded mb-2 sm:mb-0 w-full sm:w-auto text-lg font-semibold shadow-sm" onClick={() => setView('flags')}>Go to all flags</button>
        <button className="px-6 py-3 bg-green-500 text-white rounded w-full sm:w-auto text-lg font-semibold shadow-sm" onClick={() => setView('quiz')}>Go to quiz</button>
      </div>
    </div>
  );
}
