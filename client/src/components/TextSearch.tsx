import React, { useState } from 'react';
import { useEffect } from 'react';
import { VscSearch } from 'react-icons/vsc';

interface TextSearchProps {
    classes?: string,
    callback: Function,
    defaultValue?: string
};

export const TextSearch: React.FC<TextSearchProps> = ({ classes, callback, defaultValue }) => {
    return (
        <div className="flex items-center w-6/12">
            <VscSearch/>
            <input
                type="text"
                name="search-data"
                id="search-data"
                placeholder="Search by name, identifiers or keyword..."
                className={classes ? classes : 'p-3 w-full bg-primary focus:outline-none'}
                onChange={(e) => callback(e.target.value)}
                value={defaultValue}
            />
        </div>
    )
};
