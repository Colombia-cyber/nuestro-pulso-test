import React, { useState, useEffect } from 'react';
import { pollService } from '../../services/pollService.js';

export default function PollCreator({ onPollCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    question: '',
    options: ['', ''],
    targetSegments: [],
    allowMultipleVotes: false,
    expiresAt: ''
  });
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadSegments();
  }, []);

  const loadSegments = async () => {
    try {
      const segmentsData = await pollService.getUserSegments();
      setSegments(segmentsData);
    } catch (error) {
      console.error('Error loading segments:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.question) {
      alert('Por favor, completa los campos obligatorios');
      return;
    }

    const validOptions = formData.options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      alert('Debes tener al menos 2 opciones válidas');
      return;
    }

    try {
      setLoading(true);
      await pollService.createPoll({
        ...formData,
        options: validOptions,
        createdBy: 'admin' // In real app, get from auth context
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        question: '',
        options: ['', ''],
        targetSegments: [],
        allowMultipleVotes: false,
        expiresAt: ''
      });
      
      if (onPollCreated) {
        onPollCreated();
      }
    } catch (error) {
      console.error('Error creating poll:', error);
      alert('Error al crear la encuesta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Nueva Encuesta</h2>
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          ¡Encuesta creada exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título de la Encuesta *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Ej: Preferencias Tecnológicas 2024"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Descripción opcional de la encuesta"
          />
        </div>

        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pregunta *
          </label>
          <input
            type="text"
            value={formData.question}
            onChange={(e) => handleInputChange('question', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="¿Cuál es tu preferencia?"
            required
          />
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opciones de Respuesta *
          </label>
          {formData.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder={`Opción ${index + 1}`}
              />
              {formData.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖️
                </button>
              )}
            </div>
          ))}
          {formData.options.length < 6 && (
            <button
              type="button"
              onClick={addOption}
              className="text-primary-600 hover:text-primary-800 text-sm"
            >
              + Agregar opción
            </button>
          )}
        </div>

        {/* Target Segments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Segmentos Objetivo
          </label>
          <div className="space-y-2">
            {segments.map((segment) => (
              <label key={segment.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.targetSegments.includes(segment.id)}
                  onChange={(e) => {
                    const newSegments = e.target.checked
                      ? [...formData.targetSegments, segment.id]
                      : formData.targetSegments.filter(id => id !== segment.id);
                    handleInputChange('targetSegments', newSegments);
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{segment.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="flex items-center space-x-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.allowMultipleVotes}
              onChange={(e) => handleInputChange('allowMultipleVotes', e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Permitir múltiples votos</span>
          </label>
        </div>

        {/* Expiration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Expiración
          </label>
          <input
            type="datetime-local"
            value={formData.expiresAt}
            onChange={(e) => handleInputChange('expiresAt', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Encuesta'}
          </button>
        </div>
      </form>
    </div>
  );
}