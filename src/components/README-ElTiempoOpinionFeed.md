# El Tiempo Opinión RSS Feed Component

## Overview

The `ElTiempoOpinionFeed` component fetches, parses, and displays the El Tiempo Opinión RSS feed (https://www.eltiempo.com/rss/opinion.xml) with robust error handling and image support.

## Features

- ✅ Fetches and parses RSS XML feed using `fetch` and `DOMParser`
- ✅ Displays each item's title, link, description, category, and publication date
- ✅ Shows images from enclosure tags when available
- ✅ Formats publication dates in user-friendly way (es-CO locale)
- ✅ Shows loading and error messages as appropriate
- ✅ Robust error handling with retry functionality
- ✅ CORS fallback with demo data for development
- ✅ Responsive design using Tailwind CSS
- ✅ External link handling with proper security attributes

## Usage

```jsx
import React from 'react';
import ElTiempoOpinionFeed from './components/ElTiempoOpinionFeed';

const App = () => {
  return (
    <div>
      <ElTiempoOpinionFeed />
    </div>
  );
};

export default App;
```

## Component Location

- **File**: `src/components/ElTiempoOpinionFeed.jsx`
- **Export**: Default export

## Dependencies

- React 18.2.0+
- react-icons (for UI icons)
- Tailwind CSS (for styling)

## RSS Feed Structure

The component expects RSS 2.0 format with the following elements:

- `title` - Article title
- `link` - Article URL
- `description` - Article description/summary
- `category` - Article category
- `pubDate` - Publication date
- `enclosure` (optional) - Image URL

## Error Handling

- **Network Errors**: Shows error message with retry button
- **CORS Issues**: Falls back to demo data in development
- **Parse Errors**: Displays appropriate error messages
- **Missing Images**: Gracefully handles missing or broken images

## Styling

The component uses Tailwind CSS classes for responsive design and follows the existing design patterns in the Nuestro Pulso application.

## Date Formatting

Publication dates are formatted using `Intl.DateTimeFormat` with:
- Locale: `es-CO` (Colombian Spanish)
- Timezone: `America/Bogota`
- Format: Full date and time display

## Testing

The component includes fallback demo data that activates when the RSS feed cannot be fetched due to CORS or network issues, making it suitable for development and testing environments.