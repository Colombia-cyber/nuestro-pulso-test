import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaFire, FaEye, FaNewspaper, FaSync, FaSpinner, FaBolt } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import { MdViewStream, MdFlashOn } from 'react-icons/md';
import { NewsTopic, getPriorityTopics } from '../config/newsTopics';
import { topicNewsService, TopicNewsResponse } from '../services/topicNewsService';

interface FeaturedTopicsProps {
  onTopicSelect: (topic: NewsTopic, category: 'local' | 'world') => void;
  selectedCategory: 'local' | 'world';
  className?: string;
  onNewsUpdate?: (newsData: TopicNewsResponse, topic: NewsTopic) => void;
  onInstantLoad?: (topic: NewsTopic, category: 'local' | 'world', newsData: TopicNewsResponse) => void;
}

interface TopicStats {
  liveCount: number;
  totalCount: number;
  lastUpdate: Date;
  isLoading?: boolean;
}

// Dynamic topic display configuration
interface TopicDisplay {
  topic: NewsTopic;
  displayText: string;
  description: string;
  urgencyLevel: 'high' | 'medium' | 'normal';
  category: 'breaking' | 'politics' | 'security' | 'analysis';
}

// You can customize this mapping to fit your topics
const topicLabels: Record<string, { displayText: string; description: string; urgencyLevel: 'high' | 'medium' | 'normal'; category: 'breaking' | 'politics' | 'security' | 'analysis' }> = {
  "drugs-crime":        { displayText: "DROGAS Y CRIMEN", description: "Narcotráfico, crimen organizado, justicia", urgencyLevel: 'high', category: 'security' },
  "terror-news":        { displayText: "TERRORISMO Y SEGURIDAD", description: "Alertas de seguridad nacional y terrorismo", urgencyLevel: 'high', category: 'breaking' },
  "gustavo-petro":      { displayText: "GUSTAVO PETRO NOTICIAS", description: "Presidente de Colombia y gobierno nacional", urgencyLevel: 'medium', category: 'politics' },
  "congress":           { displayText: "CONGRESO DE COLOMBIA", description: "Actividad del Congreso de la República", urgencyLevel: 'medium', category: 'politics' },
  "left-wing":          { displayText: "IZQUIERDA POLÍTICA", description: "Perspectiva progresista y de izquierda", urgencyLevel: 'normal', category: 'analysis' },
  "right-wing":         { displayText: "DERECHA POLÍTICA", description: "Perspectiva conservadora y de derecha", urgencyLevel: 'normal', category: 'analysis' },
  "donald-trump-world": { displayText: "DONALD TRUMP GLOBAL", description: "Noticias mundiales sobre Donald Trump", urgencyLevel: 'high', category: 'politics' },
  "world-terror":       { displayText: "TERRORISMO MUNDIAL", description: "Terrorismo y seguridad internacional", urgencyLevel: 'high', category: 'security' },
  "world-right-wing":   { displayText: "DERECHA MUNDIAL", description: "Perspectiva conservadora global", urgencyLevel: 'normal', category: 'analysis' },
  "world-left-wing":    { displayText: "IZQUIERDA MUNDIAL", description: "Perspectiva progresista global", urgencyLevel: 'normal', category: 'analysis' },
  "world-travel":       { displayText: "MEJORES DESTINOS", description: "Mejores lugares para viajar", urgencyLevel: 'normal', category: 'analysis' },
  // Add further world topics as needed
};

const FeaturedTopics: React.FC<FeaturedTopicsProps> = ({
  onTopicSelect,
  selectedCategory,
  className = "",
  onNewsUpdate,
  onInstantLoad
}) => {
  const [priorityTopics, setPriorityTopics] = useState<NewsTopic[]>([]);
  const [topicStats, setTopicStats] = useState<Record<string, TopicStats>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicDisplays, setTopicDisplays] = useState<TopicDisplay[]>([]);

  // Dynamically build topicDisplays from priorityTopics and the label map
  useEffect(() => {
    setIsLoading(true);
    const topics = getPriorityTopics(selectedCategory);
    setPriorityTopics(topics);

    // Build display configuration for only present topics
    const displays: TopicDisplay[] = topics
      .map(topic => {
        const label = topicLabels[topic.id];
        if (!label) return null;
        return {
          topic,
          displayText: label.displayText,
          description: label.description,
          urgencyLevel: label.urgencyLevel,
          category: label.category
        };
      })
      .filter(Boolean) as TopicDisplay[];
    setTopicDisplays(displays);

    // Initialize stats for each topic
    const initialStats: Record<string, TopicStats> = {};
    topics.forEach(topic => {
      initialStats[topic.id] = {
        liveCount: Math.floor(Math.random() *
