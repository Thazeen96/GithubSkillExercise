"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'member' },
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    captain: { type: String, default: '' },
    members: [{ type: String }],
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, default: 30 },
    difficulty: { type: String, default: 'beginner' },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
//# sourceMappingURL=models.js.map