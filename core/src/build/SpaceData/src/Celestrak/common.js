Object.defineProperty(exports, '__esModule', { value: true });
exports.default = {
    /*
    |--------------------------------------------------------------------------
    | CelesTrak (celestrak.js)
    |--------------------------------------------------------------------------
    |
    | This file is for configuring and storing information relating to the
    | CelesTrak third party service that Orbitcluster uses for data retrieval.
    |
    */
    baseURL: 'https://www.celestrak.com',
    types: [
        'GPElementSets',
        'elementSets',
        'supplementalElementSets',
    ],
    setURLS: {
        GPElementSets: (set, format) => { return `/NORAD/elements/gp.php?GROUP=${set}&FORMAT=${format}`; },
        elementSets: (set) => { return `/satcat/${set}.php`; },
        supplementalElementSets: (set) => { return `/NORAD/elements/supplemental/${set}.txt`; },
    },
    /*
    |--------------------------------------------------------------------------
    | CelesTrak NORAD General Perturbation (GP) Element Sets
    |--------------------------------------------------------------------------
    |
    | Providing GP data in the OMM (Orbit Mean-Elements Message) format
    | provides a way forward for all software developers to continue to support
    | using SGP4 in their applications and add support for 9-digit catalog
    | numbers.
    |
    | All GP queries on CelesTrak take the form:
    | https://celestrak.com/NORAD/elements/gp.php?{QUERY}=VALUE[&FORMAT=VALUE],
    | where {QUERY} is a string from GPElementSets, while {FORMAT} for this
    | application will be JSON.
    |
    */
    GPElementSets: [
        'last-30-days',
        'stations',
        'visual',
        'active',
        'analyst',
        '2019-006',
        '1999-025',
        'iridium-33-debris',
        'cosmos-2251-debris',
        'weather',
        'noaa',
        'goes',
        'resource',
        'sarsat',
        'dmc',
        'tdrss',
        'argos',
        'planet',
        'spire',
        'geo',
        'intelsat',
        'ses',
        'iridium',
        'iridium-NEXT',
        'starlink',
        'oneweb',
        'orbcomm',
        'globalstar',
        'swarm',
        'amateur',
        'x-comm',
        'other-comm',
        'satnogs',
        'gorizont',
        'raduga',
        'molniya',
        'gps-ops',
        'glo-ops',
        'galileo',
        'beidou',
        'sbas',
        'nnss',
        'musson',
        'science',
        'geodetic',
        'engineering',
        'education',
        'military',
        'radar',
        'cubesat',
        'other',
    ],
    GPElementSetFormats: [
        'tle',
        '2le',
        'xml',
        'kvn',
        'json',
        'json-pretty',
        'csv',
    ],
    /*
    |--------------------------------------------------------------------------
    | CelesTrak NORAD Element Sets
    |--------------------------------------------------------------------------
    |
    | This element set provides support for CelesTrak element sets that do not
    | support the new OMM element set standard.
    |
    | All GP queries on CelesTrak take the form:
    | https://celestrak.com/satcat/{QUERY}.php
    | where {QUERY} is the selected set from elementSets.
    |
    */
    elementSets: [
        'gpz',
        'gpz-plus',
    ],
    /*
    |--------------------------------------------------------------------------
    | CelesTrak Supplemental Two-Line Element Sets
    |--------------------------------------------------------------------------
    |
    | This element set provides support for CelesTrak element that are derived
    | from operator ephemeris data, such as SpaceX and Planet.
    |
    | All GP queries on CelesTrak take the form:
    | https://celestrak.com/NORAD/elements/supplemental/{QUERY}.txt
    | where {QUERY} is the selected set from supplementalElementSets.
    |
    */
    supplementalElementSets: [
        'starlink',
        'planet',
        'oneweb',
        'gps',
        'glonass',
        'meteosar',
        'intelsat',
        'ses',
        'telesat',
        'orbcomm',
        'iss',
        'cpf',
    ],
};
