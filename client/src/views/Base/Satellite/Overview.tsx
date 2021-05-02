import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { satellite } from './contracts';
import Callout from '../../../components/Callout';
import styles from './styles.module.sass';
import { dateToString } from '../../../helpers/Date';

const Overview: React.FC<{ satellite: satellite }> = (props) => {
    const { satellite } = props;

    useEffect(() => {
        console.log(satellite)
    })

    return (
        <>
            {satellite.categories &&
                <div className="mt-3">
                    <div className={styles.categories}>
                        {satellite.categories.map((category: string, index: number) => {
                            return (
                                <Link to={`/categories/${category}`} key={index}>
                                    <span>{category}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            }
            <div className="mt-5">
                <div className="row">
                    <div className="col-6">
                        <Callout title="INTLDES" content={satellite.intldes}/>
                    </div>
                    <div className="col-6">
                        <Callout title="NORAD CAT ID" content={satellite.norad_cat_id}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">

                        <Callout title="Launch Site" content={satellite.site} link={`/launch-site/${satellite.site}`}/>
                    </div>
                    <div className="col-6">
                        <Callout title="Launch Date" content={dateToString(satellite.launch)}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <Callout title="Launch Number" content={satellite.launch_num}/>
                    </div>
                    <div className="col-6">
                        <Callout title="Launch Piece" content={satellite.launch_piece}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <Callout title="Object Type" content={satellite.object_type}/>
                    </div>
                    <div className="col-6">
                        <Callout title="Country" content={satellite.country} link={`/operators/${satellite.country}`}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview;
