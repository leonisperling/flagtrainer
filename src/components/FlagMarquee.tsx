import React from 'react';

import { getFlagSrc } from '../lib/flagUtils';
import continents from '../lib/continents';

const flagCodes = Object.values(continents).flat().map(entry => entry.code);

export default function FlagMarquee() {
  // Duplicate the flag row for seamless infinite scroll
  const flagRow = flagCodes.map((code, i) => (
    <img
      key={code + '-' + i}
      src={getFlagSrc(code)}
      alt={`Flag ${code}`}
      className="h-4 sm:h-10 mx-2 rounded shadow"
      style={{ verticalAlign: 'middle' }}
    />
  ));
  return (
    <div className="max-w-64 sm:max-w-full overflow-x-hidden overflow-y-hidden py-2 sm:py-4 mb-2 sm:mb-4" style={{ position: 'relative', maxHeight: '56px' }}>
      <div className="flex flex-nowrap items-center" style={{ width: 'max-content', animation: 'marquee 40s linear infinite' }}>
        {flagRow}
        {flagRow}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-5%); }
        }
      `}</style>
    </div>
  );
}
