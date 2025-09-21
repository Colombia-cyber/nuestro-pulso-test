# Topic Navigation Documentation

## Overview
This document describes the topic navigation system implemented for the Copilot Search AI Interface, focusing on text-only navigation, dedicated political pages, and instant search functionality.

## Key Components

### 1. Topic Configuration (`src/config/newsTopics.ts`)

**Priority Topic Order:**
- **Local Mode**: `['donald-trump-local', 'right-wing', 'drugs-crime', 'terror-news', 'gustavo-petro', 'congress', 'left-wing']`
- **World Mode**: `['donald-trump-world', 'world-right-wing', 'world-politics', 'world-terror', 'world-left-wing', 'world-travel']`

**Text Display Format:**
- All topics use `displayText` field for bold, uppercase labels
- Examples: "DONALD TRUMP", "DERECHA POLÍTICA", "DROGAS Y CRIMEN"
- Emoji fields kept for backward compatibility but not displayed

### 2. Featured Topics Component (`src/components/FeaturedTopics.tsx`)

**Text-Only Display:**
- Line 394-396: Bold heading with `displayText` instead of emoji
- Line 200-217: Dedicated page navigation logic for Left/Right Wing
- Context-aware descriptions based on Local/World mode

### 3. Universal Search Bar (`src/components/UniversalSearchBar.tsx`)

**Topic Pills:**
- Line 50-68: Bold, uppercase text buttons without emoji
- Enhanced accessibility with clear text labels
- Instant topic selection with visual feedback

### 4. Google Class Search Bar (`src/components/GoogleClassSearchBar.tsx`)

**Instant Mode Switching:**
- Line 201-211: Immediate re-search when switching Local/World modes
- Bold tab labels: "COLOMBIA LOCAL" vs "MUNDO GLOBAL"
- Context preservation during mode changes

## Dedicated Political Pages

### Right Wing Page (`src/pages/RightWing.tsx`)
**Conservative Content Topics:**
- Fortalecimiento Empresarial (Business Strengthening)
- Seguridad Ciudadana (Citizen Security)
- Inversión Extranjera (Foreign Investment)
- Tradición y Valores (Traditional Values)
- Reducción de Impuestos (Tax Reduction)
- Educación de Calidad (Quality Education)
- Defensa Nacional (National Defense)

### Left Wing Page (`src/pages/LeftWing.tsx`)
**Progressive Content Topics:**
- Reforma Tributaria (Tax Reform)
- Proceso de Paz (Peace Process)
- Educación Pública (Public Education)
- Derechos de los Trabajadores (Workers' Rights)
- Políticas Ambientales (Environmental Policies)
- Feminismo y Política (Feminism and Politics)

## Instant Features

### Comment Posting
- **Function**: `handleCommentSubmit()` in both political pages
- **Behavior**: Immediately updates comment count and displays new comment
- **Real-time Updates**: Article count, sidebar statistics automatically update

### Context Switching
- **Donald Trump Topics**: 
  - Local: "Noticias de Trump relevantes para Colombia"
  - World: "Noticias mundiales sobre Donald Trump"
- **Location Indicators**: "COLOMBIA" vs "MUNDIAL"
- **Instant Reloading**: No delays when switching contexts

## Navigation Logic

### Topic Tab Arrays
```typescript
// Local priority topics (in order)
const localPriority = [
  'donald-trump-local',  // Prominent placement
  'right-wing',          // Derecha Política 
  'drugs-crime',
  'terror-news',
  'gustavo-petro',
  'congress',
  'left-wing'
];

// World priority topics (in order)
const worldPriority = [
  'donald-trump-world',  // Prominent placement
  'world-right-wing',    // Derecha Mundial
  'world-politics',
  'world-terror',
  'world-left-wing',
  'world-travel'
];
```

### In-App Page Navigation
- **Left Wing**: Custom event dispatch to navigate to `/left-wing`
- **Right Wing**: Custom event dispatch to navigate to `/right-wing`
- **Other Topics**: Standard search navigation with topic filtering

## Accessibility Features

### Text-Only Design
- **No Visual Clutter**: Removed all emoji icons from navigation
- **Bold Clear Text**: Uppercase, bold labels for easy reading
- **Modern Styling**: Clean borders, consistent font weights
- **Focus Indicators**: Clear visual feedback for keyboard navigation

### Keyboard Support
- All topic buttons are fully keyboard accessible
- Tab navigation works properly through all elements
- Enter key activates topic selection

## Future Updates

### Adding New Topics
1. Update `newsTopics.ts` with new topic object
2. Add to appropriate priority array in `getPriorityTopics()`
3. Update `getTopicDisplays()` in `FeaturedTopics.tsx` if needed
4. Test both Local and World mode display

### Modifying Navigation
1. Priority order changes: Update arrays in `getPriorityTopics()`
2. Text changes: Update `displayText` fields in topic objects
3. New dedicated pages: Add navigation logic to `handleTopicClick()`

### Performance Considerations
- Topic switching is instant (no API delays)
- Comment posting uses optimistic updates
- Context switching preserves user queries
- All navigation is in-app (no external redirects)