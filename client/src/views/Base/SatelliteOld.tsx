import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from './satellite.module.sass';

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
                    <div className="row">
                        <div className="col-12 col-md-5">
                            <h2>{satellite.satellite.satname}</h2>
                            {/* <p>{satellite.satellite.intldes} / {satellite.satellite.norad_cat_id}</p> */}
                            <div className={styles.items}>
                                <div className={styles.item}>
                                    <span>NORAD CAT ID</span>
                                    <span>{satellite.satellite.norad_cat_id}</span>
                                </div>
                                <div className={styles.item}>
                                    <span>INTLDES</span>
                                    <span>{satellite.satellite.intldes}</span>
                                </div>
                            </div>

                            {satellite.satellite.categories &&
                                <div className={styles.categories}>
                                    {satellite.satellite.categories.map((category: string, index: number) => {
                                        return (
                                            <Link to={`/categories/${category}`} key={index}>
                                                <span>{category}</span>
                                            </Link>
                                            // {index ? ', ' : ''}
                                        )
                                    })}
                                </div>
                            }

                            <div className="mt-3">
                                <div className={styles.items}>
                                    <div>
                                        <div className={styles.item}>
                                            <span>Object Type</span>
                                            <span>{satellite.satellite.object_type}</span>
                                        </div>
                                        <div className={styles.item}>
                                            <span>Country</span>
                                            <span>{satellite.satellite.country}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={styles.item}>
                                            <span>Launch Site</span>
                                            <span>{satellite.satellite.site}</span>
                                        </div>
                                        <div className={styles.item}>
                                            <span>RCS Size</span>
                                            <span>{satellite.satellite.rcs_size}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={styles.item}>
                                            <span>Launch Year</span>
                                            <span>{satellite.satellite.launch_year}</span>
                                        </div>
                                        <div className={styles.item}>
                                            <span>Launch Number</span>
                                            <span>{satellite.satellite.launch_num}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={styles.item}>
                                            <span>Launch Piece</span>
                                            <span>{satellite.satellite.launch_piece}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {satellite.satellite.gp &&
                                <div>
                                    {/* <span className={styles.sectionTitle}>Orbital Parameters</span> */}
                                    <div className={styles.items}>
                                        <div>
                                            <div className={styles.item}>
                                                <span>Mean Motion</span>
                                                <span>{satellite.satellite.gp.mean_motion}</span>
                                            </div>
                                            <div className={styles.item}>
                                                <span>Eccentricity</span>
                                                <span>{satellite.satellite.gp.eccentricity}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={styles.item}>
                                                <span>Inclination</span>
                                                <span>{satellite.satellite.gp.inclination}</span>
                                            </div>
                                            <div className={styles.item}>
                                                <span>RA of ASC Node</span>
                                                <span>{satellite.satellite.gp.ra_of_asc_node}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={styles.item}>
                                                <span>Arg of Pericenter</span>
                                                <span>{satellite.satellite.gp.arg_of_pericenter}</span>
                                            </div>
                                            <div className={styles.item}>
                                                <span>Mean Anomaly</span>
                                                <span>{satellite.satellite.gp.mean_anomaly}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={styles.item}>
                                                <span>Rev at Epoch</span>
                                                <span>{satellite.satellite.gp.rev_at_epoch}</span>
                                            </div>
                                            <div className={styles.item}>
                                                <span>BStar</span>
                                                <span>{satellite.satellite.gp.bstar}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={styles.item}>
                                                <span>Mean Motion Dot</span>
                                                <span>{satellite.satellite.gp.mean_motion_dot}</span>
                                            </div>
                                            <div className={styles.item}>
                                                <span>Semimajor Axis</span>
                                                <span>{satellite.satellite.gp.semimajor_axis}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={styles.item}>
                                                <span>Period</span>
                                                <span>{satellite.satellite.gp.period}</span>
                                            </div>
                                            <div className={styles.item}>
                                                <span>Apoapsis</span>
                                                <span>{satellite.satellite.gp.apoapsis}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className={styles.item}>
                                                <span>Periapsis</span>
                                                <span>{satellite.satellite.gp.periapsis}</span>
                                            </div>
                                            <div className={styles.item}>
                                                <span>Epoch</span>
                                                <span>{satellite.satellite.gp.epoch}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className="mt-3" style={{ maxWidth: '700px' }}>
                                {satellite.satellite.data && satellite.satellite.data.description &&
                                    <p className="text-small">
                                        {satellite.satellite.data.description}
                                    </p>
                                }
                            </div>
                            <div className="my-5 text-small" style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
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
                        <div className="col-6">

                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default Satellite;

