import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Chen', email: 'ava@example.com', role: 'captain' },
    { name: 'Noah Patel', email: 'noah@example.com', role: 'member' },
    { name: 'Mia Garcia', email: 'mia@example.com', role: 'member' },
  ]);

  const firstUser = users[0];
  const secondUser = users[1];
  const thirdUser = users[2];

  if (!firstUser || !secondUser || !thirdUser) {
    throw new Error('Expected seeded users to be available');
  }

  const teams = await Team.insertMany([
    { name: 'North Stars', captain: firstUser.name, members: users.map((user) => user.name) },
    { name: 'River Runners', captain: secondUser.name, members: [secondUser.name, thirdUser.name] },
  ]);

  const activities = await Activity.insertMany([
    { userId: firstUser._id.toString(), type: 'run', duration: 35, date: new Date('2026-06-20') },
    { userId: secondUser._id.toString(), type: 'cycle', duration: 45, date: new Date('2026-06-21') },
    { userId: thirdUser._id.toString(), type: 'yoga', duration: 25, date: new Date('2026-06-22') },
  ]);

  const leaderboard = await LeaderboardEntry.insertMany([
    { userId: firstUser._id.toString(), username: firstUser.name, score: 980, rank: 1 },
    { userId: secondUser._id.toString(), username: secondUser.name, score: 910, rank: 2 },
    { userId: thirdUser._id.toString(), username: thirdUser.name, score: 870, rank: 3 },
  ]);

  const workouts = await Workout.insertMany([
    { name: 'Morning HIIT', type: 'cardio', duration: 20, difficulty: 'intermediate' },
    { name: 'Core Strength', type: 'strength', duration: 30, difficulty: 'beginner' },
    { name: 'Recovery Flow', type: 'mobility', duration: 25, difficulty: 'beginner' },
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded activities:', activities.length);
  console.log('Seeded leaderboard:', leaderboard.length);
  console.log('Seeded workouts:', workouts.length);

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
