import React, { useEffect, useState } from 'react';
import { determineOrbitType, parseTle } from '../../lib/orbit';
import { orbit } from '../../types/orbit';
import { tle } from '../../types/satellite';
import { Callout } from '../../components/Callout';
import { timestampToReadableDateTime } from '../../lib/date';

interface GeneralPerturbationProps {
    tle: tle
}

export const GeneralPerturbation: React.FC<GeneralPerturbationProps> = ({ tle }) => {
    const [orbit, setOrbit] = useState<orbit>();

    useEffect(() => {
        const calculatedOrbit = parseTle(tle);
        setOrbit({ ...calculatedOrbit, type: determineOrbitType(calculatedOrbit) });
    }, [tle]);

    return (
        <div className="mt-4">
            {orbit && orbit.type &&
                <Callout title="Orbit Type" content={orbit.type}/>
            }
            {orbit &&
                <>
                    <div className="flex flex-wrap overflow-hidden mt-4">
                        <div className="w-1/2">
                            <Callout
                                title="Apoapsis"
                                content={orbit.apoapsis.toFixed(2)}
                                units="km"
                            />
                        </div>
                        <div className="w-1/2">
                            <Callout
                                title="Periapsis"
                                content={orbit.periapsis.toFixed(2)}
                                units="km"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap overflow-hidden mt-4">
                        <div className="w-1/2">
                            <Callout
                                title="Period"
                                content={orbit.period.toFixed(2)}
                                units="mins"
                            />
                        </div>
                        <div className="w-1/2">
                            <Callout
                                title="Semi Major Axis"
                                content={orbit.semimajor_axis.toFixed(2)}
                                units="km"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap overflow-hidden mt-4">
                        <div className="w-1/2">
                            <Callout
                                title="Inclination"
                                content={orbit.inclination.toFixed(2)}
                                units="°"
                            />
                        </div>
                        <div className="w-1/2">
                            <Callout
                                title="Epoch"
                                content={timestampToReadableDateTime(orbit.epoch)}
                                units="z"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap overflow-hidden mt-4">
                        <div className="w-1/2">
                            <Callout
                                title="Mean Motion"
                                content={orbit.mean_motion.toFixed(2)}
                            />
                        </div>
                        <div className="w-1/2">
                            <Callout
                                title="Bstar"
                                content={orbit.bstar}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
