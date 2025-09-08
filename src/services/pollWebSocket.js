// Mock WebSocket service for real-time updates in client-side demo
// In a real application, this would connect to a WebSocket server

class PollWebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    // Mock WebSocket connection for demo purposes
    this.socket = {
      on: (event, callback) => {
        if (!this.listeners.has(event)) {
          this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
      },
      emit: (event, data) => {
        console.log('Mock WebSocket emit:', event, data);
      },
      disconnect: () => {
        this.listeners.clear();
      }
    };

    // Simulate real-time poll updates
    this.simulateRealTimeUpdates();
    return this.socket;
  }

  simulateRealTimeUpdates() {
    // Simulate receiving real-time vote updates every 8 seconds
    const updateInterval = setInterval(() => {
      const pollUpdateListeners = this.listeners.get('pollUpdate');
      if (pollUpdateListeners && pollUpdateListeners.length > 0) {
        const mockUpdate = {
          pollId: Math.floor(Math.random() * 2) + 1, // Random poll ID (1 or 2)
          votes: [
            Math.floor(Math.random() * 10) + 40, // Random votes for option 1
            Math.floor(Math.random() * 10) + 30, // Random votes for option 2
            Math.floor(Math.random() * 10) + 20, // Random votes for option 3
            Math.floor(Math.random() * 10) + 10  // Random votes for option 4
          ],
          timestamp: new Date().toISOString()
        };
        
        console.log('Simulating real-time update:', mockUpdate);
        pollUpdateListeners.forEach(listener => listener(mockUpdate));
      }
    }, 8000); // Update every 8 seconds

    // Store interval reference to clear it later
    this.updateInterval = updateInterval;
  }

  subscribeToPollUpdates(pollId, callback) {
    if (this.socket) {
      this.socket.on('pollUpdate', (data) => {
        if (data.pollId === pollId || !pollId) { // If no pollId, listen to all
          callback(data);
        }
      });
    }
  }

  unsubscribeFromPollUpdates() {
    if (this.socket) {
      this.socket.disconnect();
    }
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  sendVote(pollId, optionIndex, userId) {
    if (this.socket) {
      this.socket.emit('vote', { pollId, optionIndex, userId, timestamp: new Date().toISOString() });
      
      // Simulate immediate local update for better UX
      setTimeout(() => {
        const pollUpdateListeners = this.listeners.get('pollUpdate');
        if (pollUpdateListeners) {
          // Create a mock update reflecting the vote
          const mockUpdate = {
            pollId,
            votes: Array(4).fill(0).map((_, i) => 
              i === optionIndex ? Math.floor(Math.random() * 5) + 20 : Math.floor(Math.random() * 10) + 15
            ),
            timestamp: new Date().toISOString(),
            source: 'userVote'
          };
          
          pollUpdateListeners.forEach(listener => listener(mockUpdate));
        }
      }, 500); // Simulate network delay
    }
  }
}

export const pollWebSocketService = new PollWebSocketService();