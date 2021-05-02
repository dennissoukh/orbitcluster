import React, { useEffect, useState } from 'react';
import { gp, tle } from './contracts';
import Callout from '../../../components/Callout';
import styles from './styles.module.sass';

const Orbit: React.FC<{
    gp?: gp,
    tles?: Array<tle>,
    sendActiveTLE: Function,
}> = (props) => {
    const { gp, tles, sendActiveTLE } = props;
    const [orbitalElements, setOrbitalElements] = useState<Array<tle>>([]);

    useEffect(() => {
        if (tles) {
            setOrbitalElements(tles)
        }

        if (gp) {
            setOrbitalElements(orbitalElements => [{
                tle_line0: gp.tle_line0,
                tle_line1: gp.tle_line1,
                tle_line2: gp.tle_line2,
                source: gp.originator
            }, ...orbitalElements]);
        }

        if (!gp && tles && tles.length) {
            sendActiveTLE(orbitalElements[0]);
        }
    }, []);

    return (
        <div className="mt-5">
            {gp &&
                <>
                    <div className="row">
                        <div className="col">
                            <Callout title="Apoapsis" content={gp.apoapsis} units="km"/>
                        </div>
                        <div className="col">
                            <Callout title="Periapsis" content={gp.periapsis} units="km"/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <Callout title="Period" content={gp.period} units="minutes"/>
                        </div>
                        <div className="col">
                            <Callout title="Inclination" content={gp.inclination} units="°"/>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <Callout title="Semi-major Axis" content={gp.semimajor_axis} units="km"/>
                        </div>
                        <div className="col">
                            <Callout title="Epoch" content={new Date(gp.epoch).toLocaleString()}/>
                        </div>
                    </div>
                </>
            }
            {orbitalElements &&
                <div className="mt-5">
                    {orbitalElements.map((tle: tle, index: number) => {
                        return (
                            <div key={index} className="mt-4">
                                <div className={styles.tle}>
                                    <p>{tle.tle_line0}</p>
                                    <p>{tle.tle_line1}</p>
                                    <p>{tle.tle_line2}</p>
                                </div>
                                <p className="font-light text-small">Source: {tle.source}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
};

export default Orbit;
