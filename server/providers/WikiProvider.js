/**
 * Wiki Provider - Aggregates educational and reference content
 * This is a placeholder implementation that provides realistic mock data
 * In production, this would integrate with Wikipedia API and other educational sources
 */
class WikiProvider {
  constructor() {
    this.name = 'wiki';
    this.sources = [
      'Wikipedia',
      'Academia Colombiana',
      'Biblioteca Luis Ángel Arango',
      'Enciclopedia Política',
      'Centro de Estudios',
      'Universidad Nacional',
      'Biblioteca Nacional',
      'Archivo General'
    ];
  }

  /**
   * Search educational and reference content
   * @param {Object} options - Search options
   * @param {string} options.query - Search query
   * @param {string} options.category - Category filter
   * @param {number} options.maxResults - Maximum results to return
   * @returns {Promise<Array>} Array of search results
   */
  async search(options) {
    const { query, category, maxResults = 8 } = options;

    try {
      // Simulate API delay
      await this.delay(180 + Math.random() * 220);

      const results = [];
      const baseResultCount = Math.min(maxResults, 8);
      
      for (let i = 0; i < baseResultCount; i++) {
        const source = this.sources[Math.floor(Math.random() * this.sources.length)];
        const wikiCategory = category || this.getRandomCategory();
        const relevanceScore = Math.max(65, 90 - (i * 3) + Math.random() * 12);
        
        const result = {
          id: `wiki_${Date.now()}_${i}`,
          title: this.generateWikiTitle(query, source, wikiCategory),
          summary: this.generateWikiSummary(query, wikiCategory),
          url: this.generateWikiUrl(source, query, i),
          source: source,
          category: wikiCategory,
          timestamp: this.generateWikiTimestamp(),
          relevanceScore: Math.round(relevanceScore),
          image: this.getCategoryIcon(wikiCategory),
          author: this.generateWikiAuthor(source),
          tags: this.generateWikiTags(query, wikiCategory),
          contentType: 'article',
          provider: 'wiki',
          educational: true,
          references: this.generateReferences()
        };

        // Apply category filter if specified
        if (!category || wikiCategory === category) {
          results.push(result);
        }
      }

      return results;
    } catch (error) {
      console.error('Wiki provider search failed:', error);
      return [];
    }
  }

  /**
   * Get search suggestions related to educational content
   */
  async getSuggestions(query) {
    const suggestions = [
      `${query} historia`,
      `${query} definición`,
      `${query} contexto`,
      `${query} antecedentes`,
      `${query} explicación`
    ];

    return suggestions.filter(s => s.toLowerCase() !== query.toLowerCase()).slice(0, 3);
  }

  // Helper methods
  generateWikiTitle(query, source, category) {
    const templates = {
      'Wikipedia': [
        `${query} - Wikipedia, la enciclopedia libre`,
        `Historia de ${query} en Colombia`,
        `${query}: Definición y contexto`,
        `Artículo: ${query} (Colombia)`
      ],
      'Academia Colombiana': [
        `${query}: Análisis académico`,
        `Estudio sobre ${query} en Colombia`,
        `${query}: Perspectiva académica`,
        `Investigación: ${query} y sus implicaciones`
      ],
      'Biblioteca Luis Ángel Arango': [
        `${query}: Recursos bibliográficos`,
        `Colección sobre ${query}`,
        `${query} en el acervo histórico`,
        `Documentos históricos sobre ${query}`
      ],
      'Enciclopedia Política': [
        `${query}: Entrada enciclopédica`,
        `Definición política de ${query}`,
        `${query} en el contexto político colombiano`,
        `Concepto: ${query} (Política)`
      ]
    };

    const sourceTemplates = templates[source] || [
      `${query}: Información de referencia`,
      `Artículo educativo sobre ${query}`,
      `${query}: Contexto y antecedentes`,
      `Recurso académico: ${query}`
    ];

    return sourceTemplates[Math.floor(Math.random() * sourceTemplates.length)];
  }

  generateWikiSummary(query, category) {
    const summaryTemplates = [
      `${query} es un concepto fundamental en el contexto colombiano que ha evolucionado significativamente a lo largo de la historia. Este artículo proporciona una visión comprensiva de sus antecedentes, desarrollo y relevancia actual.`,
      `El término ${query} tiene profundas raíces en la realidad política y social de Colombia. Su comprensión requiere analizar diversos factores históricos, institucionales y culturales que han moldeado su significado.`,
      `${query} representa un elemento clave en el desarrollo institucional y democrático de Colombia. Su estudio abarca múltiples dimensiones: histórica, política, social y jurídica.`,
      `La importancia de ${query} en el contexto colombiano se manifiesta a través de su impacto en las instituciones, la sociedad civil y los procesos democráticos. Este recurso ofrece una perspectiva académica integral.`
    ];

    return summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
  }

  generateWikiUrl(source, query, index) {
    const baseUrls = {
      'Wikipedia': 'https://es.wikipedia.org/wiki',
      'Academia Colombiana': 'https://academia.edu.co/articulo',
      'Biblioteca Luis Ángel Arango': 'https://banrepcultural.org/biblioteca',
      'Enciclopedia Política': 'https://enciclopedia.politica.co/entrada',
      'Universidad Nacional': 'https://unal.edu.co/recurso',
      'Biblioteca Nacional': 'https://bibliotecanacional.gov.co/documento'
    };

    const baseUrl = baseUrls[source] || 'https://referencia.edu.co/articulo';
    const sanitizedQuery = query.replace(/\s+/g, '_').toLowerCase();
    return `${baseUrl}/${sanitizedQuery}_${index}`;
  }

  generateWikiTimestamp() {
    const now = Date.now();
    const daysAgo = Math.random() * 180; // Up to 6 months ago (educational content is less time-sensitive)
    return new Date(now - (daysAgo * 24 * 60 * 60 * 1000)).toISOString();
  }

  generateWikiAuthor(source) {
    const authors = {
      'Wikipedia': 'Colaboradores de Wikipedia',
      'Academia Colombiana': 'Dr. Investigador Académico',
      'Biblioteca Luis Ángel Arango': 'Equipo Bibliotecario',
      'Enciclopedia Política': 'Editor Especializado',
      'Universidad Nacional': 'Facultad de Ciencias Políticas',
      'Biblioteca Nacional': 'Departamento de Investigación',
      'Centro de Estudios': 'Equipo de Investigadores',
      'Archivo General': 'Archivistas Especializados'
    };

    return authors[source] || 'Autor Académico';
  }

  generateWikiTags(query, category) {
    const commonTags = [query.toLowerCase(), 'educativo', category, 'referencia'];
    const wikiTags = ['historia', 'contexto', 'académico', 'enciclopedia', 'investigación'];
    
    return commonTags.concat(
      wikiTags
        .filter(tag => !commonTags.includes(tag))
        .slice(0, 2)
    );
  }

  generateReferences() {
    const referenceCount = Math.floor(Math.random() * 8) + 3; // 3-10 references
    const references = [];
    
    for (let i = 0; i < referenceCount; i++) {
      references.push(`Referencia académica ${i + 1}`);
    }
    
    return references;
  }

  getRandomCategory() {
    const categories = ['educativo', 'historico', 'politica', 'social', 'cultural'];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  getCategoryIcon(category) {
    const icons = {
      educativo: '📚',
      historico: '📜',
      politica: '🏛️',
      social: '👥',
      cultural: '🎭'
    };
    return icons[category] || '📖';
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default WikiProvider;