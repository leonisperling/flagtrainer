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
      style={{ height: 40, margin: '0 12px', verticalAlign: 'middle', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
    />
  ));

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      padding: '1rem 0',
      position: 'relative',
      marginBottom: '18px'
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marquee 350s linear infinite',
      }}>
        {flagRow}
        {flagRow}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
