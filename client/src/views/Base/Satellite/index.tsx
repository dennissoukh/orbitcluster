import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { satellite, tle } from "./contracts";
import Orbit from "./Orbit";
import Overview from "./Overview";

const Satellite: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [satellite, setSatellite] = useState<satellite>();
    const [activeTLE, setActiveTLE] = useState<tle>();

    const sendActiveTLE = (tle: tle) => {
        setActiveTLE(tle);
    }

    const getSatellite: any = async (id: string): Promise<any> => {
        fetch(`http://localhost:4000/v1/satellites/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setSatellite(res.satellite);
            });
    }

    useEffect(() => {
        getSatellite(id);
    }, [id]);

    return (
        <div className="container mt-5">
            {satellite &&
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <h2>{satellite.satname}</h2>
                        <Overview satellite={satellite}/>
                        {satellite.gp && satellite.tles.length
                            ? <Orbit gp={satellite.gp} tles={satellite.tles} sendActiveTLE={sendActiveTLE}/>
                            : (satellite.gp && !satellite.tles.length
                                ? <Orbit gp={satellite.gp} sendActiveTLE={sendActiveTLE}/>
                                : <Orbit tles={satellite.tles} sendActiveTLE={sendActiveTLE}/>
                            )
                        }
                    </div>
                    <div className="col-6">

                    </div>
                </div>
            }
            {satellite?.data?.description &&
                <div className="text-small">{satellite.data.description}</div>
            }
        </div>
    );
}

export default Satellite;
