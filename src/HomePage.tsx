import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CommunityChat from './modules/CommunityChat'
import DebateModule from './modules/DebateModule'
import SurveyPage from './modules/SurveyPage'
import NewsFeed from './modules/NewsFeed'
import CommentsSection from './modules/CommentsSection'
import SearchEngine from './modules/SearchEngine'
import PulseFeed from './modules/PulseFeed'
import CrimeAlerts from './modules/CrimeAlerts'
import CongressTracker from './modules/CongressTracker'
import ElectionHub from './modules/ElectionHub'
import CivicMarketplace from './modules/CivicMarketplace'
import AchieveTogetherCare from './modules/AchieveTogetherCare'
import CopilotAssistant from './modules/CopilotAssistant'

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 font-inter">
    <Navbar />
    <main className="max-w-5xl mx-auto px-2">
      <section id="hero"><HeroSection /></section>
      <section id="chat"><CommunityChat /></section>
      <section id="debate"><DebateModule /></section>
      <section id="survey"><SurveyPage /></section>
      <section id="news"><NewsFeed /></section>
      <section id="comments"><CommentsSection /></section>
      <section id="search"><SearchEngine /></section>
      <section id="pulse"><PulseFeed /></section>
      <section id="alerts"><CrimeAlerts /></section>
      <section id="congress"><CongressTracker /></section>
      <section id="elections"><ElectionHub /></section>
      <section id="market"><CivicMarketplace /></section>
      <section id="care"><AchieveTogetherCare /></section>
      <section id="assistant"><CopilotAssistant /></section>
    </main>
  </div>
)

export default HomePage