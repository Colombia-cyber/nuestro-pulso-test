# Nuestro Pulso Test

## Setup
To get started with the project, follow these instructions:

1. Clone the repository:
   ```bash
   git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
   ```
2. Navigate into the project directory:
   ```bash
   cd nuestro-pulso-test
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Environment Configuration

1. Create a `.env` file in the project root and add your credentials. Use `.env.example` as a template.

### Firebase Authentication Setup

1. **Enable Auth Providers**  
   Go to [Firebase Console > Authentication > Sign-in method](https://console.firebase.google.com/) and enable Email/Password (and other providers if needed).

2. **Usage Example**  
   Import and use Firebase authentication in your app:
   ```js
   import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

   const auth = getAuth();
   signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       // Signed in
       const user = userCredential.user;
     })
     .catch((error) => {
       // Handle Errors
     });
   ```

### Universal Search Configuration

The Universal Search feature supports both local search and Google Custom Search API integration:

#### Environment Variables

```bash
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Universal Search Configuration
REACT_APP_GOOGLE_SEARCH_API_KEY=your_google_search_api_key
REACT_APP_GOOGLE_SEARCH_ENGINE_ID=your_google_custom_search_engine_id
REACT_APP_SEARCH_API_BASE_URL=https://www.googleapis.com/customsearch/v1
REACT_APP_SEARCH_RATE_LIMIT_REQUESTS=100
REACT_APP_SEARCH_RATE_LIMIT_WINDOW_MINUTES=60
REACT_APP_SEARCH_MAX_RESULTS=2000
REACT_APP_SEARCH_RESULTS_PER_PAGE=6
REACT_APP_SEARCH_DEBOUNCE_DELAY=500
REACT_APP_SEARCH_ENABLE_MOCK_MODE=true
```

#### Google Custom Search Setup (Optional)

1. **Create Google Custom Search Engine**:
   - Go to [Google Custom Search](https://cse.google.com/)
   - Create a new search engine
   - Configure to search the entire web or specific sites
   - Note your Search Engine ID

2. **Get Google API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Custom Search API
   - Create credentials (API Key)
   - Note your API Key

3. **Configure Environment**:
   - Set `REACT_APP_GOOGLE_SEARCH_API_KEY` to your API key
   - Set `REACT_APP_GOOGLE_SEARCH_ENGINE_ID` to your search engine ID
   - Set `REACT_APP_SEARCH_ENABLE_MOCK_MODE=false` to use real API

#### Mock Mode (Default)

When `REACT_APP_SEARCH_ENABLE_MOCK_MODE=true` or Google API credentials are not provided, the search will use:
- Comprehensive local database with 20+ articles
- Mock Google Search results for realistic testing
- All search features work without external API dependencies

## Development

### Running the Development Server

```bash
npm run dev
# or
./dev.sh
```

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run lint
npm test  # If Jest is configured
```

### Manual Search Testing

1. Start the development server
2. Click the "🔍 Buscar" button in the navigation
3. Test these search queries:
   - **"Facebook"** - Should return 6 comprehensive results
   - **"Colombia"** - Should return 15+ results with pagination
   - **"Gustavo Petro"** - Should return 2 targeted political results
   - **"Centro Democrático"** - Should return opposition party content
   - **"Trump Colombia"** - Should return international relations results

4. Test search features:
   - **Pagination**: Navigate between pages with URL persistence
   - **Category Filtering**: Filter by Politics, Technology, Security, etc.
   - **Display Modes**: Toggle between Cards and List view
   - **Sorting**: Sort by relevance, date, category, or source
   - **Real-time Search**: Type to search with debounced input

---

## Features

### Core Platform
- Mobile-first design
- Built with TypeScript, React, and Tailwind CSS
- Feature parity with existing civic engagement platforms
- Continuous Integration and Continuous Deployment (CI/CD) workflow

### Universal Search
- **Multi-source aggregation**: Local database + Google Custom Search API
- **Advanced pagination**: Numbered pages, quick jump, load more, infinite scroll
- **URL persistence**: Shareable search results with back/forward navigation
- **Category filtering**: Politics, International, Social, Security, Technology, Economy
- **Multiple display modes**: Cards and List views
- **Real-time search**: Debounced input with instant results
- **Rate limiting**: Configurable API rate limits and fallbacks
- **Fallback data**: No empty states for popular queries
- **Deep pagination**: Up to 2000 results with configurable limits

### Search Data Sources
- **Local Database**: 20+ curated articles covering:
  - Facebook and Meta in Colombia
  - Gustavo Petro government policies
  - Centro Democrático opposition coverage
  - Trump-Colombia relations
  - Security and border control
  - Technology and digital transformation
  - Economic news and reforms

- **Google Custom Search**: Configurable integration with:
  - Colombian news sources prioritization
  - Spanish language results
  - Rate limiting and error handling
  - Automatic fallback to local data

## Security & Compliance

- **Never commit your real `.env` file, only `.env.example`**
- **Rate limiting**: Respects Google API quotas and implements backoff
- **Robots.txt compliance**: Configurable web crawling ethics
- **Data privacy**: Search tracking limited to activity analytics

## Troubleshooting

### Search Issues
- **No results**: Check if `REACT_APP_SEARCH_ENABLE_MOCK_MODE=true` for local testing
- **API errors**: Verify Google API credentials and rate limits
- **Slow search**: Adjust `REACT_APP_SEARCH_DEBOUNCE_DELAY` (default: 500ms)

### Build Issues
- **TypeScript errors**: Run `npm run lint` to check for issues
- **Environment variables**: Ensure `.env` file exists and contains required variables