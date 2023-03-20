import { Request, Response, Router } from 'express';
import LeaderBoardController from '../Controllers/LeaderBoardController';

const router = Router();

const leaderBoardController = new LeaderBoardController();

router.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderBoardController.homeLeaderBoard(req, res),
);

router.get(
  '/leaderboard/away',
  (req: Request, res: Response) => leaderBoardController.awayLeaderBoard(req, res),
);

export default router;
