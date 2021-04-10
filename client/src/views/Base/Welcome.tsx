import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

interface IState {
    satellites: any[],
    key: {
        _id: string,
        norad_cat_id: Number,
    } | null,
}

export class Welcome extends React.Component {
    state: IState = {
        satellites: [],
        key: null,
    }

    async pageSatellites(key: any): Promise<any> {
        const res = await fetch(`http://localhost:4000/v1/satellites`, {
            method: 'post',
            body: JSON.stringify({ nextKey: key }),
        });

        const json = await res.json();

        this.setState({
            satellites: [...this.state.satellites, ...json.documents],
            key: json.nextKey,
        });
    }

    render() {
        const { satellites } = this.state;

        return (
            <div className="container">
                <InfiniteScroll
                    pageStart={1}
                    loadMore={() => this.pageSatellites(this.state.key)}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {satellites.map((item: any) => {
                        return (
                            <div key={item._id} className={styles.item}>
                                <Link to={`/satellite/${item._id}`}>
                                    <p>{item.satname}</p>
                                    <p className={styles.id}>{item.norad_cat_id} / {item.object_id}</p>
                                </Link>
                            </div>
                        )
                    })}
                </InfiniteScroll>
            </div>
        );
    }
}
