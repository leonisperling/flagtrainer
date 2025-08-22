import React from 'react';
import FlagImageModal from './FlagImageModal';
import { CountryInfo } from '../lib/continents';

interface FlagQuestionProps {
  country: CountryInfo;
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  feedback: { message: string; type: 'correct' | 'incorrect' | null } | null;
  countdown: number | null;
  showModal: boolean;
  setShowModal: (open: boolean) => void;
}

export default function FlagQuestion({
  country,
  answer,
  onAnswerChange,
  onSubmit,
  feedback,
  countdown,
  showModal,
  setShowModal,
}: FlagQuestionProps) {

  function getFlagSrc(code: string) {
    return `/flags/png1000px/${code}.png`;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Which country is this flag?</h2>
      <img
        src={getFlagSrc(country.code)}
        alt="Country flag"
        width={260}
        height={220}
        className="mb-4 rounded shadow cursor-pointer"
        onClick={() => setShowModal(true)}
      />
      <FlagImageModal
        flagSource={getFlagSrc(country.code)}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
      <form onSubmit={onSubmit} className="mb-4 w-full max-w-xs">
        <input
          type="text"
          value={answer}
          onChange={e => onAnswerChange(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
          placeholder="Enter country name"
          autoFocus
        />
        <button type="submit" className="px-4 py-2 mt-2 bg-blue-500 text-white rounded w-full">Submit</button>
      </form>
      {feedback && (
        <div
          className={`mb-4 text-lg font-semibold ${
            feedback.type === 'correct' ? 'text-green-600' : feedback.type === 'incorrect' ? 'text-red-400' : 'text-gray-700'
          }`}
        >
          {feedback.message}
          {feedback.type === 'incorrect' && countdown !== null && (
            <p className="ml-2 text-base font-normal text-white">
              Next question in {countdown > 0 ? countdown : 0}...
            </p>
          )}
        </div>
      )}
    </div>
  );
}
