import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    captain: { type: String, default: '' },
    members: [{ type: String }],
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, default: 30 },
    difficulty: { type: String, default: 'beginner' },
  },
  { timestamps: true },
);

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);
