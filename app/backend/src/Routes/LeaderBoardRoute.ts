import { Request, Response, Router } from 'express';
import LeaderBoardController from '../Controllers/LeaderBoardController';

const router = Router();

const leaderBoardController = new LeaderBoardController();

router.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderBoardController.homeLeaderBoard(req, res),
);

export default router;
