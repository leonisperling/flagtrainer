import React, { useState } from 'react';
import continents from '../lib/continents';
import { getFlagSrc } from '../lib/flagUtils';


function FlagGallery() {
  const [openContinents, setOpenContinents] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (continent: string) => {
    setOpenContinents(prev => ({
      ...prev,
      [continent]: !prev[continent],
    }));
  };

  return (
    <div className="flex flex-col items-start w-full max-w-4xl mx-auto px-2">
      {Object.entries(continents).map(([continent, countries]) => (
        <section key={continent} className="w-full max-w-4xl mx-auto">
          <button
            className="text-2xl sm:text-3xl font-bold flex items-center mb-2 focus:outline-none justify-start w-full bg-transparent border-none cursor-pointer p-0 text-left"
            onClick={() => handleToggle(continent)}
            aria-expanded={!!openContinents[continent]}
          >
            <span>{continent}</span>
            <span
              className="ml-2 text-xl sm:text-2xl transition-transform"
              style={{ transform: openContinents[continent] ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              ▶
            </span>
          </button>
          {openContinents[continent] && (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mt-4 w-full"
            >
              {countries.map(entry => (
                <div
                  key={entry.code}
                  className="flex flex-col items-center justify-center bg-gray-300 rounded-lg shadow-md p-3 sm:p-4 transition-transform hover:scale-105 min-w-[120px] min-h-[120px] sm:min-w-[180px] sm:min-h-[180px]"
                >
                  <img
                    src={getFlagSrc(entry.code)}
                    alt={`Flag of ${entry.name}`}
                    width={96}
                    height={72}
                    className="mb-2 rounded"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <p className="text-center text-xs sm:text-sm font-medium text-gray-800 mt-1">{entry.name}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export default FlagGallery;
