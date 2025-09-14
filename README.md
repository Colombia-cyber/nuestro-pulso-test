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

## Firebase Authentication Setup

1. Create a `.env` file in the project root and add your Firebase credentials. Use `.env.example` as a template.

2. **Enable Auth Providers**  
   Go to [Firebase Console > Authentication > Sign-in method](https://console.firebase.google.com/) and enable Email/Password (and other providers if needed).

3. **Usage Example**  
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
4. **Security Note**
   - Never commit your real `.env` file, only `.env.example.

---

## Features
- Mobile-first design
- Built with TypeScript, React, and Tailwind CSS
- Feature parity with existing civic engagement platforms
- Continuous Integration and Continuous Deployment (CI/CD) workflow
- **🗳️ Comprehensive Polls Module**
  - Interactive voting with real-time results
  - Colombian patriotic UI theme
  - Category-based filtering (Politics, Social, Economy, Security, Education, Health)
  - Regional polls (National, Bogotá, Medellín, Cali, etc.)
  - Trending polls algorithm
  - Mobile-responsive glassmorphism design
  - Backend-ready poll creation interface

## Testing
To run tests for the project, use the following command:
```bash
npm test
```

## Polls Module

### Overview
The Polls module is a comprehensive civic engagement feature that allows users to create, participate in, and view results of polls on important Colombian topics.

### Key Features
- **Real-time Voting**: Instant vote counting with percentage calculations
- **Category System**: Organized by Politics, Social, Economy, Security, Education, and Health
- **Regional Filtering**: National and regional polls (Bogotá, Medellín, Cali, etc.)
- **Trending Algorithm**: Popular polls highlighted prominently
- **Colombian Theme**: Patriotic yellow, blue, and red color scheme throughout
- **Mobile-First**: Responsive design with glassmorphism effects
- **Accessibility**: Full keyboard navigation and screen reader support

### Components
- `PollCard`: Individual poll display with voting interface
- `TrendingPolls`: Highlighted popular polls section
- `PollsGrid`: Filterable grid of all polls
- `PollsPage`: Main polls landing page
- `PollDetailPage`: Full-page detailed poll view
- `CreatePoll`: Backend-ready poll creation interface

### Data Structure
```typescript
interface Poll {
  id: string;
  title: string;
  description: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  category: 'politica' | 'social' | 'economia' | 'seguridad' | 'educacion' | 'salud';
  tags: string[];
  createdAt: Date;
  endsAt: Date;
  isActive: boolean;
  isTrending: boolean;
  // ... additional fields
}
```

### Usage Examples
```tsx
// Display trending polls
<TrendingPolls 
  polls={trendingPolls} 
  onVote={handleVote}
  onViewDetails={handleViewDetails}
/>

// Create new poll
<CreatePoll 
  onPollCreate={handlePollCreate}
  onCancel={handleCancel}
/>

// Detailed poll view
<PollDetailPage 
  poll={poll} 
  onVote={handleVote}
  userVote={userVote}
/>
```