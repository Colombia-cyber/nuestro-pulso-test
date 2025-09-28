import React from 'react';

const LocalReelCard = () => {
    const reelApi = process.env.REACT_APP_REEL_API; // Use the REEL_API environment variable

    const handleSearch = (query: string) => {
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    };

    return (
        <div role="button" onClick={() => handleSearch('Local Reel Title')} tabIndex={0} aria-label="Search local reel title">
            <h3>Local Reel Title</h3>
            <p>Details of the local reel go here.</p>
        </div>
    );
};

export const LocalReelCardDemo = () => <LocalReelCard />;