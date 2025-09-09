import HeroSection from '../HeroSection';
import AuthButton from '../components/AuthButton';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation/Auth Bar at the top */}
      <nav className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Nuestro Pulso
        </div>
        <AuthButton />
      </nav>
      
      <HeroSection />
    </div>
  );
};

export default Home;