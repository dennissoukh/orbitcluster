import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useOperatorsPageStore = create(
    combine(
        { metadata: {
            page: 0,
            perPage: 0,
            pages: 0,
            count: 0,
            skip: 0,
            pageCount: 0,
        }},
        (set) => ({
            setMetadata: (metadata: any) => set(() => ({ metadata })),
        })
    )
);
