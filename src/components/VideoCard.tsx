import React from 'react';

const VideoCard = () => {
    const handleSearch = (query: string) => {
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    };

    return (
        <div role="button" onClick={() => handleSearch('Video Title')} tabIndex={0} aria-label="Search video title">
            <h3>Video Title</h3>
            <p>Description of the video goes here.</p>
        </div>
    );
};

export const VideoCardDemo = () => <VideoCard />;