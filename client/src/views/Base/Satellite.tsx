import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface satellite {
    satellite: any,
}

const Satellite: React.FC = (props: any) => {
    const { id } = useParams<{ id: string }>();
    const [satellite, setSatellite] = useState<satellite>();

    const getSatellite: any = async (id: string): Promise<any> => {
        fetch(`http://localhost:4000/v1/satellites/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setSatellite(res);
            });
    }

    useEffect(() => {
        getSatellite(id);
    }, [id]);

    return (
        <div className="container mt-5">
            {satellite?.satellite &&
                <div>
                    <h2>{satellite.satellite.satname}</h2>
                    <p>{satellite.satellite.intldes} / {satellite.satellite.norad_cat_id}</p>
                    <p>{satellite.satellite.categories && satellite.satellite.categories.map((category: string, index: number) => {
                        return (
                            <Link to={`/categories/${category}`} key={index}>
                                <span className="text-small">{index ? ', ' : ''}{category}</span>
                            </Link>
                        )
                    })}</p>
                    <div className="mt-3" style={{ maxWidth: '700px' }}>
                        {satellite.satellite.data && satellite.satellite.data.description &&
                            <p className="text-small">
                                {satellite.satellite.data.description}
                            </p>
                        }
                    </div>
                    <div className="mt-3 text-small" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                        {satellite.satellite.gp &&
                            <div>
                                <p>{satellite.satellite.gp.tle_line0}</p>
                                <p>{satellite.satellite.gp.tle_line1}</p>
                                <p>{satellite.satellite.gp.tle_line2}</p>
                                <p>Source: 18 SPCS</p>
                            </div>
                        }
                        {satellite.satellite.tles && satellite.satellite.tles.map((tle: any, index: number) => {
                            return (
                                <div className="mt-3" key={index}>
                                    <p>{tle.tle_line0}</p>
                                    <p>{tle.tle_line1}</p>
                                    <p>{tle.tle_line2}</p>
                                    <p>Source: {tle.source}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default Satellite;

