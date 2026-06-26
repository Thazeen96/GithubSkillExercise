"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
const database_1 = require("../database");
dotenv_1.default.config();
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    const users = await models_1.User.insertMany([
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
    const teams = await models_1.Team.insertMany([
        { name: 'North Stars', captain: firstUser.name, members: users.map((user) => user.name) },
        { name: 'River Runners', captain: secondUser.name, members: [secondUser.name, thirdUser.name] },
    ]);
    const activities = await models_1.Activity.insertMany([
        { userId: firstUser._id.toString(), type: 'run', duration: 35, date: new Date('2026-06-20') },
        { userId: secondUser._id.toString(), type: 'cycle', duration: 45, date: new Date('2026-06-21') },
        { userId: thirdUser._id.toString(), type: 'yoga', duration: 25, date: new Date('2026-06-22') },
    ]);
    const leaderboard = await models_1.LeaderboardEntry.insertMany([
        { userId: firstUser._id.toString(), username: firstUser.name, score: 980, rank: 1 },
        { userId: secondUser._id.toString(), username: secondUser.name, score: 910, rank: 2 },
        { userId: thirdUser._id.toString(), username: thirdUser.name, score: 870, rank: 3 },
    ]);
    const workouts = await models_1.Workout.insertMany([
        { name: 'Morning HIIT', type: 'cardio', duration: 20, difficulty: 'intermediate' },
        { name: 'Core Strength', type: 'strength', duration: 30, difficulty: 'beginner' },
        { name: 'Recovery Flow', type: 'mobility', duration: 25, difficulty: 'beginner' },
    ]);
    console.log('Seeded users:', users.length);
    console.log('Seeded teams:', teams.length);
    console.log('Seeded activities:', activities.length);
    console.log('Seeded leaderboard:', leaderboard.length);
    console.log('Seeded workouts:', workouts.length);
    await (await import('mongoose')).default.disconnect();
}
seed().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map