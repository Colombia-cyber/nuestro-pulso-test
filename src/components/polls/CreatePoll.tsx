import React, { useState } from 'react';
import { CreatePollRequest, Poll } from '../../types/polls';

interface CreatePollProps {
  onPollCreate?: (pollData: CreatePollRequest) => void;
  onCancel?: () => void;
}

const CreatePoll: React.FC<CreatePollProps> = ({ onPollCreate, onCancel }) => {
  const [formData, setFormData] = useState<CreatePollRequest>({
    title: '',
    description: '',
    question: '',
    options: [
      { text: '', imageUrl: '' },
      { text: '', imageUrl: '' }
    ],
    category: 'politica',
    tags: [],
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    allowMultiple: false,
    isAnonymous: true,
    region: 'nacional'
  });

  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories: Array<{ value: Poll['category']; label: string; icon: string }> = [
    { value: 'politica', label: 'Política', icon: '🏛️' },
    { value: 'social', label: 'Social', icon: '👥' },
    { value: 'economia', label: 'Economía', icon: '💰' },
    { value: 'seguridad', label: 'Seguridad', icon: '🛡️' },
    { value: 'educacion', label: 'Educación', icon: '📚' },
    { value: 'salud', label: 'Salud', icon: '🏥' }
  ];

  const regions = [
    { value: 'nacional', label: 'Nacional', icon: '🇨🇴' },
    { value: 'bogota', label: 'Bogotá', icon: '🏙️' },
    { value: 'medellin', label: 'Medellín', icon: '🌄' },
    { value: 'cali', label: 'Cali', icon: '🌴' },
    { value: 'barranquilla', label: 'Barranquilla', icon: '🏖️' },
    { value: 'cartagena', label: 'Cartagena', icon: '🏰' }
  ];

  const handleInputChange = (field: keyof CreatePollRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleOptionChange = (index: number, field: 'text' | 'imageUrl', value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value
    };
    handleInputChange('options', newOptions);
  };

  const addOption = () => {
    if (formData.options.length < 8) {
      handleInputChange('options', [
        ...formData.options,
        { text: '', imageUrl: '' }
      ]);
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      handleInputChange('options', newOptions);
    }
  };

  const addTag = () => {
    const trimmedTag = currentTag.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag) && formData.tags.length < 10) {
      handleInputChange('tags', [...formData.tags, trimmedTag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (formData.title.length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres';
    }

    if (!formData.question.trim()) {
      newErrors.question = 'La pregunta es obligatoria';
    } else if (formData.question.length < 10) {
      newErrors.question = 'La pregunta debe tener al menos 10 caracteres';
    }

    const validOptions = formData.options.filter(opt => opt.text.trim());
    if (validOptions.length < 2) {
      newErrors.options = 'Debes proporcionar al menos 2 opciones';
    }

    formData.options.forEach((option, index) => {
      if (option.text.trim() && option.text.length < 3) {
        newErrors[`option_${index}`] = 'La opción debe tener al menos 3 caracteres';
      }
    });

    if (formData.endsAt <= new Date()) {
      newErrors.endsAt = 'La fecha de cierre debe ser futura';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Clean up options (remove empty ones)
    const cleanedOptions = formData.options
      .filter(opt => opt.text.trim())
      .map(opt => ({ text: opt.text.trim(), imageUrl: opt.imageUrl?.trim() || undefined }));

    const pollData: CreatePollRequest = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      question: formData.question.trim(),
      options: cleanedOptions
    };

    onPollCreate?.(pollData);
  };

  const getCategoryColor = (category: Poll['category']) => {
    const colors = {
      politica: 'from-blue-500 to-blue-600',
      social: 'from-green-500 to-green-600',
      economia: 'from-yellow-500 to-orange-500',
      seguridad: 'from-red-500 to-red-600',
      educacion: 'from-purple-500 to-purple-600',
      salud: 'from-pink-500 to-pink-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 rounded-2xl p-8 mb-8 text-white">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                ➕ Crear Nueva Encuesta
              </h1>
              <p className="text-white/90 text-lg">
                Crea una encuesta para conocer la opinión de los colombianos sobre temas importantes
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>📝</span>
                <span>Información Básica</span>
              </h2>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título de la Encuesta *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Ej: Prioridades de Seguridad Nacional 2024"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={150}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  <p className="text-gray-500 text-sm mt-1">
                    {formData.title.length}/150 caracteres
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe el propósito y contexto de tu encuesta..."
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={500}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  <p className="text-gray-500 text-sm mt-1">
                    {formData.description.length}/500 caracteres
                  </p>
                </div>

                {/* Question */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pregunta Principal *
                  </label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => handleInputChange('question', e.target.value)}
                    placeholder="¿Cuál consideras la prioridad más importante?"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.question ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={200}
                  />
                  {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question}</p>}
                  <p className="text-gray-500 text-sm mt-1">
                    {formData.question.length}/200 caracteres
                  </p>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>📊</span>
                <span>Opciones de Respuesta</span>
              </h2>

              <div className="space-y-4">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-700">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                          placeholder={`Opción ${index + 1}`}
                          className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors[`option_${index}`] ? 'border-red-500' : 'border-gray-300'
                          }`}
                          maxLength={100}
                        />
                      </div>
                      {errors[`option_${index}`] && (
                        <p className="text-red-500 text-sm">{errors[`option_${index}`]}</p>
                      )}
                    </div>
                    
                    {formData.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}

                {errors.options && <p className="text-red-500 text-sm">{errors.options}</p>}

                {formData.options.length < 8 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    ➕ Agregar Opción
                  </button>
                )}
              </div>
            </div>

            {/* Configuration */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>⚙️</span>
                <span>Configuración</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value as Poll['category'])}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Región
                  </label>
                  <select
                    value={formData.region || 'nacional'}
                    onChange={(e) => handleInputChange('region', e.target.value as Poll['region'])}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.icon} {region.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha de Cierre
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.endsAt.toISOString().slice(0, 16)}
                    onChange={(e) => handleInputChange('endsAt', new Date(e.target.value))}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.endsAt ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.endsAt && <p className="text-red-500 text-sm mt-1">{errors.endsAt}</p>}
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allowMultiple"
                      checked={formData.allowMultiple}
                      onChange={(e) => handleInputChange('allowMultiple', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="allowMultiple" className="text-sm font-medium text-gray-700">
                      Permitir múltiples selecciones
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isAnonymous"
                      checked={formData.isAnonymous}
                      onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isAnonymous" className="text-sm font-medium text-gray-700">
                      Votación anónima
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>🏷️</span>
                <span>Etiquetas</span>
              </h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Agregar etiqueta..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={20}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Agregar
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-red-500/10 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>👁️</span>
                <span>Vista Previa</span>
              </h2>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(formData.category)}`}>
                    {formData.category.toUpperCase()}
                  </span>
                  {formData.region && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      📍 {formData.region}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {formData.title || 'Título de la encuesta'}
                </h3>

                <p className="text-gray-600 mb-4">
                  {formData.description || 'Descripción de la encuesta'}
                </p>

                <h4 className="font-semibold text-gray-800 mb-3">
                  {formData.question || 'Pregunta principal'}
                </h4>

                <div className="space-y-2">
                  {formData.options.filter(opt => opt.text.trim()).map((option, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
              >
                🚀 Crear Encuesta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;