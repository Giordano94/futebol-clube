import { Request, Response, Router } from 'express';
import TeamController from '../Controllers/TeamController';

const router = Router();

const teamController = new TeamController();

router.get('/teams', (req: Request, res: Response) => teamController.getAllTeams(req, res));
router.get('/teams/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default router;
