import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSingleQuery } from '../../hooks/useSingleQuery';
import { satellite, tle } from '../../types/satellite';
import { OrbitMap } from './OrbitMap';

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
                    {activeElement &&
                        <OrbitMap tle={activeElement}/>
                    }
                    <h3>{data.object_name}</h3>
                </>
            }
        </>
    )
}
