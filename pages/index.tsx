import Head from 'next/head';
import StickyNavBar from '../components/StickyNavBar';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <>
      <Head>
        <title>Nuestro Pulso - Colombia's Civic Pulse</title>
        <meta name="description" content="Join civic discussions, debates, and surveys to shape the future of Colombia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-gray-50 font-inter">
        <StickyNavBar />
        <HeroSection />
        {/* Future sections can be added here */}
      </main>
    </>
  );
};

export default Home;