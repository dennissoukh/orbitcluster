import { orbit } from '../types/orbit';

export const determineOrbitType = ({ ...orbit }: orbit) => {
    // Orbit Types sourced from: https://www.sdo.esoc.esa.int/environment_report/Space_Environment_Report_latest.pdf

    // LEO: Low Earth Orbit - p ∈ [0,2000], a ∈ [0,2000]
    if (
        orbit.periapsis >= 0 &&
        orbit.periapsis <= 2000 &&
        orbit.apoapsis >= 0 &&
        orbit.apoapsis <= 2000
    ) return 'Low Earth Orbit (LEO)';

    if (
        orbit.inclination >= 0 &&
        orbit.inclination <= 25 &&
        orbit.periapsis >= 35586 &&
        orbit.periapsis <= 35986 &&
        orbit.apoapsis >= 35586 &&
        orbit.apoapsis <= 35986
    ) return 'Geostationary Orbit (GEO)';

    if (
        orbit.semimajor_axis >= 37948 &&
        orbit.semimajor_axis <= 46380 &&
        orbit.eccentricity >= 0.00 &&
        orbit.eccentricity <= 0.25 &&
        orbit.inclination >= 25 &&
        orbit.inclination <= 180
    ) return 'Inclined Geosynchronous Orbit (IGO)';

    if (
        orbit.semimajor_axis >= 37948 &&
        orbit.semimajor_axis <= 46380 &&
        orbit.eccentricity >= 0.00 &&
        orbit.eccentricity <= 0.25 &&
        orbit.inclination >= 0 &&
        orbit.inclination <= 25
    ) return 'Extended Geosynchronous Orbit (EGO)';

    if (
        orbit.inclination >= 50 &&
        orbit.inclination <= 70 &&
        orbit.periapsis >= 18100 &&
        orbit.periapsis <= 24300 &&
        orbit.apoapsis >= 18100 &&
        orbit.apoapsis <= 24300
    ) return 'Navigation Satellites Orbit (NSO)';

    if (
        orbit.inclination >= 0 &&
        orbit.inclination <= 90 &&
        orbit.periapsis >= 0 &&
        orbit.periapsis <= 2000 &&
        orbit.apoapsis >= 31570 &&
        orbit.apoapsis <= 40002
    ) return 'GEO Transfer Orbit (GTO)';

    if (
        orbit.periapsis >= 2000 &&
        orbit.periapsis <= 31570 &&
        orbit.apoapsis >= 2000 &&
        orbit.apoapsis <= 31570
    ) return 'Medium Earth Orbit (MEO)';

    if (
        orbit.periapsis >= 31570 &&
        orbit.periapsis <= 40002 &&
        orbit.apoapsis >= 40002
    ) return 'GEO-superGEO Crossing Orbit (GHO)';

    if (
        orbit.periapsis >= 40002 &&
        orbit.apoapsis >= 40002
    ) return 'High Altitude Earth Orbit (HAO)';

    if (
        orbit.periapsis >= 2000 &&
        orbit.periapsis <= 31570 &&
        orbit.apoapsis >= 31570 &&
        orbit.apoapsis <= 40002
    ) return 'MEO-GEO Crossing Orbits (MGO)';

    if (
        orbit.periapsis >= 0 &&
        orbit.periapsis <= 31570 &&
        orbit.apoapsis >= 40002
    ) return 'Highly Eccentric Earth Orbit (HEO)';

    if (
        orbit.periapsis >= 0 &&
        orbit.periapsis <= 2000 &&
        orbit.apoapsis >= 2000 &&
        orbit.apoapsis <= 31570
    ) return 'LEO-MEO Crossing Orbit (LMO)';

    return 'Undefined Orbit (UFO)';
}
