import React, { useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { usePageStore } from '../../store/GlobalStore';

const Welcome: React.FC = () => {
    const pageState = usePageStore();

    const [satList, setSatList] = useState([]);
    const [page, setPage] = useState<number>((pageState.satellites && pageState.satellites.page) || 0);
    const [scrollY, setScroll] = useState<number>((pageState.satellites && pageState.satellites.scrollY) || 0);

    const getSatellites: any = async (pageNumber: number = page, initial: boolean = false): Promise<any> => {
        fetch(`http://localhost:4000/v1/satellites?page=${pageNumber}${initial ? '&initial=true' : ''}`)
            .then(res => res.json())
            .then(res => {
                setSatList(satList.concat(res.data));
                setPage(pageNumber + 1);

                if (initial) {
                    window.scrollTo(0, scrollY);
                }

                pageState.satellites.page = pageNumber;
            });
    }

    const updateScrollPosition: any = () => {
        setScroll(window.scrollY);
        pageState.satellites.scrollY = window.scrollY;
    }

    useEffect(() => {
        getSatellites(pageState.satellites.page, true);
    }, [pageState.satellites.page]);

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
