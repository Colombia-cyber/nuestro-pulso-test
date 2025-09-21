import React, { useState } from 'react';
import { 
  FaHeart, FaThumbsUp, FaThumbsDown, FaStar, FaShare, 
  FaBug, FaLightbulb, FaPaperPlane, FaTimes, FaSmile 
} from 'react-icons/fa';
import { MdFeedback, MdSentimentSatisfied, MdSentimentDissatisfied } from 'react-icons/md';
import { BiHappy, BiSad } from 'react-icons/bi';

interface ThankYouSectionProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery?: string;
  searchResults?: number;
  onSubmitFeedback: (feedback: any) => void;
  className?: string;
}

interface FeedbackData {
  rating: number;
  category: string;
  helpful: boolean;
  comment: string;
  suggestionType?: string;
  wouldRecommend: boolean;
  searchSatisfaction: number;
}

const ThankYouSection: React.FC<ThankYouSectionProps> = ({
  isOpen,
  onClose,
  searchQuery = '',
  searchResults = 0,
  onSubmitFeedback,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: 0,
    category: '',
    helpful: false,
    comment: '',
    suggestionType: '',
    wouldRecommend: false,
    searchSatisfaction: 0
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const feedbackCategories = [
    { id: 'excellent', label: '¡Excelente!', icon: '🎉', color: 'bg-green-500' },
    { id: 'good', label: 'Muy bueno', icon: '😊', color: 'bg-blue-500' },
    { id: 'average', label: 'Regular', icon: '😐', color: 'bg-yellow-500' },
    { id: 'poor', label: 'Necesita mejorar', icon: '😕', color: 'bg-orange-500' },
    { id: 'terrible', label: 'Muy malo', icon: '😞', color: 'bg-red-500' }
  ];

  const suggestionTypes = [
    { id: 'feature', label: 'Nueva funcionalidad', icon: '💡' },
    { id: 'bug', label: 'Reportar error', icon: '🐛' },
    { id: 'speed', label: 'Velocidad de búsqueda', icon: '⚡' },
    { id: 'results', label: 'Calidad de resultados', icon: '🎯' },
    { id: 'ui', label: 'Interfaz de usuario', icon: '🎨' },
    { id: 'other', label: 'Otro', icon: '💭' }
  ];

  const handleRatingClick = (rating: number) => {
    setFeedback({ ...feedback, rating });
    if (rating >= 4) {
      setFeedback(prev => ({ ...prev, helpful: true, category: 'excellent' }));
    }
  };

  const handleCategorySelect = (category: string) => {
    setFeedback({ ...feedback, category });
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    onSubmitFeedback(feedback);
    setIsSubmitted(true);
    
    // Auto-close after showing thank you message
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setCurrentStep(1);
      setFeedback({
        rating: 0,
        category: '',
        helpful: false,
        comment: '',
        suggestionType: '',
        wouldRecommend: false,
        searchSatisfaction: 0
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Muchas gracias!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Tu retroalimentación es muy valiosa para nosotros. Nos ayuda a mejorar la experiencia de búsqueda para todos.
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-600">
            <FaHeart className="w-5 h-5 animate-pulse" />
            <span className="font-medium">Hecho con amor por el equipo de Copilot Search</span>
            <FaHeart className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <MdFeedback className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Ayúdanos a mejorar
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tu opinión es muy importante para nosotros
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Search Context */}
          {searchQuery && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tu búsqueda:</h3>
              <p className="text-blue-700 dark:text-blue-300 font-medium">"{searchQuery}"</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {searchResults.toLocaleString()} resultados encontrados
              </p>
            </div>
          )}

          {/* Step 1: Overall Rating */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ¿Cómo calificarías tu experiencia de búsqueda?
                </h3>
                
                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className={`text-3xl transition-all duration-200 hover:scale-110 ${
                        star <= feedback.rating 
                          ? 'text-yellow-400' 
                          : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>

                {/* Category Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {feedbackCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        feedback.category === category.id
                          ? `${category.color} text-white border-transparent`
                          : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="font-medium text-sm">{category.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Detailed Feedback */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Cuéntanos más detalles
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tu retroalimentación específica nos ayuda a mejorar
                </p>
              </div>

              {/* Search Satisfaction */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  ¿Qué tan satisfecho estás con los resultados de búsqueda?
                </label>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-sm text-gray-500">Muy insatisfecho</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFeedback({...feedback, searchSatisfaction: level})}
                        className={`w-8 h-8 rounded-full border-2 transition-colors ${
                          level <= feedback.searchSatisfaction
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 dark:border-gray-600 text-gray-400'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">Muy satisfecho</span>
                </div>
              </div>

              {/* Suggestion Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  ¿En qué área podemos mejorar?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {suggestionTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFeedback({...feedback, suggestionType: type.id})}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        feedback.suggestionType === type.id
                          ? 'bg-purple-100 border-purple-300 text-purple-700 dark:bg-purple-900/30 dark:border-purple-600 dark:text-purple-300'
                          : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg mb-1">{type.icon}</div>
                      <div className="text-xs font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comentarios adicionales (opcional)
                </label>
                <textarea
                  value={feedback.comment}
                  onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
                  placeholder="Comparte tus ideas, sugerencias o reporta algún problema..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  rows={4}
                />
              </div>

              {/* Would Recommend */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  ¿Recomendarías Copilot Search a otros?
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setFeedback({...feedback, wouldRecommend: true})}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      feedback.wouldRecommend === true
                        ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <FaThumbsUp className="w-4 h-4" />
                    Sí, definitivamente
                  </button>
                  <button
                    onClick={() => setFeedback({...feedback, wouldRecommend: false})}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      feedback.wouldRecommend === false
                        ? 'bg-red-100 border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300'
                        : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <FaThumbsDown className="w-4 h-4" />
                    No, necesita mejorar
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="w-4 h-4" />
                  Enviar retroalimentación
                </button>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              {[1, 2].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    step === currentStep
                      ? 'bg-purple-500'
                      : step < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouSection;