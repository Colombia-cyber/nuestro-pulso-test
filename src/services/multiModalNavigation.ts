import { useState, useEffect, useCallback } from 'react';

export interface VoiceCommand {
  command: string;
  action: string;
  confidence: number;
}

export interface GestureEvent {
  type: 'swipe' | 'pinch' | 'tap' | 'long-press';
  direction?: 'left' | 'right' | 'up' | 'down';
  fingers: number;
  velocity?: number;
}

class MultiModalNavigationSystem {
  private recognition: any = null;
  private isListening = false;
  private commandCallbacks: Map<string, () => void> = new Map();
  private gestureCallbacks: Map<string, (event: GestureEvent) => void> = new Map();
  private lastGestureTime = 0;
  private gestureThrottleDelay = 300; // Throttle gestures to prevent conflicts
  private lastCommandTime = 0;
  private commandThrottleDelay = 500; // Throttle voice commands

  constructor() {
    this.initializeSpeechRecognition();
    this.initializeGestureDetection();
  }

  // Initialize Web Speech API
  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionAPI();
      
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'es-CO'; // Colombian Spanish
      
      this.recognition.onresult = this.handleSpeechResult.bind(this);
      this.recognition.onerror = this.handleSpeechError.bind(this);
      this.recognition.onend = this.handleSpeechEnd.bind(this);
    }
  }

  // Initialize gesture detection
  private initializeGestureDetection() {
    let startX = 0, startY = 0, startTime = 0;
    let touchCount = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchCount = e.touches.length;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const endTime = Date.now();
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;
      
      this.processGesture(deltaX, deltaY, deltaTime, touchCount);
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // Process gesture and trigger callbacks
  private processGesture(deltaX: number, deltaY: number, deltaTime: number, fingers: number) {
    // Throttle gestures to prevent excessive navigation
    const now = Date.now();
    if (now - this.lastGestureTime < this.gestureThrottleDelay) {
      return;
    }
    
    const minSwipeDistance = 50;
    const maxSwipeTime = 1000;
    const longPressTime = 500;
    
    if (deltaTime > longPressTime && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      // Long press detected
      this.lastGestureTime = now;
      this.triggerGestureCallback('long-press', {
        type: 'long-press',
        fingers
      });
    } else if (deltaTime < maxSwipeTime) {
      if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        // Swipe detected
        const direction = Math.abs(deltaX) > Math.abs(deltaY) 
          ? (deltaX > 0 ? 'right' : 'left')
          : (deltaY > 0 ? 'down' : 'up');
        
        const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;
        
        this.lastGestureTime = now;
        this.triggerGestureCallback('swipe', {
          type: 'swipe',
          direction,
          fingers,
          velocity
        });
      } else {
        // Tap detected
        this.triggerGestureCallback('tap', {
          type: 'tap',
          fingers
        });
      }
    }
  }

  // Handle speech recognition results
  private handleSpeechResult(event: any) {
    const last = event.results.length - 1;
    const transcript = event.results[last][0].transcript.toLowerCase().trim();
    const confidence = event.results[last][0].confidence;

    // Process voice commands
    this.processVoiceCommand(transcript, confidence);
  }

  // Process voice commands and trigger actions
  private processVoiceCommand(transcript: string, confidence: number) {
    // Throttle commands to prevent excessive navigation
    const now = Date.now();
    if (now - this.lastCommandTime < this.commandThrottleDelay) {
      return;
    }
    
    const commands = [
      { trigger: ['inicio', 'home', 'casa'], action: 'navigate-home' },
      { trigger: ['noticias', 'news', 'información'], action: 'navigate-news' },
      { trigger: ['encuestas', 'polls', 'votación'], action: 'navigate-polls' },
      { trigger: ['debate', 'debates', 'discusión'], action: 'navigate-debates' },
      { trigger: ['congreso', 'congress', 'senado'], action: 'navigate-congress' },
      { trigger: ['buscar', 'search', 'busca'], action: 'open-search' },
      { trigger: ['chat', 'conversación', 'hablar'], action: 'navigate-chat' },
      { trigger: ['reels', 'videos', 'multimedia'], action: 'navigate-reels' },
      { trigger: ['ayuda', 'help', 'asistencia'], action: 'open-help' },
      { trigger: ['configuración', 'settings', 'ajustes'], action: 'open-settings' },
      { trigger: ['silencio', 'quiet', 'parar'], action: 'stop-listening' }
    ];

    for (const command of commands) {
      if (command.trigger.some(trigger => transcript.includes(trigger))) {
        this.lastCommandTime = now;
        this.triggerCommandCallback(command.action);
        break;
      }
    }
  }

  private handleSpeechError(event: any) {
    console.warn('Speech recognition error:', event.error);
    if (event.error === 'not-allowed') {
      this.stopListening();
    }
  }

  private handleSpeechEnd() {
    if (this.isListening) {
      // Restart recognition if it should be continuous
      setTimeout(() => {
        if (this.isListening && this.recognition) {
          this.recognition.start();
        }
      }, 100);
    }
  }

  // Public methods
  startListening() {
    if (this.recognition && !this.isListening) {
      this.isListening = true;
      try {
        this.recognition.start();
      } catch (error) {
        console.warn('Could not start speech recognition:', error);
        this.isListening = false;
      }
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      this.recognition.stop();
    }
  }

  // Register command callback
  registerCommand(action: string, callback: () => void) {
    this.commandCallbacks.set(action, callback);
  }

  // Register gesture callback
  registerGesture(gestureType: string, callback: (event: GestureEvent) => void) {
    this.gestureCallbacks.set(gestureType, callback);
  }

  // Trigger command callback
  private triggerCommandCallback(action: string) {
    const callback = this.commandCallbacks.get(action);
    if (callback) {
      callback();
    }
  }

  // Trigger gesture callback
  private triggerGestureCallback(gestureType: string, event: GestureEvent) {
    const callback = this.gestureCallbacks.get(gestureType);
    if (callback) {
      callback(event);
    }
  }

  // Check capabilities
  getCapabilities() {
    return {
      speechRecognition: !!this.recognition,
      touchGestures: 'ontouchstart' in window,
      voiceCommands: !!this.recognition,
      isListening: this.isListening
    };
  }
}

// Singleton instance
export const multiModalNavigation = new MultiModalNavigationSystem();

// React hook for multi-modal navigation
export const useMultiModalNavigation = (onNavigate: (view: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const [capabilities, setCapabilities] = useState(multiModalNavigation.getCapabilities());

  useEffect(() => {
    // Register navigation commands
    const navigationMap: Record<string, string> = {
      'navigate-home': 'home',
      'navigate-news': 'news',
      'navigate-polls': 'surveys',
      'navigate-debates': 'debates',
      'navigate-congress': 'congress',
      'navigate-chat': 'chat',
      'navigate-reels': 'reels',
      'open-search': 'search'
    };

    Object.entries(navigationMap).forEach(([action, view]) => {
      multiModalNavigation.registerCommand(action, () => {
        onNavigate(view);
      });
    });

    // Register special commands
    multiModalNavigation.registerCommand('stop-listening', () => {
      setIsListening(false);
      multiModalNavigation.stopListening();
    });

    multiModalNavigation.registerCommand('open-help', () => {
      alert('Comandos de voz disponibles:\n- "Inicio" - Ir al inicio\n- "Noticias" - Ver noticias\n- "Encuestas" - Ver encuestas\n- "Debates" - Ver debates\n- "Congreso" - Seguimiento del congreso\n- "Chat" - Chat en vivo\n- "Buscar" - Abrir búsqueda\n- "Silencio" - Parar reconocimiento');
    });

    // Register gesture commands
    multiModalNavigation.registerGesture('swipe', (event: GestureEvent) => {
      if (event.direction === 'left') {
        onNavigate('news');
      } else if (event.direction === 'right') {
        onNavigate('home');
      } else if (event.direction === 'up') {
        onNavigate('search');
      } else if (event.direction === 'down') {
        onNavigate('chat');
      }
    });

    multiModalNavigation.registerGesture('long-press', () => {
      if (capabilities.speechRecognition) {
        setIsListening(prev => !prev);
        if (isListening) {
          multiModalNavigation.stopListening();
        } else {
          multiModalNavigation.startListening();
        }
      }
    });

    return () => {
      multiModalNavigation.stopListening();
    };
  }, [onNavigate, isListening, capabilities.speechRecognition]);

  const toggleVoiceControl = useCallback(() => {
    if (isListening) {
      multiModalNavigation.stopListening();
      setIsListening(false);
    } else {
      multiModalNavigation.startListening();
      setIsListening(true);
    }
  }, [isListening]);

  const updateCapabilities = useCallback(() => {
    setCapabilities(multiModalNavigation.getCapabilities());
  }, []);

  useEffect(() => {
    updateCapabilities();
  }, [updateCapabilities]);

  return {
    isListening,
    capabilities,
    toggleVoiceControl,
    updateCapabilities
  };
};