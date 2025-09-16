/**
 * Search UI JavaScript Module
 * Handles search functionality, API integration, and dynamic content rendering
 * with JSON-LD structured data support
 */

// Configuration and Constants
const SEARCH_CONFIG = {
    // TODO: Replace with actual API endpoints
    API_BASE_URL: 'https://api.nuestro-pulso.com', // Replace with actual API URL
    ENDPOINTS: {
        search: '/search',
        topStories: '/top-stories',
        suggest: '/suggest'
    },
    
    // Search parameters
    RESULTS_PER_PAGE: 10,
    TOP_STORIES_LIMIT: 8,
    DEBOUNCE_DELAY: 300,
    
    // Default favicon for results without one
    DEFAULT_FAVICON: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" fill="%23ddd"/></svg>'
};

// Global state
let currentQuery = '';
let currentPage = 1;
let currentFilter = 'all';
let searchTimeout = null;
let currentResults = [];
let totalResults = 0;

// DOM Elements
let elements = {};

/**
 * Initialize the search interface
 */
function initializeSearch() {
    console.log('Initializing search interface...');
    
    // Cache DOM elements
    cacheElements();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial content
    loadInitialContent();
    
    // Handle URL parameters if any
    handleUrlParameters();
    
    console.log('Search interface initialized successfully');
}

/**
 * Cache frequently used DOM elements
 */
function cacheElements() {
    elements = {
        searchForm: document.querySelector('.search-form'),
        searchInput: document.getElementById('search-input'),
        searchButton: document.querySelector('.search-button'),
        filterButtons: document.querySelectorAll('.filter-button'),
        resultsCount: document.getElementById('results-count'),
        searchTime: document.getElementById('search-time'),
        topStoriesContainer: document.getElementById('top-stories-scroll'),
        resultsContainer: document.getElementById('results-container'),
        loading: document.getElementById('loading'),
        noResults: document.getElementById('no-results'),
        pagination: document.getElementById('pagination'),
        paginationPrev: document.querySelector('.pagination-prev'),
        paginationNext: document.querySelector('.pagination-next'),
        paginationNumbers: document.querySelector('.pagination-numbers'),
        scrollLeft: document.getElementById('scroll-left'),
        scrollRight: document.getElementById('scroll-right')
    };
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Search form submission
    elements.searchForm.addEventListener('submit', handleSearch);
    
    // Search input changes (with debouncing)
    elements.searchInput.addEventListener('input', debounce(handleSearchInput, SEARCH_CONFIG.DEBOUNCE_DELAY));
    
    // Filter buttons
    elements.filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterChange);
    });
    
    // Top stories scroll buttons
    elements.scrollLeft.addEventListener('click', () => scrollTopStories('left'));
    elements.scrollRight.addEventListener('click', () => scrollTopStories('right'));
    
    // Pagination
    elements.paginationPrev.addEventListener('click', () => changePage(currentPage - 1));
    elements.paginationNext.addEventListener('click', () => changePage(currentPage + 1));
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Window events
    window.addEventListener('popstate', handleUrlParameters);
}

/**
 * Load initial content (top stories)
 */
async function loadInitialContent() {
    try {
        showLoading(true);
        
        // Load top stories
        const topStories = await fetchTopStories();
        renderTopStories(topStories);
        
        // If there's a query in URL, perform search
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            elements.searchInput.value = query;
            await performSearch(query);
        }
        
    } catch (error) {
        console.error('Error loading initial content:', error);
        showError('Error loading content. Please try again.');
    } finally {
        showLoading(false);
    }
}

/**
 * Handle search form submission
 */
function handleSearch(event) {
    event.preventDefault();
    const query = elements.searchInput.value.trim();
    
    if (query) {
        performSearch(query);
        updateURL(query);
    }
}

/**
 * Handle search input changes
 */
function handleSearchInput(event) {
    const query = event.target.value.trim();
    
    if (query.length >= 2) {
        // TODO: Implement search suggestions/autocomplete
        // fetchSearchSuggestions(query);
    }
}

/**
 * Handle filter button changes
 */
function handleFilterChange(event) {
    const button = event.target;
    const filter = button.dataset.filter;
    
    // Update active filter
    elements.filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    currentFilter = filter;
    currentPage = 1;
    
    // Re-perform search with new filter
    if (currentQuery) {
        performSearch(currentQuery);
    }
}

/**
 * Perform search with the given query
 */
async function performSearch(query, page = 1) {
    try {
        showLoading(true);
        hideNoResults();
        
        const startTime = performance.now();
        
        // TODO: Replace with actual API call
        const results = await fetchSearchResults(query, page, currentFilter);
        
        const endTime = performance.now();
        const searchTime = ((endTime - startTime) / 1000).toFixed(2);
        
        currentQuery = query;
        currentPage = page;
        currentResults = results.items || [];
        totalResults = results.total || 0;
        
        // Update UI
        updateSearchInfo(totalResults, searchTime);
        renderSearchResults(currentResults);
        updatePagination();
        
        // Add structured data for each result
        addStructuredData(currentResults);
        
        if (currentResults.length === 0) {
            showNoResults();
        }
        
    } catch (error) {
        console.error('Search error:', error);
        showError('Search failed. Please try again.');
        showNoResults();
    } finally {
        showLoading(false);
    }
}

/**
 * Mock API call for search results
 * TODO: Replace with actual API integration
 */
async function fetchSearchResults(query, page = 1, filter = 'all') {
    // TODO: Replace this mock implementation with actual API calls
    // Examples for different search backends:
    
    /* 
    // ALGOLIA INTEGRATION EXAMPLE:
    const algoliaClient = algoliasearch('YOUR_APP_ID', 'YOUR_SEARCH_API_KEY');
    const index = algoliaClient.initIndex('nuestro_pulso_content');
    
    const searchParams = {
        query,
        page: page - 1, // Algolia uses 0-based indexing
        hitsPerPage: SEARCH_CONFIG.RESULTS_PER_PAGE,
        filters: filter !== 'all' ? `type:${filter}` : ''
    };
    
    const response = await index.search(query, searchParams);
    return {
        items: response.hits.map(hit => ({
            id: hit.objectID,
            title: hit.title,
            snippet: hit.excerpt,
            url: hit.url,
            domain: hit.domain,
            favicon: hit.favicon,
            publishedDate: hit.publishedDate,
            author: hit.author,
            tags: hit.tags || [],
            type: hit.type
        })),
        total: response.nbHits
    };
    */
    
    /*
    // TYPESENSE INTEGRATION EXAMPLE:
    const typesenseClient = new Typesense.Client({
        nodes: [{
            host: 'YOUR_TYPESENSE_HOST',
            port: '443',
            protocol: 'https'
        }],
        apiKey: 'YOUR_SEARCH_API_KEY',
        connectionTimeoutSeconds: 2
    });
    
    const searchParams = {
        q: query,
        query_by: 'title,content,tags',
        page,
        per_page: SEARCH_CONFIG.RESULTS_PER_PAGE,
        sort_by: '_text_match:desc,publishedDate:desc'
    };
    
    if (filter !== 'all') {
        searchParams.filter_by = `type:${filter}`;
    }
    
    const response = await typesenseClient.collections('content').documents().search(searchParams);
    return {
        items: response.hits.map(hit => ({
            id: hit.document.id,
            title: hit.document.title,
            snippet: hit.document.excerpt,
            url: hit.document.url,
            domain: hit.document.domain,
            favicon: hit.document.favicon,
            publishedDate: hit.document.publishedDate,
            author: hit.document.author,
            tags: hit.document.tags || [],
            type: hit.document.type
        })),
        total: response.found
    };
    */
    
    /*
    // ELASTICSEARCH INTEGRATION EXAMPLE:
    const elasticsearchClient = new elasticsearch.Client({
        host: 'YOUR_ELASTICSEARCH_HOST',
        apiVersion: '7.x'
    });
    
    const body = {
        query: {
            bool: {
                must: [{
                    multi_match: {
                        query,
                        fields: ['title^3', 'content^2', 'tags']
                    }
                }],
                filter: filter !== 'all' ? [{ term: { type: filter } }] : []
            }
        },
        sort: [
            { _score: { order: 'desc' } },
            { publishedDate: { order: 'desc' } }
        ],
        from: (page - 1) * SEARCH_CONFIG.RESULTS_PER_PAGE,
        size: SEARCH_CONFIG.RESULTS_PER_PAGE,
        highlight: {
            fields: {
                content: {
                    fragment_size: 150,
                    number_of_fragments: 1
                }
            }
        }
    };
    
    const response = await elasticsearchClient.search({
        index: 'nuestro_pulso_content',
        body
    });
    
    return {
        items: response.body.hits.hits.map(hit => ({
            id: hit._id,
            title: hit._source.title,
            snippet: hit.highlight?.content?.[0] || hit._source.excerpt,
            url: hit._source.url,
            domain: hit._source.domain,
            favicon: hit._source.favicon,
            publishedDate: hit._source.publishedDate,
            author: hit._source.author,
            tags: hit._source.tags || [],
            type: hit._source.type
        })),
        total: response.body.hits.total.value
    };
    */
    
    // Mock data for demonstration
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    const mockResults = generateMockResults(query, page, filter);
    return mockResults;
}

/**
 * Mock API call for top stories
 * TODO: Replace with actual API integration
 */
async function fetchTopStories() {
    // TODO: Replace with actual API call
    // Example: const response = await fetch(`${SEARCH_CONFIG.API_BASE_URL}${SEARCH_CONFIG.ENDPOINTS.topStories}`);
    
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    
    return [
        {
            id: '1',
            title: 'Nuevas medidas económicas anunciadas por el gobierno',
            url: 'https://example.com/news/1',
            image: 'https://picsum.photos/400/200?random=1',
            source: 'El Tiempo',
            favicon: 'https://www.eltiempo.com/favicon.ico',
            publishedDate: new Date().toISOString()
        },
        {
            id: '2',
            title: 'Avances en la infraestructura de transporte público',
            url: 'https://example.com/news/2',
            image: 'https://picsum.photos/400/200?random=2',
            source: 'El Espectador',
            favicon: 'https://www.elespectador.com/favicon.ico',
            publishedDate: new Date(Date.now() - 3600000).toISOString()
        },
        {
            id: '3',
            title: 'Reforma educativa: principales cambios propuestos',
            url: 'https://example.com/news/3',
            image: 'https://picsum.photos/400/200?random=3',
            source: 'Semana',
            favicon: 'https://www.semana.com/favicon.ico',
            publishedDate: new Date(Date.now() - 7200000).toISOString()
        },
        {
            id: '4',
            title: 'Medidas ambientales para proteger la biodiversidad',
            url: 'https://example.com/news/4',
            image: 'https://picsum.photos/400/200?random=4',
            source: 'Portafolio',
            favicon: 'https://www.portafolio.co/favicon.ico',
            publishedDate: new Date(Date.now() - 10800000).toISOString()
        }
    ];
}

/**
 * Generate mock search results for demonstration
 */
function generateMockResults(query, page, filter) {
    const allResults = [
        {
            id: '1',
            title: `Análisis político: ${query} en el contexto actual`,
            snippet: `Un análisis profundo sobre ${query} y su impacto en la política colombiana. Este artículo examina las implicaciones y propone soluciones innovadoras para los desafíos actuales.`,
            url: 'https://example.com/analysis/1',
            domain: 'ejemplo.com',
            favicon: 'https://ejemplo.com/favicon.ico',
            publishedDate: new Date().toISOString(),
            author: 'María González',
            tags: ['política', 'análisis', 'Colombia'],
            type: 'articles'
        },
        {
            id: '2',
            title: `Últimas noticias sobre ${query}`,
            snippet: `Cobertura completa de los últimos desarrollos relacionados con ${query}. Información actualizada y verificada de fuentes confiables.`,
            url: 'https://example.com/news/2',
            domain: 'noticias.com',
            favicon: 'https://noticias.com/favicon.ico',
            publishedDate: new Date(Date.now() - 3600000).toISOString(),
            author: 'Carlos Rodríguez',
            tags: ['noticias', 'actualidad'],
            type: 'news'
        },
        {
            id: '3',
            title: `Video: Explicación detallada sobre ${query}`,
            snippet: `Video educativo que explica los aspectos más importantes de ${query} de manera clara y accesible para todos los públicos.`,
            url: 'https://example.com/video/3',
            domain: 'videos.com',
            favicon: 'https://videos.com/favicon.ico',
            publishedDate: new Date(Date.now() - 7200000).toISOString(),
            author: 'Ana Martínez',
            tags: ['video', 'educación'],
            type: 'videos'
        },
        {
            id: '4',
            title: `Reportaje especial: ${query} y su impacto social`,
            snippet: `Un reportaje exhaustivo que analiza cómo ${query} afecta a diferentes sectores de la sociedad colombiana y propone perspectivas de futuro.`,
            url: 'https://example.com/report/4',
            domain: 'reportajes.com',
            favicon: 'https://reportajes.com/favicon.ico',
            publishedDate: new Date(Date.now() - 10800000).toISOString(),
            author: 'Luis Herrera',
            tags: ['reportaje', 'sociedad'],
            type: 'articles'
        }
    ];
    
    // Filter results based on type
    let filteredResults = allResults;
    if (filter !== 'all') {
        filteredResults = allResults.filter(result => result.type === filter);
    }
    
    // Simulate pagination
    const startIndex = (page - 1) * SEARCH_CONFIG.RESULTS_PER_PAGE;
    const endIndex = startIndex + SEARCH_CONFIG.RESULTS_PER_PAGE;
    const pageResults = filteredResults.slice(startIndex, endIndex);
    
    return {
        items: pageResults,
        total: filteredResults.length + Math.floor(Math.random() * 100) // Simulate more results
    };
}

/**
 * Render top stories in the carousel
 */
function renderTopStories(stories) {
    if (!stories || stories.length === 0) {
        elements.topStoriesContainer.innerHTML = '<p>No hay historias destacadas disponibles.</p>';
        return;
    }
    
    const storiesHTML = stories.map(story => `
        <a href="${story.url}" class="story-card" target="_blank" rel="noopener noreferrer">
            <img src="${story.image}" alt="${story.title}" class="story-image" loading="lazy">
            <div class="story-content">
                <h3 class="story-title">${escapeHtml(story.title)}</h3>
                <div class="story-source">
                    <img src="${story.favicon || SEARCH_CONFIG.DEFAULT_FAVICON}" alt="${story.source}" class="story-favicon" loading="lazy">
                    <span>${escapeHtml(story.source)}</span>
                </div>
            </div>
        </a>
    `).join('');
    
    elements.topStoriesContainer.innerHTML = storiesHTML;
}

/**
 * Render search results
 */
function renderSearchResults(results) {
    if (!results || results.length === 0) {
        elements.resultsContainer.innerHTML = '';
        return;
    }
    
    const resultsHTML = results.map(result => `
        <a href="${result.url}" class="result-item" target="_blank" rel="noopener noreferrer">
            <div class="result-header">
                <img src="${result.favicon || SEARCH_CONFIG.DEFAULT_FAVICON}" alt="${result.domain}" class="result-favicon" loading="lazy">
                <span class="result-domain">${escapeHtml(result.domain)}</span>
                <span class="result-date">${formatDate(result.publishedDate)}</span>
            </div>
            <h3 class="result-title">${escapeHtml(result.title)}</h3>
            <p class="result-snippet">${escapeHtml(result.snippet)}</p>
            ${result.tags && result.tags.length > 0 ? `
                <div class="result-tags">
                    ${result.tags.map(tag => `<span class="result-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            ` : ''}
        </a>
    `).join('');
    
    elements.resultsContainer.innerHTML = resultsHTML;
}

/**
 * Add JSON-LD structured data for search results
 */
function addStructuredData(results) {
    // Remove any existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"].search-result');
    existingScripts.forEach(script => script.remove());
    
    results.forEach(result => {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": result.type === 'news' ? "NewsArticle" : "Article",
            "headline": result.title,
            "url": result.url,
            "datePublished": result.publishedDate,
            "description": result.snippet,
            "author": {
                "@type": "Person",
                "name": result.author || "Unknown"
            },
            "publisher": {
                "@type": "Organization",
                "name": result.domain,
                "url": `https://${result.domain}`
            }
        };
        
        // Add additional properties for NewsArticle
        if (result.type === 'news') {
            structuredData.dateModified = result.publishedDate;
            structuredData.articleSection = result.tags?.[0] || 'General';
        }
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.className = 'search-result';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    });
}

/**
 * Update search information display
 */
function updateSearchInfo(total, time) {
    elements.resultsCount.textContent = `Aproximadamente ${total.toLocaleString()} resultados`;
    elements.searchTime.textContent = `(${time} segundos)`;
}

/**
 * Update pagination controls
 */
function updatePagination() {
    const totalPages = Math.ceil(totalResults / SEARCH_CONFIG.RESULTS_PER_PAGE);
    
    // Update previous/next buttons
    elements.paginationPrev.disabled = currentPage <= 1;
    elements.paginationNext.disabled = currentPage >= totalPages;
    
    // Generate page numbers
    const pageNumbers = generatePageNumbers(currentPage, totalPages);
    const numbersHTML = pageNumbers.map(page => {
        if (page === '...') {
            return '<span class="pagination-ellipsis">...</span>';
        }
        return `
            <button class="pagination-number ${page === currentPage ? 'active' : ''}" 
                    onclick="changePage(${page})" 
                    aria-label="Página ${page}">
                ${page}
            </button>
        `;
    }).join('');
    
    elements.paginationNumbers.innerHTML = numbersHTML;
    
    // Show/hide pagination
    elements.pagination.style.display = totalPages > 1 ? 'flex' : 'none';
}

/**
 * Generate page numbers for pagination
 */
function generatePageNumbers(current, total) {
    const pages = [];
    const delta = 2; // Number of pages to show around current page
    
    if (total <= 7) {
        // Show all pages if total is small
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        // Show first page
        pages.push(1);
        
        // Add ellipsis if needed
        if (current > delta + 2) {
            pages.push('...');
        }
        
        // Add pages around current
        const start = Math.max(2, current - delta);
        const end = Math.min(total - 1, current + delta);
        
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        
        // Add ellipsis if needed
        if (current < total - delta - 1) {
            pages.push('...');
        }
        
        // Show last page
        if (total > 1) {
            pages.push(total);
        }
    }
    
    return pages;
}

/**
 * Change to a specific page
 */
function changePage(page) {
    if (page < 1 || page > Math.ceil(totalResults / SEARCH_CONFIG.RESULTS_PER_PAGE)) {
        return;
    }
    
    if (currentQuery) {
        performSearch(currentQuery, page);
    }
    
    // Scroll to top of results
    elements.resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Scroll top stories carousel
 */
function scrollTopStories(direction) {
    const container = elements.topStoriesContainer;
    const scrollAmount = 320; // Width of one card plus gap
    
    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(event) {
    // Handle escape key to clear search
    if (event.key === 'Escape') {
        elements.searchInput.blur();
    }
    
    // Handle arrow keys for top stories navigation
    if (document.activeElement === elements.topStoriesContainer) {
        if (event.key === 'ArrowLeft') {
            scrollTopStories('left');
        } else if (event.key === 'ArrowRight') {
            scrollTopStories('right');
        }
    }
}

/**
 * Handle URL parameters for deep linking
 */
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const page = parseInt(urlParams.get('page')) || 1;
    const filter = urlParams.get('filter') || 'all';
    
    if (query) {
        elements.searchInput.value = query;
        currentPage = page;
        currentFilter = filter;
        
        // Update filter button
        elements.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        performSearch(query, page);
    }
}

/**
 * Update URL with search parameters
 */
function updateURL(query, page = 1, filter = 'all') {
    const url = new URL(window.location);
    url.searchParams.set('q', query);
    
    if (page > 1) {
        url.searchParams.set('page', page);
    } else {
        url.searchParams.delete('page');
    }
    
    if (filter !== 'all') {
        url.searchParams.set('filter', filter);
    } else {
        url.searchParams.delete('filter');
    }
    
    window.history.pushState({}, '', url);
}

/**
 * Show/hide loading state
 */
function showLoading(show) {
    elements.loading.classList.toggle('hidden', !show);
}

/**
 * Show/hide no results state
 */
function showNoResults() {
    elements.noResults.classList.remove('hidden');
    elements.resultsContainer.innerHTML = '';
}

function hideNoResults() {
    elements.noResults.classList.add('hidden');
}

/**
 * Show error message
 */
function showError(message) {
    // Simple error display - in production, use a proper notification system
    console.error(message);
    alert(message);
}

/**
 * Utility function to escape HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            return `hace ${diffMinutes} minutos`;
        }
        return `hace ${diffHours} horas`;
    } else if (diffDays === 1) {
        return 'ayer';
    } else if (diffDays < 7) {
        return `hace ${diffDays} días`;
    } else {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Global functions for pagination (called from HTML)
window.changePage = changePage;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
    initializeSearch();
}

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSearch,
        performSearch,
        fetchSearchResults,
        fetchTopStories
    };
}