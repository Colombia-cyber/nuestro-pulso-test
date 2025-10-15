import React from 'react';

/**
 * Local Reel Card Component
 * 
 * IMPORTANT: This is frontend code, uses import.meta.env.VITE_*
 * 
 * Environment Variables Used:
 * - VITE_REEL_API: Backend API endpoint for PulseReels
 */

const LocalReelCard = () => {
    // Get REEL_API environment variable (VITE_ prefix for frontend)
    const reelApi = import.meta.env.VITE_REEL_API || 'http://localhost:3001/api/reels';
    
    if (!import.meta.env.VITE_REEL_API) {
        console.warn('⚠️ VITE_REEL_API not configured. Using default:', reelApi);
    }

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