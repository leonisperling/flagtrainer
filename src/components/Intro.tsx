import React, { useState } from 'react';
import FlagGallery from './FlagGallery';
import continents from '../lib/continents'
import FlagQuiz from './FlagQuiz';

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
    <div>
      <h1 className="text-3xl text-amber-300 mb-3">Welcome to the flag trainer</h1>
      <h2 className="mb-8">You can look all the flags per continent or you can take the quiz</h2>
      <div className="flex flex-row justify-center gap-6">
        <button onClick={() => setView('flags')}>Go to all flags</button>
        <button onClick={() => setView('quiz')}>Go to quiz</button>
      </div>
    </div>
  );
}
