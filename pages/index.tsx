import Head from 'next/head';
import StickyNavBar from '../components/StickyNavBar';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <>
      <Head>
        <title>Nuestro Pulso - Construyendo el Futuro de Colombia</title>
        <meta name="description" content="Join civic discussions, debates, and surveys to shape Colombia's future. Unidos por el mañana - United for tomorrow." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Colombia, civic engagement, futuro, unity, national pride, democracy" />
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