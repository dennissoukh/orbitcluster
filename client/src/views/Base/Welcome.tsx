import React, { useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import {  usePageStore } from '../../store/GlobalStore';

const Welcome: React.FC = () => {
    const [satList, setSatList] = useState([]);
    const [page, setPage] = useState<number>((window.history.state && window.history.state.page) || 0);
    const [scrollY, setScroll] = useState<number>((window.history.state && window.history.state.scrollY) || 0);
    const test = usePageStore();

    const getSatellites: any = async (pageNumber: number = page, initial: boolean = false): Promise<any> => {
        fetch(`http://localhost:4000/v1/satellites?page=${pageNumber}${initial ? '&initial=true' : ''}`)
            .then(res => res.json())
            .then(res => {
                setSatList(satList.concat(res.data));
                setPage(pageNumber + 1);

                if (initial) {
                    window.scrollTo(0, test.satellites.scrollY);
                }

                test.satellites.scrollY = window.scrollY;
                test.satellites.page = pageNumber + 1;
            });
    }

    const updateScrollPosition: any = () => {
        test.satellites.scrollY = window.scrollY;
    }

    useEffect(() => {
        setPage(test.satellites.page);
        setScroll(test.satellites.scrollY);

        getSatellites(test.satellites.page, true);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', updateScrollPosition, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateScrollPosition);
        }
    }, []);

    return (
        <div className="container mt-5">
            <h3>Satellites</h3>
            <div className="mt-4">
                <InfiniteScroll
                    dataLength={satList.length}
                    next={getSatellites}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollThreshold={"20px"}
                >
                    {satList.map((item: any) => {
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
        </div>
    );
};

export default Welcome;
