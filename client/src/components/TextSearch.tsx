import React, { useState } from 'react'
import { useEffect } from 'react';
import { VscSearch } from 'react-icons/vsc'

interface TextSearchProps {
    classes?: string,
    callback: Function
}

export const TextSearch: React.FC<TextSearchProps> = ({ classes, callback }) => {
    const [searchString, setSearchString] = useState<string>();

    useEffect(() => {
        callback(searchString);
    }, [searchString]);

    return (
        <div className="flex items-center">
            <VscSearch/>
            <input
                type="text"
                name="search-data"
                id="search-data"
                placeholder="Search by name, identifiers or keyword..."
                className={classes ? classes : 'p-3 w-5/12 md:w-10/12 bg-primary focus:outline-none'}
                onChange={(e) => setSearchString(e.target.value)}
            />
        </div>
    )
}
