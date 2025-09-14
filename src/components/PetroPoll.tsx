import React, { useState, useEffect } from 'react';
import { FaShare, FaWhatsapp, FaTwitter, FaFacebook } from 'react-icons/fa';
import PollComments from './PollComments';

interface VoteData {
  out: number;
  in: number;
  total: number;
  lastVoted?: string;
  userVote?: 'out' | 'in' | null;
}

const PetroPoll: React.FC = () => {
  const [votes, setVotes] = useState<VoteData>({
    out: 0,
    in: 0,
    total: 0,
    userVote: null
  });
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem('petro-poll-votes');
    const userVote = localStorage.getItem('petro-poll-user-vote');
    const userFingerprint = generateBrowserFingerprint();
    const votedFingerprints = JSON.parse(localStorage.getItem('petro-poll-fingerprints') || '[]');
    
    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    } else {
      // Initialize with some demo data
      const initialVotes = {
        out: 2847,
        in: 1823,
        total: 4670,
        userVote: null
      };
      setVotes(initialVotes);
      localStorage.setItem('petro-poll-votes', JSON.stringify(initialVotes));
    }

    if (userVote || votedFingerprints.includes(userFingerprint)) {
      setHasVoted(true);
      if (userVote) {
        setVotes(prev => ({ ...prev, userVote: userVote as 'out' | 'in' }));
      }
    }
  }, []);

  // Generate a simple browser fingerprint for duplicate vote prevention
  const generateBrowserFingerprint = (): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('fingerprint', 10, 10);
    const canvasFingerprint = canvas.toDataURL();
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvasFingerprint.slice(-50) // last 50 chars of canvas fingerprint
    ].join('|');
    
    return btoa(fingerprint).slice(0, 20); // base64 encoded, first 20 chars
  };

  const handleVote = async (choice: 'out' | 'in') => {
    if (hasVoted || isLoading) return;

    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const fingerprint = generateBrowserFingerprint();
      const votedFingerprints = JSON.parse(localStorage.getItem('petro-poll-fingerprints') || '[]');
      
      // Prevent duplicate voting
      if (votedFingerprints.includes(fingerprint)) {
        setHasVoted(true);
        setIsLoading(false);
        return;
      }

      const newVotes = {
        ...votes,
        [choice]: votes[choice] + 1,
        total: votes.total + 1,
        userVote: choice,
        lastVoted: new Date().toISOString()
      };

      setVotes(newVotes);
      setHasVoted(true);

      // Save to localStorage
      localStorage.setItem('petro-poll-votes', JSON.stringify(newVotes));
      localStorage.setItem('petro-poll-user-vote', choice);
      localStorage.setItem('petro-poll-fingerprints', JSON.stringify([...votedFingerprints, fingerprint]));
      
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePercentage = (voteCount: number): number => {
    return votes.total > 0 ? Math.round((voteCount / votes.total) * 100) : 0;
  };

  const shareResults = (platform: string) => {
    const outPercentage = calculatePercentage(votes.out);
    const inPercentage = calculatePercentage(votes.in);
    const text = `¿Quieres a Gustavo Petro FUERA o DENTRO como Presidente? 
    
FUERA: ${outPercentage}% (${votes.out.toLocaleString()} votos)
DENTRO: ${inPercentage}% (${votes.in.toLocaleString()} votos)

¡Vota tú también en Nuestro Pulso! 🇨🇴`;

    const url = window.location.href;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`);
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with Colombian colors */}
      <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">🇨🇴 Encuesta Presidencial</h2>
            <p className="text-lg opacity-90">¿Quieres a Gustavo Petro FUERA o DENTRO como Presidente?</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{votes.total.toLocaleString()}</div>
            <div className="text-sm opacity-80">votos totales</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!hasVoted ? (
          <div className="space-y-4 mb-6">
            <p className="text-gray-700 text-center mb-6">
              Tu voto es anónimo y será contado inmediatamente. ¡Cada opinión cuenta!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleVote('out')}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg"
              >
                {isLoading ? '...' : '🚫 FUERA'}
              </button>
              
              <button
                onClick={() => handleVote('in')}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg"
              >
                {isLoading ? '...' : '✅ DENTRO'}
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-700">
              ¡Gracias por votar! 
              {votes.userVote && (
                <span className="font-semibold ml-1">
                  Votaste: {votes.userVote === 'out' ? '🚫 FUERA' : '✅ DENTRO'}
                </span>
              )}
            </p>
          </div>
        )}

        {/* Live Results */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
            📊 Resultados en Tiempo Real
          </h3>
          
          {/* OUT Results */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🚫</span>
                <span className="font-semibold text-red-600">FUERA</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-red-600">
                  {calculatePercentage(votes.out)}%
                </div>
                <div className="text-sm text-gray-500">
                  {votes.out.toLocaleString()} votos
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-red-500 h-4 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${calculatePercentage(votes.out)}%` }}
              />
            </div>
          </div>

          {/* IN Results */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✅</span>
                <span className="font-semibold text-green-600">DENTRO</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-green-600">
                  {calculatePercentage(votes.in)}%
                </div>
                <div className="text-sm text-gray-500">
                  {votes.in.toLocaleString()} votos
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${calculatePercentage(votes.in)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <FaShare /> Comparte los Resultados
            </h4>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => shareResults('whatsapp')}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors"
                title="Compartir en WhatsApp"
              >
                <FaWhatsapp size={20} />
              </button>
              <button
                onClick={() => shareResults('twitter')}
                className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors"
                title="Compartir en Twitter"
              >
                <FaTwitter size={20} />
              </button>
              <button
                onClick={() => shareResults('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                title="Compartir en Facebook"
              >
                <FaFacebook size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Encuesta anónima • Resultados actualizados en tiempo real</p>
          {votes.lastVoted && (
            <p>Última actualización: {new Date(votes.lastVoted).toLocaleTimeString()}</p>
          )}
        </div>

        {/* Comments Section */}
        <PollComments pollId="petro-approval-2024" />
      </div>
    </div>
  );
};

export default PetroPoll;