import { Request, Response, Router } from 'express';
import MatchController from '../Controllers/MatchController';

const router = Router();

const matchController = new MatchController();

router.get('/matches', (req: Request, res: Response) => matchController.getAllMatches(req, res));

export default router;
