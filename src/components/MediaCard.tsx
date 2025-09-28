import React from 'react';

const MediaCard = () => {
    const handleSearch = (query: string) => {
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    };

    return (
        <div role="button" onClick={() => handleSearch('Media Title')} tabIndex={0} aria-label="Search media title">
            <h3>Media Title</h3>
            <p>Description of the media goes here.</p>
        </div>
    );
};

export const MediaCardDemo = () => <MediaCard />;