import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useStore = create(
    combine(
        { metadata: {
            page: 0,
            perPage: 0,
            pages: 0,
            count: 0,
            skip: 0,
            pageCount: 0,
        }, search: '' },
        (set) => ({
            setMetadata: (meme: any) => set(() => ({ metadata: meme })),
            setSearch: (query: any) => set(() => ({ search: query }))
        })
    )
);
