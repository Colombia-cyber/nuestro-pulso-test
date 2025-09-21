import { ReactNode, ButtonHTMLAttributes } from 'react';

// Base fast component props
export interface FastComponentProps {
  className?: string;
  children?: ReactNode;
  'data-testid'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  role?: string;
  id?: string;
}

// Fast search-specific props
export interface FastSearchProps extends FastComponentProps {
  query?: string;
  onSearch?: (query: string, options?: SearchOptions) => void;
  onQueryChange?: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  debounceMs?: number;
  suggestions?: string[];
  isLoading?: boolean;
  maxSuggestions?: number;
  category?: 'local' | 'world' | 'all';
  filters?: SearchFilter[];
}

// Fast news-specific props
export interface FastNewsProps extends FastComponentProps {
  articles?: NewsArticle[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list' | 'timeline';
  category?: string;
  onArticleClick?: (article: NewsArticle) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  showPerspectiveBadge?: boolean;
  showTrending?: boolean;
}

// Fast local content props
export interface FastLocalProps extends FastComponentProps {
  region?: string;
  city?: string;
  country?: string;
  localCategories?: LocalCategory[];
  preferredLanguage?: 'es' | 'en';
  showLocalFirst?: boolean;
  includeNational?: boolean;
}

// Fast interactive props
export interface FastInteractiveProps extends FastComponentProps {
  onClick?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Fast button props extending HTML button attributes  
export interface FastButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'onFocus' | 'onBlur' | 'role'> {
  onClick?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  role?: string;
}

// Performance options
export interface FastPerformanceOptions {
  enableCache?: boolean;
  enableDebounce?: boolean;
  enableLazyLoad?: boolean;
  enableVirtualization?: boolean;
  enablePreload?: boolean;
  cacheSize?: number;
  debounceMs?: number;
  lazyLoadThreshold?: number;
  batchSize?: number;
  maxConcurrentRequests?: number;
}

// Search-related types
export interface SearchOptions {
  category?: 'local' | 'world' | 'all';
  timeRange?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
  sortBy?: 'relevance' | 'date' | 'popularity';
  source?: string;
  location?: string;
  language?: string;
}

export interface SearchFilter {
  id: string;
  label: string;
  value: string;
  type: 'select' | 'checkbox' | 'radio' | 'range' | 'date';
  options?: SearchFilterOption[];
  min?: number;
  max?: number;
}

export interface SearchFilterOption {
  label: string;
  value: string;
  count?: number;
}

// News-related types
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  url?: string;
  imageUrl?: string;
  author?: string;
  source: string;
  publishedAt: Date;
  updatedAt?: Date;
  category: string;
  tags: string[];
  perspective?: 'progressive' | 'conservative' | 'balanced';
  location?: string;
  isLocal?: boolean;
  trending?: boolean;
  views?: number;
  comments?: number;
  shares?: number;
  readTime?: number;
  verified?: boolean;
}

export interface LocalCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
  isPopular?: boolean;
  subcategories?: LocalCategory[];
}

// Chat-related types
export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  message: string;
  timestamp: Date;
  isLocal?: boolean;
  isVerified?: boolean;
  replyTo?: string;
  reactions?: ChatReaction[];
}

export interface ChatReaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

// Reels-related types
export interface ReelItem {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl: string;
  author: string;
  authorAvatar?: string;
  duration: number;
  views: number;
  likes: number;
  comments: number;
  isLocal?: boolean;
  location?: string;
  tags: string[];
  timestamp: Date;
}

// Trending-related types
export interface TrendingItem {
  id: string;
  title: string;
  category: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  volume: number;
  isLocal?: boolean;
  timeframe: string;
  relatedArticles?: NewsArticle[];
}

// Timeline-related types
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'news' | 'event' | 'milestone' | 'update';
  importance: 'low' | 'medium' | 'high' | 'critical';
  source?: string;
  url?: string;
  isLocal?: boolean;
  tags: string[];
}

// Modal and UI-related types
export interface ModalProps extends FastComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  overlay?: boolean;
  centered?: boolean;
}

export interface DropdownProps extends FastComponentProps {
  trigger: ReactNode;
  items: DropdownItem[];
  placement?: 'top' | 'bottom' | 'left' | 'right';
  autoClose?: boolean;
  disabled?: boolean;
}

export interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  divider?: boolean;
  onClick?: (value: string) => void;
}

// Grid and layout types
export interface GridProps extends FastComponentProps {
  columns?: number | string;
  gap?: number | string;
  responsive?: boolean;
  autoFit?: boolean;
  minItemWidth?: string;
}

export interface CardProps extends FastComponentProps {
  title?: string;
  subtitle?: string;
  image?: string;
  content?: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  loading?: boolean;
}

// Performance monitoring types
export interface PerformanceMetrics {
  renderTime: number;
  loadTime: number;
  interactionTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  errorRate: number;
}

export interface FastCacheEntry<T = any> {
  key: string;
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
}