import Head from 'next/head';
import StickyNavBar from '../components/StickyNavBar';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <>
      <Head>
        <title>Nuestro Pulso - Colombia's Civic Pulse</title>
        <meta name="description" content="Join civic discussions, debates, and surveys to shape the future of Colombia. Your voice matters in building a better tomorrow." />
        <meta name="keywords" content="Colombia, civic engagement, democracy, political discussion, surveys, debates, community" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <meta property="og:title" content="Nuestro Pulso - Colombia's Civic Pulse" />
        <meta property="og:description" content="Join civic discussions, debates, and surveys to shape the future of Colombia" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      
      <main className="min-h-screen bg-gray-50 font-inter">
        <StickyNavBar />
        <HeroSection />
        
        {/* Main content anchor for accessibility */}
        <section id="main-content" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Empowering Colombian Democracy
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nuestro Pulso is more than just a platform - it's a movement towards a more 
              engaged and participatory democracy where every Colombian voice can be heard 
              and make a difference.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Open Dialogue</h3>
              <p className="text-gray-600">
                Engage in meaningful conversations with fellow Colombians about the issues that matter most.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fair Debates</h3>
              <p className="text-gray-600">
                Participate in structured debates on key political and social issues affecting our nation.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Voice Your Opinion</h3>
              <p className="text-gray-600">
                Take part in surveys and polls that help shape public policy and community decisions.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;