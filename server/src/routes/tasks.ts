import express, { Request, Response, Router} from 'express';
import Task from '../models/Task';
import User from '../models/User';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { description, points, userId } = req.body;
  const task = new Task({ description, points, userId });
  await task.save();

  const user = await User.findById(userId);
  if (user) {
    user.points += points;
    await user.save();
  }

  res.status(201).send('Task created');
});

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const tasks = await Task.find({ userId });
  res.json(tasks);
});

export default router;