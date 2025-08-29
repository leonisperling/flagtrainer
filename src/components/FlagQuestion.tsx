
import React from 'react';
import FlagImageModal from './FlagImageModal';
import continents from '../lib/continents';
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
  // --- Autocomplete dropdown state and logic ---
  const [showOptions, setShowOptions] = React.useState(false);
  const [filteredOptions, setFilteredOptions] = React.useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const optionRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  // Get all country names for autocomplete
  const allCountryNames = React.useMemo(() => {
    return Object.values(continents).flat().map(c => c.name);
  }, []);

  React.useEffect(() => {
    if (answer.length > 0) {
      const lowerAnswer = answer.toLowerCase();
      const startsWith = allCountryNames.filter(option => option.toLowerCase().startsWith(lowerAnswer));
      const contains = allCountryNames.filter(option =>
        !option.toLowerCase().startsWith(lowerAnswer) && option.toLowerCase().includes(lowerAnswer)
      );
      const filtered = [...startsWith, ...contains];
      setFilteredOptions(filtered);
      setShowOptions(filtered.length > 0);
      setHighlightedIndex(filtered.length > 0 ? 0 : -1);
    } else {
      setShowOptions(false);
      setFilteredOptions([]);
      setHighlightedIndex(-1);
    }
  }, [answer, allCountryNames]);

  function handleOptionClick(option: string) {
    onAnswerChange(option);
    setShowOptions(false);
    setHighlightedIndex(-1);
    document.activeElement instanceof HTMLElement && document.activeElement.blur();
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showOptions || filteredOptions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => {
        const next = prev < filteredOptions.length - 1 ? prev + 1 : 0;
        setTimeout(() => {
          optionRefs.current[next]?.scrollIntoView({ block: 'nearest' });
        }, 0);
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => {
        const next = prev > 0 ? prev - 1 : filteredOptions.length - 1;
        setTimeout(() => {
          optionRefs.current[next]?.scrollIntoView({ block: 'nearest' });
        }, 0);
        return next;
      });
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleOptionClick(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowOptions(false);
      setHighlightedIndex(-1);
    }
  }

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
      <form onSubmit={onSubmit} className="mb-4 w-full max-w-xs relative">
        <input
          type="text"
          value={answer}
          onChange={e => onAnswerChange(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2 bg-gray-900 text-white placeholder-gray-400"
          placeholder="Enter country name"
          autoFocus
          onFocus={() => answer.length > 0 && setShowOptions(true)}
          onBlur={() => setTimeout(() => setShowOptions(false), 100)}
          onKeyDown={handleInputKeyDown}
        />
        {showOptions && filteredOptions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-gray-800 border border-gray-700 rounded shadow z-10 max-h-40 overflow-y-auto mt-1">
            {filteredOptions.map((option, idx) => {
              // Highlight matching substring
              const lowerOption = option.toLowerCase();
              const lowerAnswer = answer.toLowerCase();
              const matchIndex = lowerOption.indexOf(lowerAnswer);
              let display;
              if (matchIndex !== -1 && lowerAnswer.length > 0) {
                display = <>
                  {option.slice(0, matchIndex)}
                  <span className="text-yellow-400 font-bold">{option.slice(matchIndex, matchIndex + lowerAnswer.length)}</span>
                  {option.slice(matchIndex + lowerAnswer.length)}
                </>;
              } else {
                display = option;
              }
              return (
                <li
                  key={option}
                  ref={el => { optionRefs.current[idx] = el; }}
                  tabIndex={-1}
                  className={`px-3 py-2 cursor-pointer select-none transition-colors duration-100 text-left ${highlightedIndex === idx ? 'bg-blue-900 text-white' : 'text-gray-200'} hover:bg-gray-700`}
                  onMouseDown={() => handleOptionClick(option)}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                >
                  {display}
                </li>
              );
            })}
          </ul>
        )}
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
