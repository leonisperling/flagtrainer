// Mapping of continents to country codes (ISO 3166-1 alpha-2)

const continents = {
  Africa: [
    'dz', 'ao', 'bj', 'bw', 'bf', 'bi', 'cm', 'cv', 'cf', 'td', 'km', 'cg', 'cd', 'ci', 'dj', 'eg', 'gq', 'er', 'sz', 'et', 'ga', 'gm', 'gh', 'gn', 'gw', 'ke', 'ls', 'lr', 'ly', 'mg', 'mw', 'ml', 'mr', 'mu', 'yt', 'ma', 'mz', 'na', 'ne', 'ng', 'rw', 're', 'sh', 'st', 'sn', 'sc', 'sl', 'so', 'za', 'ss', 'sd', 'tz', 'tg', 'tn', 'ug', 'eh', 'zm', 'zw'
  ],
  Asia: [
    'af', 'am', 'az', 'bh', 'bd', 'bt', 'bn', 'mm', 'kh', 'cn', 'cx', 'cc', 'ge', 'hk', 'in', 'id', 'ir', 'iq', 'il', 'jp', 'jo', 'kz', 'kp', 'kr', 'kw', 'kg', 'la', 'lb', 'mo', 'my', 'mv', 'mn', 'np', 'om', 'pk', 'ps', 'ph', 'qa', 'sa', 'sg', 'lk', 'sy', 'tw', 'tj', 'th', 'tl', 'tr', 'tm', 'ae', 'uz', 'vn', 'ye'
  ],
  Europe: [
    'al', 'ad', 'at', 'by', 'be', 'ba', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fo', 'fi', 'fr', 'de', 'gi', 'gr', 'va', 'hu', 'is', 'ie', 'it', 'lv', 'li', 'lt', 'lu', 'mt', 'md', 'mc', 'me', 'nl', 'mk', 'no', 'pl', 'pt', 'ro', 'ru', 'sm', 'rs', 'sk', 'si', 'es', 'sj', 'se', 'ch', 'ua', 'gb'
  ],
  NorthAmerica: [
    'ag', 'bs', 'bb', 'bz', 'ca', 'cr', 'cu', 'dm', 'do', 'sv', 'gd', 'gt', 'ht', 'hn', 'jm', 'mx', 'ni', 'pa', 'kn', 'lc', 'vc', 'tt', 'us'
  ],
  SouthAmerica: [
    'ar', 'bo', 'br', 'cl', 'co', 'ec', 'fk', 'gf', 'gy', 'py', 'pe', 'sr', 'uy', 've'
  ],
  Oceania: [
    'as', 'au', 'ck', 'fj', 'pf', 'gu', 'ki', 'mh', 'fm', 'nr', 'nc', 'nz', 'nu', 'nf', 'mp', 'pw', 'pg', 'pn', 'ws', 'sb', 'tk', 'to', 'tv', 'vu', 'wf'
  ],
  Antarctica: [
    'aq', 'bv', 'gs', 'hm', 'tf'
  ]
};

export default continents;
