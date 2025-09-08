// Mock poll service for client-side demo
// In a real application, this would make API calls to a backend server

let mockPolls = [
  {
    id: 1,
    title: 'Tecnología Favorita 2024',
    description: 'Queremos conocer tu preferencia tecnológica',
    question: '¿Cuál es tu tecnología favorita para desarrollo web?',
    options: ['React', 'Vue.js', 'Angular', 'Svelte'],
    votes: [45, 32, 28, 15],
    totalVotes: 120,
    createdBy: 'admin',
    targetSegments: [2],
    isActive: true,
    allowMultipleVotes: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    expiresAt: null
  },
  {
    id: 2,
    title: 'Educación Virtual',
    description: 'Evaluando la educación en línea',
    question: '¿Cómo calificas la educación virtual?',
    options: ['Excelente', 'Buena', 'Regular', 'Mala'],
    votes: [25, 40, 20, 5],
    totalVotes: 90,
    createdBy: 'admin',
    targetSegments: [3],
    isActive: true,
    allowMultipleVotes: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    expiresAt: null
  }
];

let mockSegments = [
  {
    id: 1,
    name: 'Colombia Urban',
    criteria: JSON.stringify({ location: 'urban', country: 'Colombia' }),
    createdAt: new Date('2024-01-01')
  },
  {
    id: 2,
    name: 'Tech Enthusiasts',
    criteria: JSON.stringify({ interests: ['technology', 'innovation'] }),
    createdAt: new Date('2024-01-01')
  },
  {
    id: 3,
    name: 'Students',
    criteria: JSON.stringify({ interests: ['education', 'learning'] }),
    createdAt: new Date('2024-01-01')
  }
];

let voteHistory = new Map(); // Track user votes

class PollService {
  // Get all active polls
  async getActivePolls() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      return mockPolls.filter(poll => poll.isActive).map(poll => ({
        ...poll,
        totalVotes: poll.votes.reduce((sum, count) => sum + count, 0)
      }));
    } catch (error) {
      console.error('Error fetching polls:', error);
      return [];
    }
  }

  // Create a new poll
  async createPoll(pollData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const newPoll = {
        id: mockPolls.length + 1,
        title: pollData.title,
        description: pollData.description || '',
        question: pollData.question,
        options: Array.isArray(pollData.options) ? pollData.options : JSON.parse(pollData.options),
        votes: new Array(pollData.options.length).fill(0),
        totalVotes: 0,
        createdBy: pollData.createdBy,
        targetSegments: pollData.targetSegments || [],
        isActive: true,
        allowMultipleVotes: pollData.allowMultipleVotes || false,
        createdAt: new Date(),
        updatedAt: new Date(),
        expiresAt: pollData.expiresAt ? new Date(pollData.expiresAt) : null
      };

      mockPolls.push(newPoll);
      return newPoll;
    } catch (error) {
      console.error('Error creating poll:', error);
      throw error;
    }
  }

  // Submit a vote
  async submitVote(pollId, optionIndex, userId) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const poll = mockPolls.find(p => p.id === pollId);
      if (!poll) throw new Error('Poll not found');

      // Check if user already voted (if multiple votes not allowed)
      const voteKey = `${userId}-${pollId}`;
      if (!poll.allowMultipleVotes && voteHistory.has(voteKey)) {
        throw new Error('Ya has votado en esta encuesta');
      }

      // Validate option index
      if (optionIndex < 0 || optionIndex >= poll.options.length) {
        throw new Error('Opción inválida');
      }

      // Record the vote
      poll.votes[optionIndex]++;
      poll.totalVotes = poll.votes.reduce((sum, count) => sum + count, 0);
      
      // Track user vote
      voteHistory.set(voteKey, { pollId, optionIndex, votedAt: new Date() });

      return { success: true, pollId, optionIndex, userId };
    } catch (error) {
      console.error('Error submitting vote:', error);
      throw error;
    }
  }

  // Update poll
  async updatePoll(pollId, updateData) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const pollIndex = mockPolls.findIndex(p => p.id === pollId);
      if (pollIndex === -1) throw new Error('Poll not found');

      const updatedPoll = {
        ...mockPolls[pollIndex],
        ...updateData,
        updatedAt: new Date()
      };

      if (updateData.options && Array.isArray(updateData.options)) {
        updatedPoll.options = updateData.options;
      }
      if (updateData.targetSegments && Array.isArray(updateData.targetSegments)) {
        updatedPoll.targetSegments = updateData.targetSegments;
      }

      mockPolls[pollIndex] = updatedPoll;
      return updatedPoll;
    } catch (error) {
      console.error('Error updating poll:', error);
      throw error;
    }
  }

  // Delete poll
  async deletePoll(pollId) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const pollIndex = mockPolls.findIndex(p => p.id === pollId);
      if (pollIndex === -1) throw new Error('Poll not found');

      // Remove poll
      mockPolls.splice(pollIndex, 1);
      
      // Remove related vote history
      for (const [key, vote] of voteHistory.entries()) {
        if (vote.pollId === pollId) {
          voteHistory.delete(key);
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting poll:', error);
      throw error;
    }
  }

  // Get poll analytics
  async getPollAnalytics(pollId) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const poll = mockPolls.find(p => p.id === pollId);
      if (!poll) throw new Error('Poll not found');

      const totalVotes = poll.votes.reduce((sum, count) => sum + count, 0);
      const percentages = poll.votes.map(count => 
        totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
      );

      return {
        poll,
        options: poll.options,
        votes: poll.votes,
        percentages,
        totalVotes,
        analytics: {
          averageVotesPerHour: totalVotes / 24, // simplified calculation
          peakVotingTime: '14:00', // mock data
          votingTrend: 'increasing'
        }
      };
    } catch (error) {
      console.error('Error getting poll analytics:', error);
      throw error;
    }
  }

  // Get user segments
  async getUserSegments() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 50));
      
      return [...mockSegments].sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('Error fetching user segments:', error);
      return [];
    }
  }
}

export const pollService = new PollService();