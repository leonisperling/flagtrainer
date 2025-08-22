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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '900px', marginLeft: '0', marginRight: 'auto', width: '100%' }}>
      {Object.entries(continents).map(([continent, countries]) => (
        <section key={continent} style={{ width: '100%', maxWidth: '900px', marginLeft: 0, marginRight: 'auto' }}>
          <button
            className="text-3xl font-bold flex items-center mb-2 focus:outline-none justify-start w-full"
            onClick={() => handleToggle(continent)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', width: '100%' }}
            aria-expanded={!!openContinents[continent]}
          >
            <span>{continent}</span>
            <span style={{ marginLeft: '8px', fontSize: '1.5rem', transition: 'transform 0.2s', transform: openContinents[continent] ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              ▶
            </span>
          </button>
          {openContinents[continent] && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '16px',
              }}
            >
              {countries.map(entry => (
                <div
                  key={entry.code}
                  className="flex flex-col items-center justify-center bg-gray-300 rounded-lg shadow-md p-4 transition-transform hover:scale-150"
                  style={{
                    flex: '0 0 calc(25% - 24px)',
                    maxWidth: 'calc(25% - 24px)',
                    minWidth: '180px',
                    minHeight: '180px',
                    boxSizing: 'border-box',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                >
                  <img
                    src={getFlagSrc(entry.code)}
                    alt={`Flag of ${entry.name}`}
                    width={96}
                    height={72}
                    className="mb-2 rounded"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <p className="text-center text-sm font-medium text-gray-800 mt-1">{entry.name}</p>
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
