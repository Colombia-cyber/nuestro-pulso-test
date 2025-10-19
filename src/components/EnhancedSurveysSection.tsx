import React, { useState } from 'react';
import { FaPoll, FaCheckCircle, FaChartBar, FaClock, FaFire } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdHowToVote } from 'react-icons/md';
import { ColombianLoader, SectionLoader } from './ColombianLoader';

interface SurveyOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  category: string;
  totalVotes: number;
  options: SurveyOption[];
  expiresAt: string;
  trending?: boolean;
  userVoted?: boolean;
}

const surveyCategories = [
  { id: 'all', label: 'Todas', icon: '🗳️' },
  { id: 'politics', label: 'Política', icon: '🏛️' },
  { id: 'social', label: 'Social', icon: '👥' },
  { id: 'economy', label: 'Economía', icon: '💰' },
  { id: 'environment', label: 'Ambiente', icon: '🌍' },
  { id: 'culture', label: 'Cultura', icon: '🎭' },
];

const generateSurveys = (category: string): Survey[] => {
  return Array.from({ length: 8 }, (_, i) => {
    const totalVotes = Math.floor(Math.random() * 10000) + 500;
    const numOptions = Math.floor(Math.random() * 2) + 3; // 3-4 options
    
    const options: SurveyOption[] = Array.from({ length: numOptions }, (_, j) => {
      const votes = Math.floor(Math.random() * totalVotes * 0.4);
      return {
        id: `option-${i}-${j}`,
        text: `Opción ${j + 1}: ${['Sí', 'No', 'Tal vez', 'No sé'][j % 4]}`,
        votes,
        percentage: 0,
      };
    });

    // Calculate percentages - ensure they sum to 100%
    const totalOptionVotes = options.reduce((sum, opt) => sum + opt.votes, 0);
    if (totalOptionVotes > 0) {
      let remainingPercentage = 100;
      options.forEach((opt, idx) => {
        if (idx === options.length - 1) {
          // Last option gets remaining percentage to ensure sum is 100%
          opt.percentage = remainingPercentage;
        } else {
          opt.percentage = Math.round((opt.votes / totalOptionVotes) * 100);
          remainingPercentage -= opt.percentage;
        }
      });
    }

    return {
      id: `survey-${category}-${i}`,
      title: `¿Qué opinas sobre ${category === 'all' ? 'Colombia' : category} en el país? #${i + 1}`,
      description: `Participa en esta encuesta sobre ${category} y comparte tu opinión con miles de colombianos.`,
      category: category,
      totalVotes,
      options,
      expiresAt: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      trending: Math.random() > 0.7,
      userVoted: Math.random() > 0.5,
    };
  });
};

export const EnhancedSurveysSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [surveys, setSurveys] = useState<Survey[]>(generateSurveys('all'));
  const [loading, setLoading] = useState(false);
  const [votedSurveys, setVotedSurveys] = useState<Set<string>>(new Set());

  const handleCategoryChange = (categoryId: string) => {
    setLoading(true);
    setSelectedCategory(categoryId);
    
    setTimeout(() => {
      setSurveys(generateSurveys(categoryId));
      setLoading(false);
    }, 300);
  };

  const handleVote = (surveyId: string, optionId: string) => {
    setVotedSurveys(prev => new Set(prev).add(surveyId));
    // Update survey with new vote
    setSurveys(prev => prev.map(survey => {
      if (survey.id === surveyId) {
        return { ...survey, userVoted: true };
      }
      return survey;
    }));
  };

  const getTimeRemaining = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
    
    if (diffDays <= 0) return 'Finalizada';
    if (diffDays === 1) return '1 día restante';
    return `${diffDays} días restantes`;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 shadow-colombia">
              <FaPoll className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-colombia-gradient">
                Encuestas Públicas
              </h1>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <MdHowToVote className="text-green-600" />
                Tu voz cuenta - Vota ahora
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-wrap gap-3">
            {surveyCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`
                  px-6 py-3 rounded-xl font-semibold text-sm
                  transition-all duration-300 transform hover:scale-105
                  ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg'
                    : 'glass-card hover:shadow-md'
                  }
                `}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Surveys Grid */}
        {loading ? (
          <SectionLoader title="Cargando Encuestas..." count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {surveys.map((survey, index) => (
              <div
                key={survey.id}
                className="glass-card overflow-hidden group hover:shadow-floating transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {survey.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {survey.description}
                      </p>
                    </div>
                    {survey.trending && (
                      <div className="ml-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse">
                        <FaFire />
                      </div>
                    )}
                  </div>

                  {/* Stats Bar */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      <MdHowToVote className="text-green-600" />
                      <span className="font-semibold">{survey.totalVotes.toLocaleString()} votos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-blue-600" />
                      <span>{getTimeRemaining(survey.expiresAt)}</span>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 mb-4">
                    {survey.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => !survey.userVoted && handleVote(survey.id, option.id)}
                        disabled={survey.userVoted}
                        className={`
                          w-full text-left p-4 rounded-xl transition-all duration-300
                          ${survey.userVoted 
                            ? 'glass-card cursor-default' 
                            : 'glass-card hover:shadow-md hover:scale-102 cursor-pointer'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">{option.text}</span>
                          {survey.userVoted && (
                            <span className="text-sm font-bold text-green-600">
                              {option.percentage.toFixed(1)}%
                            </span>
                          )}
                        </div>
                        
                        {survey.userVoted && (
                          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                              style={{ width: `${option.percentage}%` }}
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Action Button */}
                  {!survey.userVoted ? (
                    <div className="text-center text-sm text-gray-600 italic">
                      Selecciona una opción para votar
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                      <FaCheckCircle />
                      <span>Has votado en esta encuesta</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
