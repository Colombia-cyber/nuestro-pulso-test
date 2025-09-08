// Mock database for client-side demo
// In a real application, this would connect to a proper database

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

let voteHistory = [];

// Mock database implementation for demo
export const db = {
  select: () => ({
    from: (table) => ({
      where: (condition) => ({
        orderBy: () => Promise.resolve(mockPolls.filter(poll => poll.isActive))
      }),
      orderBy: () => Promise.resolve(mockPolls.filter(poll => poll.isActive))
    })
  }),
  insert: (table) => ({
    values: (data) => ({
      returning: () => {
        if (table === mockPolls) {
          const newPoll = {
            ...data,
            id: mockPolls.length + 1,
            votes: new Array(JSON.parse(data.options).length).fill(0),
            totalVotes: 0
          };
          mockPolls.push(newPoll);
          return Promise.resolve([newPoll]);
        }
        return Promise.resolve([data]);
      },
      onConflictDoNothing: () => Promise.resolve()
    })
  }),
  update: () => ({
    set: () => ({
      where: () => ({
        returning: () => Promise.resolve([])
      })
    })
  }),
  delete: () => ({
    where: () => Promise.resolve()
  })
};

// Initialize database with sample data
export async function initializeDatabase() {
  console.log('Mock database initialized with sample data');
  console.log('Polls available:', mockPolls.length);
  console.log('User segments available:', mockSegments.length);
}