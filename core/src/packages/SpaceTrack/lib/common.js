module.exports = {

    /*
    |--------------------------------------------------------------------------
    | Space-Track (spacetrack.js)
    |--------------------------------------------------------------------------
    |
    | This file is for configuring and storing information relating to the
    | Space-Track third party service that Orbitcluster uses for data
    | retrieval.
    |
    */

    baseURL:            'https://www.space-track.org',

    auth: {
        login:          '/ajaxauth/login',
        logout:         '/ajaxauth/logout'
    },

    api: {
        /*
        |----------------------------------------------------------------------
        | Space-Track API Controllers
        |----------------------------------------------------------------------
        |
        | basicspacedata: This controller is for data made available to all
        | site members upon successful completion of account creation.
        |
        | expandedspacedata: This controller is for data provided in response
        | to Orbital Data Requests (ODR), as well as data made available
        | through USSPACECOM SSA Sharing Agreements.
        |
        | fileshare: Provides API access to files hosted on Space-Track's Files
        | Panel. (permission controlled)
        |
        */

        controllers: [
            'basicspacedata',
            'expandedspacedata',
            'fileshare'
        ],

        /*
        |----------------------------------------------------------------------
        | Space-Track API Actions
        |----------------------------------------------------------------------
        |
        | query: Used to query data using the rest of the URL parameters.
        |
        | modeldef: Used for getting the specified class's data definition,
        | particularly a list of valid predicates.
        |
        */

        actions: [
            'query',
            'modeldef'
        ],

        /*
        |----------------------------------------------------------------------
        | Space-Track API Classes
        |----------------------------------------------------------------------
        |
        | announcement: Provides API access to the current announcements on the
        | website.
        |
        | boxscore: Accounting of man-made objects that have been or are in
        | orbit. Derived from satellite catalog and grouped by
        | country/organization.
        |
        | cdm_public: Publicly available Conjunction Data.
        |
        | decay: Predicted and historical decay information.
        |
        | announcement: Provides API access to the current announcements on the
        | website.
        |
        | gp: The general perturbations (GP) class is an efficient listing of
        | the newest SGP4 keplerian element set for each man-made earth-
        | orbiting object tracked by the 18th Space Control Squadron.
        |
        | gp_history: Listing of ALL historical SGP4 keplerian element sets
        | for each man-made earth-orbiting object by the 18th Space Control
        | Squadron.
        |
        | launch_site: List of launch sites found in satellite catalog records.
        |
        | satcat: Satellite Catalog Information. The "CURRENT" predicate
        | indicates the most current catalog record with a 'Y'. All older
        | records for that object will have an 'N'.
        |
        | satcat_change: ~60 days of history showing changes for objects with
        | changes in one of these values: INTLDES, NORAD_CAT_ID, SATNAME,
        | COUNTRY, LAUNCH, or DECAY.
        |
        | satcat_debut: Shows new records added to the Satellite Catalog.
        | DEBUT predicate shows the date/time that the object was first added
        | to Space-Track's catalog.
        |
        | tip: Tracking and Impact Prediction (TIP) Message.
        |
        */

        classes: [
            'announcement',
            'boxscore',
            'cdm_public',
            'decay',
            'gp',
            'gp_history',
            'launch_site',
            'satcat',
            'satcat_change',
            'satcat_debut',
            'tip'
        ],

        /*
        |----------------------------------------------------------------------
        | Space-Track API Formats
        |----------------------------------------------------------------------
        |
        | xml (eXtensible Markup Language): No special request rules. For CDM
        | request class, shows CCSDS-compliant format.
        |
        | json (JavaScript Object Notation): Preferred format, no special
        | request rules.
        |
        | html (HyperText Markup Language): Not recommended for machine
        | parsing. No special request rules.
        |
        | csv (Comma-Separated Values): Due to the limitations of the CSV
        | specification, requesting CSV formatted data does not allow for
        | transmission of metadata; metadata concerning the request will need
        | to be gathered through one of the other formats prior to requesting
        | CSV.
        |
        | tle (Two-Line Element Set): To get traditionally-formatted TLE data,
        | request the 'tle', 'tle_latest', or 'tle_publish' class. It is
        | recommended that you omit predicates from URLs that use tle format.
        |
        | 3le (Three-Line Element Set): The format adds TLE_LINE0 or the
        | "Title line", a twenty-four character name, before the traditional
        | Two Line Element format. The 3le format defaults to include a leading
        | zero so that you can easily find the object name via scripts.
        |
        | kvn (Key=Value Notation): Key=Value Notation format, currently for
        | use exclusively with CDM Class. Incompatible with /metadata/true/.
        |
        | stream (File Stream): File Stream format, currently for use
        | exclusively with download class.
        |
        */

        formats: [
            'xml',
            'json',
            'html',
            'csv',
            'tle',
            '3le',
            'kvn',
            'stream'
        ],

        fields: {
            announcement: [
                'announcement_type',
                'announcement_text',
                'announcement_start',
                'announcement_end'
            ],

            boxscore: [
                'COUNTRY',
                'SPADOC_CD',
                'ORBITAL_TBA',
                'ORBITAL_PAYLOAD_COUNT',
                'ORBITAL_ROCKET_BODY_COUNT',
                'ORBITAL_DEBRIS_COUNT',
                'ORBITAL_TOTAL_COUNT',
                'DECAYED_PAYLOAD_COUNT',
                'DECAYED_ROCKET_BODY_COUNT',
                'DECAYED_DEBRIS_COUNT',
                'DECAYED_TOTAL_COUNT',
                'COUNTRY_TOTAL'
            ],

            cdm_public: [
                'CDM_ID',
                'CREATED',
                'EMERGENCY_REPORTABLE',
                'TCA',
                'MIN_RNG',
                'PC',
                'SAT_1_ID',
                'SAT_1_NAME',
                'SAT1_OBJECT_TYPE',
                'SAT1_RCS',
                'SAT_1_EXCL_VOL',
                'SAT_2_ID',
                'SAT_2_NAME',
                'SAT2_OBJECT_TYPE',
                'SAT2_RCS',
                'SAT_2_EXCL_VOL'
            ],

            decay: [
                'NORAD_CAT_ID',
                'OBJECT_NUMBER',
                'OBJECT_NAME',
                'INTLDES',
                'OBJECT_ID',
                'RCS',
                'RCS_SIZE',
                'COUNTRY',
                'MSG_EPOCH',
                'DECAY_EPOCH',
                'SOURCE',
                'MSG_TYPE',
                'PRECEDENCE'
            ],

            gp: [
                'CCSDS_OMM_VERS',
                'COMMENT',
                'CREATION_DATE',
                'ORIGINATOR',
                'OBJECT_NAME',
                'OBJECT_ID',
                'CENTER_NAME',
                'REF_FRAME',
                'TIME_SYSTEM',
                'MEAN_ELEMENT_THEORY',
                'EPOCH',
                'MEAN_MOTION',
                'ECCENTRICITY',
                'INCLINATION',
                'RA_OF_ASC_NODE',
                'ARG_OF_PERICENTER',
                'MEAN_ANOMALY',
                'EPHEMERIS_TYPE',
                'CLASSIFICATION_TYPE',
                'NORAD_CAT_ID',
                'ELEMENT_SET_NO',
                'REV_AT_EPOCH',
                'BSTAR',
                'MEAN_MOTION_DOT',
                'MEAN_MOTION_DDOT',
                'SEMIMAJOR_AXIS',
                'PERIOD',
                'APOAPSIS',
                'PERIAPSIS',
                'OBJECT_TYPE',
                'RCS_SIZE',
                'COUNTRY_CODE',
                'LAUNCH_DATE',
                'SITE',
                'DECAY_DATE',
                'FILE',
                'GP_ID',
                'TLE_LINE0',
                'TLE_LINE1',
                'TLE_LINE2'
            ],

            gp_history: [
                'CCSDS_OMM_VERS',
                'COMMENT',
                'CREATION_DATE',
                'ORIGINATOR',
                'OBJECT_NAME',
                'OBJECT_ID',
                'CENTER_NAME',
                'REF_FRAME',
                'TIME_SYSTEM',
                'MEAN_ELEMENT_THEORY',
                'EPOCH',
                'MEAN_MOTION',
                'ECCENTRICITY',
                'INCLINATION',
                'RA_OF_ASC_NODE',
                'ARG_OF_PERICENTER',
                'MEAN_ANOMALY',
                'EPHEMERIS_TYPE',
                'CLASSIFICATION_TYPE',
                'NORAD_CAT_ID',
                'ELEMENT_SET_NO',
                'REV_AT_EPOCH',
                'BSTAR',
                'MEAN_MOTION_DOT',
                'MEAN_MOTION_DDOT',
                'SEMIMAJOR_AXIS',
                'PERIOD',
                'APOAPSIS',
                'PERIAPSIS',
                'OBJECT_TYPE',
                'RCS_SIZE',
                'COUNTRY_CODE',
                'LAUNCH_DATE',
                'SITE',
                'DECAY_DATE',
                'FILE',
                'GP_ID',
                'TLE_LINE0',
                'TLE_LINE1',
                'TLE_LINE2'
            ],

            launch_site: [
                'SITE_CODE',
                'LAUNCH_SITE'
            ],

            satcat: [
                'INTLDES',
                'NORAD_CAT_ID',
                'OBJECT_TYPE',
                'SATNAME',
                'COUNTRY',
                'LAUNCH',
                'SITE',
                'DECAY',
                'PERIOD',
                'INCLINATION',
                'APOGEE',
                'PERIGEE',
                'COMMENT',
                'COMMENTCODE',
                'RCSVALUE',
                'RCS_SIZE',
                'FILE',
                'LAUNCH_YEAR',
                'LAUNCH_NUM',
                'LAUNCH_PIECE',
                'CURRENT',
                'OBJECT_NAME',
                'OBJECT_ID',
                'OBJECT_NUMBER'
            ],

            satcat_change: [
                'NORAD_CAT_ID',
                'OBJECT_NUMBER',
                'CURRENT_NAME',
                'PREVIOUS_NAME',
                'CURRENT_INTLDES',
                'PREVIOUS_INTLDES',
                'CURRENT_COUNTRY',
                'PREVIOUS_COUNTRY',
                'CURRENT_LAUNCH',
                'PREVIOUS_LAUNCH',
                'CURRENT_DECAY',
                'PREVIOUS_DECAY',
                'CHANGE_MADE'
            ],

            satcat_debut: [
                'INTLDES',
                'NORAD_CAT_ID',
                'OBJECT_TYPE',
                'SATNAME',
                'DEBUT',
                'COUNTRY',
                'LAUNCH',
                'SITE',
                'DECAY',
                'PERIOD',
                'INCLINATION',
                'APOGEE',
                'PERIGEE',
                'COMMENT',
                'COMMENTCODE',
                'RCSVALUE',
                'RCS_SIZE',
                'FILE',
                'LAUNCH_YEAR',
                'LAUNCH_NUM',
                'LAUNCH_PIECE',
                'CURRENT',
                'OBJECT_NAME',
                'OBJECT_ID',
                'OBJECT_NUMBER'
            ],

            tip: [
                'NORAD_CAT_ID',
                'MSG_EPOCH',
                'INSERT_EPOCH',
                'DECAY_EPOCH',
                'WINDOW',
                'REV',
                'DIRECTION',
                'LAT',
                'LON',
                'INCL',
                'NEXT_REPORT',
                'ID',
                'HIGH_INTEREST',
                'OBJECT_NUMBER'
            ]
        }
    }

};
