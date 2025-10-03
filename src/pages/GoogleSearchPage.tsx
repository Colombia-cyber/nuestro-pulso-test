import React, { useState } from 'react';

const GoogleSearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [didYouMean, setDidYouMean] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/search?q=${query}`);
            const data = await response.json();
            setResults(data.results);
            setDidYouMean(data.didYouMean);
        } catch (err) {
            setError('Failed to fetch results');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Google-Style Search</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {didYouMean && <p>Did you mean: {didYouMean}</p>}
            <div>
                <h2>Results ({results.length})</h2>
                {/* Render results here */}
            </div>
        </div>
    );
};

export default GoogleSearchPage;