/**
 * Colombia Search Service
 * Provides search functionality focused on Colombian news and local sources
 */
class ColombiaSearchService {
  constructor() {
    this.mockColombiaData = this.generateMockColombiaData();
  }

  /**
   * Search Colombian news and local sources
   * @param {Object} options - Search options
   * @returns {Promise<Object>} Search results
   */
  async search(options) {
    const { query, page = 1, limit = 12, location = 'colombia' } = options;
    const startTime = Date.now();

    try {
      // Simulate API delay for realism
      await new Promise(resolve => setTimeout(resolve, 150));

      // Filter mock data based on query
      let results = this.mockColombiaData.filter(item => 
        this.matchesQuery(item, query) && 
        this.isColombianSource(item)
      );

      // Sort by relevance
      results = this.calculateRelevanceScores(results, query);
      results.sort((a, b) => b.relevanceScore - a.relevanceScore);

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const paginatedResults = results.slice(startIndex, startIndex + limit);

      return {
        query,
        results: paginatedResults,
        totalResults: results.length,
        page,
        totalPages: Math.ceil(results.length / limit),
        hasMore: startIndex + limit < results.length,
        searchTime: Date.now() - startTime,
        source: 'colombia-local',
        metadata: {
          location: 'Colombia',
          sources: this.getUniqueSources(paginatedResults),
          categories: this.getUniqueCategories(paginatedResults)
        }
      };
    } catch (error) {
      console.error('Colombia search failed:', error);
      throw new Error(`Colombia search error: ${error.message}`);
    }
  }

  /**
   * Check if query matches item content
   */
  matchesQuery(item, query) {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    const searchableText = `${item.title} ${item.summary} ${item.tags?.join(' ') || ''}`.toLowerCase();
    
    return searchTerms.some(term => searchableText.includes(term));
  }

  /**
   * Check if source is Colombian
   */
  isColombianSource(item) {
    const colombianSources = [
      'El Tiempo', 'El Espectador', 'Semana', 'RCN Radio', 'Caracol Radio',
      'El Colombiano', 'El Heraldo', 'La República', 'El Universal',
      'Alcaldía de Bogotá', 'Presidencia Colombia', 'Congreso de Colombia'
    ];
    
    return colombianSources.includes(item.source) || 
           item.location?.toLowerCase().includes('colombia') ||
           item.tags?.some(tag => ['colombia', 'bogota', 'medellin', 'cali'].includes(tag.toLowerCase()));
  }

  /**
   * Calculate relevance scores for search results
   */
  calculateRelevanceScores(results, query) {
    const queryTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    
    return results.map(result => {
      let score = 0;
      const title = result.title.toLowerCase();
      const summary = result.summary.toLowerCase();
      
      // Title matches get higher scores
      queryTerms.forEach(term => {
        if (title.includes(term)) score += 30;
        if (summary.includes(term)) score += 15;
        if (result.tags?.some(tag => tag.toLowerCase().includes(term))) score += 10;
      });
      
      // Bonus for recent content
      const hoursOld = (Date.now() - new Date(result.timestamp).getTime()) / (1000 * 60 * 60);
      if (hoursOld < 24) score += 10;
      if (hoursOld < 6) score += 20;
      
      // Bonus for high-authority Colombian sources
      const highAuthoritySources = ['El Tiempo', 'Semana', 'El Espectador', 'Presidencia Colombia'];
      if (highAuthoritySources.includes(result.source)) score += 15;
      
      result.relevanceScore = Math.min(100, Math.max(1, score));
      return result;
    });
  }

  /**
   * Get unique sources from results
   */
  getUniqueSources(results) {
    return [...new Set(results.map(r => r.source))];
  }

  /**
   * Get unique categories from results
   */
  getUniqueCategories(results) {
    return [...new Set(results.map(r => r.category))];
  }

  /**
   * Generate mock Colombian data for demonstration
   */
  generateMockColombiaData() {
    return [
      {
        id: 'col-1',
        title: 'Alcalde de Bogotá anuncia nuevas medidas de movilidad',
        summary: 'El alcalde de Bogotá presentó un plan integral para mejorar la movilidad urbana con nuevas rutas de TransMilenio y ciclorutas.',
        url: 'https://example.com/bogota-movilidad',
        source: 'El Tiempo',
        category: 'local',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 95,
        image: '🚌',
        author: 'Redacción Bogotá',
        tags: ['bogota', 'transmilenio', 'movilidad', 'alcalde'],
        location: 'Bogotá, Colombia'
      },
      {
        id: 'col-2',
        title: 'Congreso de Colombia aprueba reforma al sistema de salud',
        summary: 'El Congreso colombiano aprobó en primer debate la reforma al sistema de salud que busca garantizar mejor atención médica para todos los ciudadanos.',
        url: 'https://example.com/congreso-salud',
        source: 'Semana',
        category: 'politica',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 92,
        image: '🏥',
        author: 'Redacción Política',
        tags: ['congreso', 'salud', 'reforma', 'colombia'],
        location: 'Bogotá, Colombia'
      },
      {
        id: 'col-3',
        title: 'Medellín será sede de cumbre de innovación tecnológica',
        summary: 'La ciudad de Medellín fue seleccionada como sede de la cumbre latinoamericana de innovación tecnológica que se realizará el próximo mes.',
        url: 'https://example.com/medellin-tech',
        source: 'El Colombiano',
        category: 'tecnologia',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 88,
        image: '💻',
        author: 'Juan Carlos Pérez',
        tags: ['medellin', 'tecnologia', 'innovacion', 'cumbre'],
        location: 'Medellín, Colombia'
      },
      {
        id: 'col-4',
        title: 'Ministerio de Educación lanza programa de becas universitarias',
        summary: 'El Ministerio de Educación anunció un nuevo programa de becas que beneficiará a 10,000 estudiantes colombianos de bajos recursos.',
        url: 'https://example.com/becas-educacion',
        source: 'RCN Radio',
        category: 'educacion',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 85,
        image: '🎓',
        author: 'María González',
        tags: ['educacion', 'becas', 'ministerio', 'estudiantes'],
        location: 'Colombia'
      },
      {
        id: 'col-5',
        title: 'Policía Nacional refuerza seguridad en fronteras',
        summary: 'La Policía Nacional implementó nuevas estrategias de seguridad en las fronteras colombianas para combatir el contrabando y el narcotráfico.',
        url: 'https://example.com/policia-fronteras',
        source: 'Caracol Radio',
        category: 'seguridad',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 82,
        image: '👮',
        author: 'Redacción Judicial',
        tags: ['policia', 'fronteras', 'seguridad', 'contrabando'],
        location: 'Colombia'
      },
      {
        id: 'col-6',
        title: 'Cali se prepara para el Festival de Salsa más grande del año',
        summary: 'La ciudad de Cali ultima detalles para recibir el Festival Mundial de Salsa que traerá artistas internacionales y locales.',
        url: 'https://example.com/cali-salsa',
        source: 'El País',
        category: 'cultura',
        timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 78,
        image: '💃',
        author: 'Redacción Cultural',
        tags: ['cali', 'salsa', 'festival', 'cultura'],
        location: 'Cali, Colombia'
      },
      {
        id: 'col-7',
        title: 'Banco de la República mantiene tasa de interés estable',
        summary: 'El Banco de la República decidió mantener la tasa de interés de referencia en 13.25% para controlar la inflación en Colombia.',
        url: 'https://example.com/banco-republica',
        source: 'La República',
        category: 'economia',
        timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 80,
        image: '💰',
        author: 'Redacción Económica',
        tags: ['banco', 'economia', 'inflacion', 'tasa'],
        location: 'Colombia'
      },
      {
        id: 'col-8',
        title: 'Presidente Petro se reúne con gobernadores regionales',
        summary: 'El presidente Gustavo Petro sostuvo una reunión con gobernadores para coordinar políticas de desarrollo regional y paz total.',
        url: 'https://example.com/petro-gobernadores',
        source: 'Presidencia Colombia',
        category: 'politica',
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        relevanceScore: 90,
        image: '🏛️',
        author: 'Oficina de Prensa',
        tags: ['petro', 'gobernadores', 'politica', 'regiones'],
        location: 'Bogotá, Colombia'
      }
    ];
  }

  /**
   * Get search suggestions for Colombian content
   */
  async getSuggestions(query) {
    const colombianSuggestions = [
      'Gustavo Petro presidente',
      'Alcalde Bogotá',
      'Medellín innovación',
      'Cali cultura',
      'Cartagena turismo',
      'TransMilenio Bogotá',
      'Congreso Colombia',
      'Paz total Colombia',
      'Reforma tributaria',
      'Policía Nacional'
    ];

    return colombianSuggestions
      .filter(suggestion => 
        query.length < 2 || 
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 6);
  }
}

export default ColombiaSearchService;