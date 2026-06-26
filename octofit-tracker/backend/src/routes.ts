import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const createResourceRoutes = (resourceName: string, Model: any) => {
  const router = Router();

  router.get('/', async (_req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch ${resourceName}` });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: `Failed to create ${resourceName}` });
    }
  });

  return router;
};

export const createApiRouter = () => {
  const router = Router();

  router.use('/users', createResourceRoutes('users', User));
  router.use('/teams', createResourceRoutes('teams', Team));
  router.use('/activities', createResourceRoutes('activities', Activity));
  router.use('/leaderboard', createResourceRoutes('leaderboard', LeaderboardEntry));
  router.use('/workouts', createResourceRoutes('workouts', Workout));

  return router;
};
