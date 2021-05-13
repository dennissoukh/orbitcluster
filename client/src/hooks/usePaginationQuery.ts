import { useEffect, useRef, useState } from "react";
import { pagination } from "../types/pagination";
import { config } from '../../app.config';

export const usePaginationQuery = (url: string, metadata?: pagination, search: string = '') => {
    const isMounted = useRef(true);
    const [response, setResponse] = useState<any>({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);

    const fetchData = async (page: number, search: string) => {
        try {
            const urlQuery = createUrl(url, page, search);
            const res = await fetch(urlQuery);
            const data = await res.json();
            setIsLoading(false);
            setResponse({
                endpoint: url,
                status: 200,
                error: false,
                type: Array.isArray(data.data) ? 'array' : typeof data,
                length: data.data.length,
                data: data.data,
                metadata: data.metadata,
            });
        } catch (err) {
            setIsLoading(false);
            setError(err);
        }
    }

    // Callback function to set and navigate to a page
    const navigatePage = (direction: number = 1) => {
        setPage(page + direction);
        fetchData(page + direction, search || '');
    }

    const createUrl = (model: string, page: number, query?: string) => {
        return `${config.url.API_URL}/${model}?page=${page}${query ? `&search=${query}` : ''}`;
    }

    useEffect(() => {
        if (metadata && isMounted.current) {
            setPage(metadata.page);
            setIsLoading(true);
            fetchData(metadata.page, search);
        }
        return () => {
            isMounted.current = false;
        }
    });

    useEffect(() => {
        if (search && metadata && isMounted.current && !isLoading) {
            fetchData(0, search);
        }
    }, [search]);

    return {
        response,
        error,
        isLoading,
        setPage,
        page,
        navigatePage,
        search,
        setSearch: () => { return; },
    };
}
