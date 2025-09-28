import React from 'react';

const TrendingCard = () => {
    // Instant Google search logic
    const handleSearch = (query: string) => {
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    };

    return (
        <div role="button" onClick={() => handleSearch('Trending Topic')} tabIndex={0} aria-label="Search trending topic">
            <h3>Trending Topic</h3>
            <p>Explore the latest trending topics!</p>
        </div>
    );
};

export const TrendingCardDemo = () => <TrendingCard />;