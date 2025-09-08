import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// Users table for authentication and segmentation
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  location: text('location'),
  interests: text('interests'), // JSON array as string
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// User segments for targeted polling
export const userSegments = sqliteTable('user_segments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  criteria: text('criteria').notNull(), // JSON object as string
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Polls table
export const polls = sqliteTable('polls', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  question: text('question').notNull(),
  options: text('options').notNull(), // JSON array as string
  createdBy: text('created_by').notNull().references(() => users.id),
  targetSegments: text('target_segments'), // JSON array of segment IDs
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  allowMultipleVotes: integer('allow_multiple_votes', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
});

// Votes table
export const votes = sqliteTable('votes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pollId: integer('poll_id').notNull().references(() => polls.id),
  userId: text('user_id').notNull().references(() => users.id),
  optionIndex: integer('option_index').notNull(),
  votedAt: integer('voted_at', { mode: 'timestamp' }).notNull(),
});

// Relations
export const pollsRelations = relations(polls, ({ one, many }) => ({
  creator: one(users, {
    fields: [polls.createdBy],
    references: [users.id],
  }),
  votes: many(votes),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  poll: one(polls, {
    fields: [votes.pollId],
    references: [polls.id],
  }),
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  createdPolls: many(polls),
  votes: many(votes),
}));