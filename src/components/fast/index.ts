/**
 * Ultra-Fast Component Library (fast-r7aqkx-222-d through fast-r7aqkx-253-d)
 * Optimized for ultra-fast local search and news experiences
 * Designed for instant load, no dead clicks, and superior responsiveness
 */

// Core fast components for local search and news
export { FastSearchBar } from './FastSearchBar';
export { FastNewsCard } from './FastNewsCard';
export { FastButton } from './FastButton';
export { FastLocalNews } from './FastLocalNews';

// Hooks
export { useFastCallback, useFastState, useFastLocalData } from './hooks/useFastCallback';

// Types
export type {
  FastComponentProps,
  FastSearchProps,
  FastNewsProps,
  FastLocalProps,
  FastInteractiveProps,
  FastPerformanceOptions,
  NewsArticle
} from './types';

// Placeholder exports for future components
export {
  FastFilter,
  FastLoading,
  FastResults,
  FastTabs,
  FastTooltip,
  FastModal,
  FastDropdown,
  FastLocalSearch,
  FastLocalFeed,
  FastLocalChat,
  FastLocalReels,
  FastLocalTrending,
  FastInteractive,
  FastTimeline,
  FastComments,
  FastPagination,
  FastInfiniteScroll,
  FastDebounce,
  FastLazyLoad,
  FastCache,
  FastOptimizer,
  FastGrid,
  FastCard,
  FastHeader,
  FastSidebar,
  FastFooter
} from './placeholders';