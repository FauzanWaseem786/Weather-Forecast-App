import React from 'react';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Enter city name..."
                onKeyDown={onSearch}
            />
        </div>
    );
};

export default SearchBar;


