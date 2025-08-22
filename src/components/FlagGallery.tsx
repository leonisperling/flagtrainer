import continents from '../lib/continents'

function getFlagSrc(code: string) {
  return `/flags/png1000px/${code}.png`;
}

function FlagGallery() {
  return (
    <div>
      {Object.entries(continents).map(([continent, countries]) => (
        <section key={continent}>
          <h2>{continent}</h2>
          <div>
            {countries.map(entry => (
              <img
                key={entry.code}
                src={getFlagSrc(entry.code)}
                alt={`Flag of ${entry.name}`}
                width={48}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default FlagGallery;
