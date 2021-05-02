import { useEffect, useRef, useState } from "react";

export const usePaginationQuery = (url: string) => {
    const isMounted = useRef(true);
    const [response, setResponse] = useState<any>({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');

    const fetchData = async (page: number) => {
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
        fetchData(page + direction);
    }

    const createUrl = (model: string, page: number, query?: string) => {
        return `http://localhost:4000/v1/${model}?page=${page}${query ? `&search=${query}` : ''}`;
    }

    useEffect(() => {
        if (isMounted.current) {
            setIsLoading(true);
            fetchData(page);
        }

        return () => {
            isMounted.current = false;
        }
    }, [url, page, fetchData]);

    useEffect(() => {
        setPage(0);
        fetchData(0);
    }, [search])

    return {
        response,
        error,
        isLoading,
        setPage,
        page,
        navigatePage,
        search,
        setSearch,
    };
}
