import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSingleQuery } from '../../hooks/useSingleQuery';
import { satellite, tle } from '../../types/satellite';
import { OrbitMap } from './OrbitMap';
import { Details } from './Details';
import { GeneralPerturbation } from './GeneralPerturbation';
import { TLE } from './TLE';
import { Radio } from './Radio';

export const Satellite: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<satellite | undefined>();
    const [orbitElements, setOrbitElements] = useState<Array<tle>>([]);
    const [activeElement, setActiveElement] = useState<tle | undefined>();

    const { response, isLoading, error } = useSingleQuery('satellites', id);

    const collateTles = (data: satellite) => {
        if (data && data.tles) {
            setOrbitElements(data.tles);
        }

        if (data && data.gp) {
            const gp = {
                tle_line0: data.gp.tle_line0,
                tle_line1: data.gp.tle_line1,
                tle_line2: data.gp.tle_line2,
                source: data.gp.originator,
            }

            setOrbitElements([gp, ...data.tles]);
        }
    }

    const updateActiveElement = (tle: tle) => {
        setActiveElement(tle);
    }

    useEffect(() => {
        if (!isLoading && !error && response) {
            setData(response.data);
            collateTles(response.data);
        }
    }, [isLoading, error, response.data]);

    useEffect(() => {
        setActiveElement(orbitElements[0]);
    }, [orbitElements])

    return (
        <>
            {data &&
                <>
                    {activeElement && !data.decay &&
                        <OrbitMap tle={activeElement}/>
                    }
                    <div className="px-4 md:px-7 py-5">
                        <h4 className="font-medium">{data.object_name}</h4>

                        {data.data && data.data.alternate_name &&
                            <p className="text-sm text-muted">{data.data.alternate_name}, {data.data.official_name}</p>
                        }

                        {data.categories &&
                            <div className="flex flex-wrap mt-3">
                                {data.categories.map((category, index) => {
                                    return (
                                        <Link
                                            to={`/categories/${category}`}
                                            key={index}
                                            className="uppercase py-1 px-3 mr-2 border border-solid border-gray rounded-full text-xs"
                                        >{category}</Link>
                                    )
                                })}
                            </div>
                        }

                        <div className="flex flex-wrap overflow-hidden -mx-4">
                            <div className="w-full overflow-hidden lg:w-1/2 px-4">
                                <Details satellite={data}/>
                            </div>
                            <div className="w-full overflow-hidden lg:w-1/2 px-4">
                                {activeElement &&
                                    <GeneralPerturbation tle={activeElement}/>
                                }
                                {orbitElements &&
                                    <TLE tles={orbitElements} setActiveTle={updateActiveElement}/>
                                }
                                {data.data?.radio && activeElement &&
                                    <Radio radio={data.data.radio}/>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
