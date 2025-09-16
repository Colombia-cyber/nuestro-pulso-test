// Search UI Demo Script
// This file provides a working demo with mock data and clear integration points for real search backends

class SearchUI {
    constructor() {
        this.currentQuery = '';
        this.currentPage = 1;
        this.resultsPerPage = 10;
        this.totalResults = 0;
        this.isLoading = false;
        this.mockData = this.getMockData();
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadQueryFromURL();
        this.performSearch();
    }

    bindEvents() {
        // Search form submission
        const searchForm = document.querySelector('form[role="search"]');
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Search input changes
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', this.debounce(() => {
            this.handleSearch();
        }, 500));

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        loadMoreBtn.addEventListener('click', () => {
            this.loadMoreResults();
        });

        // Retry button
        const retryBtn = document.getElementById('retry-btn');
        retryBtn.addEventListener('click', () => {
            this.hideError();
            this.performSearch();
        });

        // Infinite scroll
        window.addEventListener('scroll', this.debounce(() => {
            this.handleInfiniteScroll();
        }, 200));
    }

    loadQueryFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            this.currentQuery = query;
            document.getElementById('search-input').value = query;
        }
    }

    handleSearch() {
        const searchInput = document.getElementById('search-input');
        const newQuery = searchInput.value.trim();
        
        if (newQuery !== this.currentQuery) {
            this.currentQuery = newQuery;
            this.currentPage = 1;
            this.updateURL();
            this.performSearch();
        }
    }

    updateURL() {
        const url = new URL(window.location);
        if (this.currentQuery) {
            url.searchParams.set('q', this.currentQuery);
        } else {
            url.searchParams.delete('q');
        }
        window.history.replaceState({}, '', url);
    }

    async performSearch() {
        if (!this.currentQuery) {
            this.clearResults();
            return;
        }

        this.showLoading();
        this.hideError();

        try {
            // TODO: Replace this mock implementation with real search API call
            // Example implementations for different search backends:
            
            // For Algolia:
            // const results = await this.searchWithAlgolia(this.currentQuery, this.currentPage);
            
            // For Typesense:
            // const results = await this.searchWithTypesense(this.currentQuery, this.currentPage);
            
            // For Elasticsearch:
            // const results = await this.searchWithElasticsearch(this.currentQuery, this.currentPage);
            
            // For custom API:
            // const results = await this.searchWithCustomAPI(this.currentQuery, this.currentPage);

            const results = await this.mockSearch(this.currentQuery, this.currentPage);
            
            this.handleSearchResults(results);
            
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Error performing search. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    // Mock search implementation - replace with real search backend
    async mockSearch(query, page) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const filteredResults = this.mockData.results.filter(result => 
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.snippet.toLowerCase().includes(query.toLowerCase()) ||
            result.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        const startIndex = (page - 1) * this.resultsPerPage;
        const endIndex = startIndex + this.resultsPerPage;
        const pageResults = filteredResults.slice(startIndex, endIndex);

        const topStories = this.mockData.topStories.filter(story =>
            story.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

        return {
            query: query,
            totalResults: filteredResults.length,
            page: page,
            resultsPerPage: this.resultsPerPage,
            results: pageResults,
            topStories: topStories,
            searchTime: Math.random() * 0.5 + 0.1 // Mock search time
        };
    }

    // TODO: Implement real search backend integrations
    
    async searchWithAlgolia(query, page) {
        // Example Algolia implementation
        // const searchClient = algoliasearch('YOUR_APP_ID', 'YOUR_SEARCH_API_KEY');
        // const index = searchClient.initIndex('your_index_name');
        // 
        // const { hits, nbHits, processingTimeMS } = await index.search(query, {
        //     page: page - 1,
        //     hitsPerPage: this.resultsPerPage,
        //     attributesToRetrieve: ['title', 'content', 'url', 'published_date', 'author', 'image', 'tags'],
        //     attributesToHighlight: ['title', 'content'],
        //     ranking: ['desc(popularity)', 'desc(published_date)', 'typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom']
        // });
        // 
        // return {
        //     query: query,
        //     totalResults: nbHits,
        //     page: page,
        //     resultsPerPage: this.resultsPerPage,
        //     results: hits.map(hit => this.transformAlgoliaResult(hit)),
        //     topStories: [], // Implement top stories logic
        //     searchTime: processingTimeMS / 1000
        // };
        
        throw new Error('Algolia integration not implemented');
    }

    async searchWithTypesense(query, page) {
        // Example Typesense implementation
        // const typesense = new Typesense.Client({
        //     'nodes': [{
        //         'host': 'your-typesense-host',
        //         'port': '443',
        //         'protocol': 'https'
        //     }],
        //     'apiKey': 'your-search-api-key',
        //     'connectionTimeoutSeconds': 2
        // });
        // 
        // const searchParameters = {
        //     'q': query,
        //     'query_by': 'title,content,tags',
        //     'page': page,
        //     'per_page': this.resultsPerPage,
        //     'sort_by': 'popularity:desc,published_date:desc',
        //     'highlight_full_fields': 'title,content'
        // };
        // 
        // const searchResults = await typesense.collections('your_collection').documents().search(searchParameters);
        // 
        // return {
        //     query: query,
        //     totalResults: searchResults.found,
        //     page: page,
        //     resultsPerPage: this.resultsPerPage,
        //     results: searchResults.hits.map(hit => this.transformTypesenseResult(hit)),
        //     topStories: [], // Implement top stories logic
        //     searchTime: searchResults.search_time_ms / 1000
        // };
        
        throw new Error('Typesense integration not implemented');
    }

    async searchWithElasticsearch(query, page) {
        // Example Elasticsearch implementation
        // const response = await fetch('/api/search', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         query: {
        //             bool: {
        //                 should: [
        //                     { match: { title: { query: query, boost: 2 } } },
        //                     { match: { content: query } },
        //                     { match: { tags: query } }
        //                 ]
        //             }
        //         },
        //         sort: [
        //             { popularity: { order: 'desc' } },
        //             { published_date: { order: 'desc' } },
        //             '_score'
        //         ],
        //         from: (page - 1) * this.resultsPerPage,
        //         size: this.resultsPerPage,
        //         highlight: {
        //             fields: {
        //                 title: {},
        //                 content: {}
        //             }
        //         }
        //     })
        // });
        // 
        // const data = await response.json();
        // 
        // return {
        //     query: query,
        //     totalResults: data.hits.total.value,
        //     page: page,
        //     resultsPerPage: this.resultsPerPage,
        //     results: data.hits.hits.map(hit => this.transformElasticsearchResult(hit)),
        //     topStories: [], // Implement top stories logic
        //     searchTime: data.took / 1000
        // };
        
        throw new Error('Elasticsearch integration not implemented');
    }

    async searchWithCustomAPI(query, page) {
        // Example custom API implementation
        // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}&per_page=${this.resultsPerPage}`, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Authorization': 'Bearer your-api-token'
        //     }
        // });
        // 
        // if (!response.ok) {
        //     throw new Error(`Search API error: ${response.status}`);
        // }
        // 
        // const data = await response.json();
        // 
        // return {
        //     query: query,
        //     totalResults: data.total,
        //     page: page,
        //     resultsPerPage: this.resultsPerPage,
        //     results: data.results,
        //     topStories: data.top_stories || [],
        //     searchTime: data.search_time
        // };
        
        throw new Error('Custom API integration not implemented');
    }

    handleSearchResults(searchResults) {
        this.totalResults = searchResults.totalResults;
        
        if (this.currentPage === 1) {
            this.clearResults();
            this.renderTopStories(searchResults.topStories);
        }
        
        this.renderResults(searchResults.results, this.currentPage === 1);
        this.updateSearchStats(searchResults);
        this.updatePagination();
        this.generateJSONLD(searchResults);
    }

    renderTopStories(topStories) {
        const container = document.getElementById('top-stories-scroll');
        
        if (!topStories || topStories.length === 0) {
            document.querySelector('.top-stories').style.display = 'none';
            return;
        }

        document.querySelector('.top-stories').style.display = 'block';
        container.innerHTML = '';

        topStories.forEach(story => {
            const storyElement = document.createElement('a');
            storyElement.className = 'top-story-card';
            storyElement.href = story.url;
            storyElement.setAttribute('role', 'article');
            storyElement.setAttribute('aria-label', `Historia destacada: ${story.title}`);

            storyElement.innerHTML = `
                <img src="${story.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDI4MCAxNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMTQwIiBmaWxsPSIjRjhGOUZBIi8+CjxyZWN0IHg9IjEyMCIgeT0iNTAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcng9IjIwIiBmaWxsPSIjREFEQ0UwIi8+Cjwvc3ZnPgo='}" 
                     alt="${story.title}" 
                     class="top-story-image"
                     loading="lazy">
                <div class="top-story-content">
                    <div class="top-story-source">
                        <img src="${this.getFavicon(story.domain)}" 
                             alt="" 
                             class="top-story-favicon"
                             loading="lazy">
                        <span class="top-story-domain">${story.domain}</span>
                    </div>
                    <h3 class="top-story-title">${story.title}</h3>
                    <time class="top-story-date" datetime="${story.published_date}">
                        ${this.formatDate(story.published_date)}
                    </time>
                </div>
            `;

            container.appendChild(storyElement);
        });
    }

    renderResults(results, replace = true) {
        const container = document.getElementById('results-container');
        
        if (replace) {
            container.innerHTML = '';
        }

        if (!results || results.length === 0) {
            if (replace) {
                container.innerHTML = `
                    <div class="no-results">
                        <h3>No se encontraron resultados</h3>
                        <p>Intenta con diferentes palabras clave o verifica la ortografía.</p>
                    </div>
                `;
            }
            return;
        }

        results.forEach(result => {
            const resultElement = document.createElement('a');
            resultElement.className = 'search-result';
            resultElement.href = result.url;
            resultElement.setAttribute('role', 'article');
            resultElement.setAttribute('aria-label', `Resultado: ${result.title}`);

            resultElement.innerHTML = `
                <div class="result-header">
                    <img src="${this.getFavicon(result.domain)}" 
                         alt="" 
                         class="result-favicon"
                         loading="lazy">
                    <span class="result-url">${result.domain}${result.url}</span>
                    <time class="result-date" datetime="${result.published_date}">
                        ${this.formatDate(result.published_date)}
                    </time>
                </div>
                <h3 class="result-title">${result.title}</h3>
                <p class="result-snippet">${result.snippet}</p>
                ${result.tags && result.tags.length > 0 ? `
                    <div class="result-tags">
                        ${result.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            `;

            container.appendChild(resultElement);
        });
    }

    updateSearchStats(searchResults) {
        const statsElement = document.getElementById('results-count');
        const searchTime = searchResults.searchTime.toFixed(2);
        
        if (searchResults.totalResults === 0) {
            statsElement.textContent = `No se encontraron resultados para "${searchResults.query}"`;
        } else {
            statsElement.textContent = `Aproximadamente ${searchResults.totalResults.toLocaleString()} resultados (${searchTime} segundos)`;
        }
    }

    updatePagination() {
        const container = document.getElementById('pagination-container');
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        const totalPages = Math.ceil(this.totalResults / this.resultsPerPage);
        const hasMorePages = this.currentPage < totalPages;
        
        // Show/hide load more button
        loadMoreBtn.style.display = hasMorePages ? 'block' : 'none';
        
        // Generate pagination
        container.innerHTML = '';
        
        if (totalPages <= 1) return;

        const maxVisible = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        // Previous button
        const prevBtn = this.createPaginationButton('‹', this.currentPage - 1, this.currentPage <= 1);
        prevBtn.setAttribute('aria-label', 'Página anterior');
        container.appendChild(prevBtn);

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = this.createPaginationButton(i.toString(), i, false, i === this.currentPage);
            pageBtn.setAttribute('aria-label', `Página ${i}`);
            if (i === this.currentPage) {
                pageBtn.setAttribute('aria-current', 'page');
            }
            container.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = this.createPaginationButton('›', this.currentPage + 1, this.currentPage >= totalPages);
        nextBtn.setAttribute('aria-label', 'Página siguiente');
        container.appendChild(nextBtn);
    }

    createPaginationButton(text, page, disabled, active = false) {
        const button = document.createElement('button');
        button.className = `pagination-btn ${active ? 'active' : ''}`;
        button.textContent = text;
        button.disabled = disabled;
        
        if (!disabled) {
            button.addEventListener('click', () => {
                this.currentPage = page;
                this.performSearch();
                this.scrollToTop();
            });
        }
        
        return button;
    }

    loadMoreResults() {
        this.currentPage++;
        this.performSearch();
    }

    handleInfiniteScroll() {
        if (this.isLoading) return;
        
        const scrollPosition = window.innerHeight + window.scrollY;
        const documentHeight = document.documentElement.offsetHeight;
        const threshold = 200; // pixels from bottom
        
        if (scrollPosition >= documentHeight - threshold) {
            const totalPages = Math.ceil(this.totalResults / this.resultsPerPage);
            if (this.currentPage < totalPages) {
                this.loadMoreResults();
            }
        }
    }

    // JSON-LD structured data generation for SEO
    generateJSONLD(searchResults) {
        // Clear existing JSON-LD
        const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
        existingScripts.forEach(script => script.remove());

        // Generate JSON-LD for search results page
        const searchPageLD = {
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            "url": window.location.href,
            "name": `Resultados de búsqueda para "${searchResults.query}"`,
            "description": `${searchResults.totalResults} resultados encontrados para "${searchResults.query}"`,
            "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": searchResults.totalResults,
                "itemListElement": []
            }
        };

        // Add individual results to JSON-LD
        searchResults.results.forEach((result, index) => {
            const resultLD = {
                "@type": "NewsArticle",
                "@id": result.url,
                "headline": result.title,
                "description": result.snippet,
                "url": result.url,
                "datePublished": result.published_date,
                "author": {
                    "@type": "Organization",
                    "name": result.author || result.domain
                },
                "publisher": {
                    "@type": "Organization",
                    "name": result.domain
                }
            };

            if (result.image) {
                resultLD.image = result.image;
            }

            if (result.tags && result.tags.length > 0) {
                resultLD.keywords = result.tags.join(', ');
            }

            searchPageLD.mainEntity.itemListElement.push({
                "@type": "ListItem",
                "position": (this.currentPage - 1) * this.resultsPerPage + index + 1,
                "item": resultLD
            });
        });

        // Inject JSON-LD script
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(searchPageLD, null, 2);
        document.head.appendChild(script);

        console.log('Generated JSON-LD:', searchPageLD);
    }

    // Utility functions
    getFavicon(domain) {
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Hace 1 día';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
        
        return date.toLocaleDateString('es-CO', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    debounce(func, wait) {
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

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showLoading() {
        this.isLoading = true;
        document.getElementById('loading-indicator').style.display = 'flex';
    }

    hideLoading() {
        this.isLoading = false;
        document.getElementById('loading-indicator').style.display = 'none';
    }

    showError(message) {
        document.getElementById('error-text').textContent = message;
        document.getElementById('error-container').style.display = 'block';
    }

    hideError() {
        document.getElementById('error-container').style.display = 'none';
    }

    clearResults() {
        document.getElementById('results-container').innerHTML = '';
        document.getElementById('top-stories-scroll').innerHTML = '';
        document.querySelector('.top-stories').style.display = 'none';
    }

    // Mock data for demonstration
    getMockData() {
        return {
            topStories: [
                {
                    title: "Nueva propuesta de ley busca mejorar la participación ciudadana en Colombia",
                    url: "https://example.com/propuesta-participacion-ciudadana",
                    domain: "congreso.gov.co",
                    published_date: "2024-09-15T10:30:00Z",
                    image: "https://via.placeholder.com/280x140/4285f4/ffffff?text=Congreso"
                },
                {
                    title: "Debate público sobre transparencia en el gobierno local",
                    url: "https://example.com/debate-transparencia",
                    domain: "nuestropulso.co",
                    published_date: "2024-09-14T15:20:00Z",
                    image: "https://via.placeholder.com/280x140/34a853/ffffff?text=Debate"
                },
                {
                    title: "Encuesta revela alto interés ciudadano en políticas ambientales",
                    url: "https://example.com/encuesta-ambiente",
                    domain: "ambiente.gov.co",
                    published_date: "2024-09-13T09:15:00Z",
                    image: "https://via.placeholder.com/280x140/fbbc04/ffffff?text=Ambiente"
                }
            ],
            results: [
                {
                    title: "Análisis: El impacto de la participación ciudadana en las decisiones gubernamentales",
                    url: "/articulos/impacto-participacion-ciudadana",
                    domain: "nuestropulso.co",
                    published_date: "2024-09-15T14:30:00Z",
                    snippet: "Un estudio profundo sobre cómo la participación activa de los ciudadanos ha influido en las políticas públicas recientes en Colombia...",
                    author: "María González",
                    tags: ["participación", "gobierno", "políticas públicas"]
                },
                {
                    title: "Propuesta de reforma electoral genera debate entre partidos políticos",
                    url: "/noticias/reforma-electoral-debate",
                    domain: "nuestropulso.co",
                    published_date: "2024-09-14T11:45:00Z",
                    snippet: "La nueva propuesta de reforma al sistema electoral colombiano ha generado intensos debates entre los diferentes partidos políticos...",
                    author: "Carlos Rodríguez",
                    tags: ["elecciones", "reforma", "partidos políticos"]
                },
                {
                    title: "Ciudadanos se organizan para supervisar proyectos de infraestructura local",
                    url: "/noticias/supervision-infraestructura",
                    domain: "nuestropulso.co",
                    published_date: "2024-09-13T16:20:00Z",
                    snippet: "Grupos de ciudadanos han creado comités de seguimiento para supervisar el desarrollo de proyectos de infraestructura en sus comunidades...",
                    author: "Ana Martínez",
                    tags: ["infraestructura", "supervisión", "comunidad"]
                },
                {
                    title: "Chat en vivo: Discusión sobre presupuesto participativo municipal",
                    url: "/chats/presupuesto-participativo",
                    domain: "nuestropulso.co",
                    published_date: "2024-09-12T19:00:00Z",
                    snippet: "Únete a la discusión en vivo sobre cómo implementar presupuestos participativos en los municipios colombianos...",
                    author: "Equipo Nuestro Pulso",
                    tags: ["presupuesto", "participativo", "municipal", "chat"]
                },
                {
                    title: "Encuesta: ¿Qué opinas sobre la nueva política de transparencia?",
                    url: "/encuestas/politica-transparencia",
                    domain: "nuestropulso.co",
                    published_date: "2024-09-11T12:30:00Z",
                    snippet: "Participa en nuestra encuesta sobre la nueva política de transparencia gubernamental y comparte tu opinión con otros ciudadanos...",
                    author: "Equipo de Encuestas",
                    tags: ["transparencia", "encuesta", "gobierno", "opinión"]
                },
                {
                    title: "Guía: Cómo participar efectivamente en debates públicos",
                    url: "/guias/participar-debates",
                    domain: "nuestropulso.co",
                    published_date: "2024-09-10T08:15:00Z",
                    snippet: "Una guía completa para ciudadanos que quieren participar de manera efectiva en debates públicos y hacer escuchar su voz...",
                    author: "Departamento de Educación Cívica",
                    tags: ["debates", "participación", "guía", "educación cívica"]
                }
            ]
        };
    }
}

// Initialize the search UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SearchUI();
});

// TODO: Server-side JSON-LD generation
// For better SEO, consider generating JSON-LD on the server side:
//
// 1. In your backend API endpoint (e.g., /api/search), include JSON-LD in the response
// 2. Render the JSON-LD directly in the HTML server-side for better indexing
// 3. Example server-side implementation:
//
// app.get('/search', async (req, res) => {
//     const { q, page = 1 } = req.query;
//     const searchResults = await searchEngine.search(q, page);
//     
//     const jsonLD = {
//         "@context": "https://schema.org",
//         "@type": "SearchResultsPage",
//         "url": `${req.protocol}://${req.get('host')}/search?q=${q}&page=${page}`,
//         "mainEntity": {
//             "@type": "ItemList",
//             "itemListElement": searchResults.map((result, index) => ({
//                 "@type": "ListItem",
//                 "position": index + 1,
//                 "item": {
//                     "@type": "NewsArticle",
//                     "headline": result.title,
//                     "url": result.url,
//                     "datePublished": result.published_date,
//                     "description": result.snippet
//                 }
//             }))
//         }
//     };
//     
//     res.render('search', { 
//         results: searchResults, 
//         jsonLD: JSON.stringify(jsonLD),
//         query: q 
//     });
// });