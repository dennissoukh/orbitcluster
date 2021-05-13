import React, { useEffect, useRef, useState } from 'react';
import { config } from '../../app.config';

export const useSingleQuery = (model: string, id: string) => {
    const isMounted = useRef(true);
    const [response, setResponse] = useState<any>({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            const url = `${config.url.API_URL}/${model}/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            setIsLoading(false);
            setResponse({
                endpoint: url,
                status: 200,
                error: false,
                data: data.data,
                metadata: data.metadata,
            });
        } catch (error) {
            setIsLoading(false);
            setError(error);
        }
    }

    useEffect(() => {
        if (isMounted.current) {
            setIsLoading(true);
            fetchData();
        }

        return () => {
            isMounted.current = false;
        }
    }, [model, id]);

    return {
        response,
        error,
        isLoading,
    }
}
