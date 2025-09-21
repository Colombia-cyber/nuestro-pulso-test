import React, { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FaHome, FaSearch, FaBars, FaTimes, FaChevronDown, FaGlobe, FaUser } from 'react-icons/fa';
import { MdNotifications, MdSettings, MdHelp } from 'react-icons/md';
import { usePerformanceMonitor, useFastInteraction } from './FastBase';
import FastButton from './FastButton';

/**
 * Fast-r7aqkx-225-d: Ultra-Fast Navigation Component
 * Optimized navigation with instant response and modern design
 */

export interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  badge?: number | string;
  children?: NavigationItem[];
  description?: string;
  shortcut?: string;
}

export interface FastNavigationProps {
  items: NavigationItem[];
  currentPath?: string;
  onNavigate?: (item: NavigationItem) => void;
  variant?: 'horizontal' | 'vertical' | 'sidebar' | 'breadcrumb';
  size?: 'sm' | 'md' | 'lg';
  showIcons?: boolean;
  showLabels?: boolean;
  showBadges?: boolean;
  collapsible?: boolean;
  responsive?: boolean;
  animated?: boolean;
  theme?: 'light' | 'dark' | 'colombia';
  className?: string;
  maxItems?: number;
  enableSearch?: boolean;
  enableShortcuts?: boolean;
}

const FastNavigation = memo<FastNavigationProps>(({
  items,
  currentPath,
  onNavigate,
  variant = 'horizontal',
  size = 'md',
  showIcons = true,
  showLabels = true,
  showBadges = true,
  collapsible = false,
  responsive = true,
  animated = true,
  theme = 'light',
  className = '',
  maxItems = 10,
  enableSearch = false,
  enableShortcuts = true
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const { renderTime } = usePerformanceMonitor('FastNavigation-r7aqkx-225-d');

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items.slice(0, maxItems);
    
    return items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, maxItems);
  }, [items, searchQuery, maxItems]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableShortcuts) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Global shortcuts
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'k':
            event.preventDefault();
            setIsMobileMenuOpen(true);
            break;
          case '/':
            event.preventDefault();
            // Focus search if available
            break;
        }
      }
      
      // Navigation shortcuts
      if (event.altKey) {
        const numKey = parseInt(event.key);
        if (numKey >= 1 && numKey <= filteredItems.length) {
          event.preventDefault();
          const item = filteredItems[numKey - 1];
          handleItemClick(item);
        }
      }

      // Escape to close mobile menu
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableShortcuts, filteredItems]);

  // Auto-collapse on mobile
  useEffect(() => {
    if (!responsive) return;

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, [responsive]);

  // Fast item click handler
  const handleItemClick = useCallback((item: NavigationItem, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (item.disabled) return;

    // Handle dropdown toggle
    if (item.children && item.children.length > 0) {
      setActiveDropdown(activeDropdown === item.id ? null : item.id);
      return;
    }

    // Close mobile menu on navigation
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);

    // Execute navigation
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      window.location.href = item.href;
    }

    onNavigate?.(item);

    // Analytics
    console.log('🧭 Navigation Analytics:', {
      itemId: item.id,
      label: item.label,
      variant,
      renderTime,
      timestamp: Date.now()
    });
  }, [activeDropdown, onNavigate, variant, renderTime]);

  // Fast hover handler for desktop
  const handleItemHover = useCallback((item: NavigationItem) => {
    if (window.innerWidth >= 768) { // Desktop only
      setHoveredItem(item.id);
      
      // Auto-open dropdown on hover (desktop)
      if (item.children && item.children.length > 0) {
        setActiveDropdown(item.id);
      }
    }
  }, []);

  // Theme-based styling
  const themeClasses = useMemo(() => {
    const themes = {
      light: {
        bg: 'bg-white border-gray-200',
        text: 'text-gray-700',
        active: 'bg-blue-50 text-blue-700 border-blue-200',
        hover: 'hover:bg-gray-50 hover:text-gray-900'
      },
      dark: {
        bg: 'bg-gray-900 border-gray-700',
        text: 'text-gray-300',
        active: 'bg-blue-900 text-blue-300 border-blue-700',
        hover: 'hover:bg-gray-800 hover:text-white'
      },
      colombia: {
        bg: 'bg-gradient-colombia-soft border-colombia-yellow/20',
        text: 'text-gray-700',
        active: 'bg-gradient-colombia text-white border-colombia-yellow',
        hover: 'hover:bg-colombia-yellow/10 hover:text-colombia-blue'
      }
    };
    return themes[theme];
  }, [theme]);

  // Size-based styling
  const sizeClasses = useMemo(() => {
    const sizes = {
      sm: {
        container: 'p-2',
        item: 'px-2 py-1 text-sm',
        icon: 'w-4 h-4',
        gap: 'gap-1'
      },
      md: {
        container: 'p-4',
        item: 'px-3 py-2 text-base',
        icon: 'w-5 h-5',
        gap: 'gap-2'
      },
      lg: {
        container: 'p-6',
        item: 'px-4 py-3 text-lg',
        icon: 'w-6 h-6',
        gap: 'gap-3'
      }
    };
    return sizes[size];
  }, [size]);

  // Render navigation item
  const renderNavigationItem = useCallback((item: NavigationItem, level = 0) => {
    const isActive = item.active || currentPath === item.href || currentPath === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = activeDropdown === item.id;
    const isHovered = hoveredItem === item.id;

    return (
      <div key={item.id} className="relative">
        <FastButton
          variant="ghost"
          size={size}
          className={`
            w-full justify-start ${sizeClasses.gap} ${sizeClasses.item}
            ${themeClasses.text} ${themeClasses.hover}
            ${isActive ? themeClasses.active : ''}
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${level > 0 ? 'ml-4 border-l-2 border-gray-200 pl-4' : ''}
            transition-all duration-150
          `}
          onClick={(e) => handleItemClick(item, e)}
          onHover={() => handleItemHover(item)}
          disabled={item.disabled}
          accessibility={{
            ariaLabel: item.description || item.label,
            role: 'menuitem'
          }}
        >
          {/* Icon */}
          {showIcons && item.icon && (
            <span className={`${sizeClasses.icon} flex-shrink-0`}>
              {item.icon}
            </span>
          )}

          {/* Label */}
          {showLabels && (
            <span className={`${isCollapsed && variant === 'sidebar' ? 'hidden' : 'truncate'}`}>
              {item.label}
            </span>
          )}

          {/* Shortcut */}
          {enableShortcuts && item.shortcut && !isCollapsed && (
            <span className="ml-auto text-xs opacity-60 font-mono">
              {item.shortcut}
            </span>
          )}

          {/* Badge */}
          {showBadges && item.badge && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {item.badge}
            </span>
          )}

          {/* Dropdown indicator */}
          {hasChildren && (
            <FaChevronDown 
              className={`w-3 h-3 ml-auto transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          )}
        </FastButton>

        {/* Dropdown menu */}
        {hasChildren && isDropdownOpen && (
          <div className={`
            ${variant === 'sidebar' ? 'mt-1' : 'absolute top-full left-0 mt-1 min-w-[200px] z-50'}
            ${themeClasses.bg} border rounded-lg shadow-lg
            ${animated ? 'animate-in slide-in-from-top-2 duration-150' : ''}
          `}>
            <div className={sizeClasses.container}>
              {item.children?.map(childItem => renderNavigationItem(childItem, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  }, [
    currentPath, activeDropdown, hoveredItem, showIcons, showLabels, showBadges, 
    enableShortcuts, isCollapsed, variant, size, sizeClasses, themeClasses, 
    animated, handleItemClick, handleItemHover
  ]);

  // Main navigation classes
  const navigationClasses = useMemo(() => {
    const baseClasses = [
      'fast-navigation-r7aqkx-225-d',
      'relative',
      themeClasses.bg,
      'border',
      'transition-all',
      'duration-300'
    ];

    const variantClasses = {
      horizontal: ['flex', 'items-center', 'rounded-lg', sizeClasses.container],
      vertical: ['flex', 'flex-col', 'rounded-lg', sizeClasses.container],
      sidebar: [
        'flex', 'flex-col', 'h-full',
        isCollapsed ? 'w-16' : 'w-64',
        'border-r', 'border-l-0', 'border-t-0', 'border-b-0'
      ],
      breadcrumb: ['flex', 'items-center', 'rounded-lg', 'px-4', 'py-2']
    };

    return [...baseClasses, ...variantClasses[variant], className].filter(Boolean).join(' ');
  }, [variant, themeClasses, sizeClasses, isCollapsed, className]);

  return (
    <nav ref={navRef} className={navigationClasses} role="navigation" aria-label="Main navigation">
      
      {/* Sidebar collapse toggle */}
      {variant === 'sidebar' && collapsible && (
        <div className="p-2 border-b border-gray-200">
          <FastButton
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full"
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <FaBars className="w-4 h-4" />
            {!isCollapsed && <span className="ml-2">Contraer</span>}
          </FastButton>
        </div>
      )}

      {/* Mobile menu toggle */}
      {responsive && variant !== 'sidebar' && (
        <div className="md:hidden">
          <FastButton
            variant="ghost"
            size={size}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </FastButton>
        </div>
      )}

      {/* Search bar */}
      {enableSearch && !isCollapsed && (
        <div className="p-2 border-b border-gray-200">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar navegación..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Navigation items */}
      <div className={`
        ${variant === 'horizontal' ? 'flex items-center space-x-1' : 'space-y-1'}
        ${responsive && variant !== 'sidebar' ? (isMobileMenuOpen ? 'block' : 'hidden md:flex') : ''}
        ${variant === 'sidebar' ? 'flex-1 overflow-y-auto' : ''}
      `}>
        {filteredItems.map(item => renderNavigationItem(item))}
      </div>

      {/* Responsive mobile overlay */}
      {responsive && isMobileMenuOpen && variant !== 'sidebar' && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Performance indicator (development only) */}
      {import.meta.env.DEV && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          {renderTime}ms
        </div>
      )}
    </nav>
  );
});

FastNavigation.displayName = 'FastNavigation';

export default FastNavigation;