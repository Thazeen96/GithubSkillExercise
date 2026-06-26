"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiRouter = void 0;
const express_1 = require("express");
const models_1 = require("./models");
const createResourceRoutes = (resourceName, Model) => {
    const router = (0, express_1.Router)();
    router.get('/', async (_req, res) => {
        try {
            const items = await Model.find().sort({ createdAt: -1 });
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ error: `Failed to fetch ${resourceName}` });
        }
    });
    router.post('/', async (req, res) => {
        try {
            const item = await Model.create(req.body);
            res.status(201).json(item);
        }
        catch (error) {
            res.status(400).json({ error: `Failed to create ${resourceName}` });
        }
    });
    return router;
};
const createApiRouter = () => {
    const router = (0, express_1.Router)();
    router.use('/users', createResourceRoutes('users', models_1.User));
    router.use('/teams', createResourceRoutes('teams', models_1.Team));
    router.use('/activities', createResourceRoutes('activities', models_1.Activity));
    router.use('/leaderboard', createResourceRoutes('leaderboard', models_1.LeaderboardEntry));
    router.use('/workouts', createResourceRoutes('workouts', models_1.Workout));
    return router;
};
exports.createApiRouter = createApiRouter;
//# sourceMappingURL=routes.js.map