import { Request, Response, Router } from 'express';
import MatchController from '../Controllers/MatchController';
import validateJsonToken from '../Middlewares/ValidateJsonToken';

const router = Router();

const matchController = new MatchController();

router.get('/matches', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.patch(
  '/matches/:id/finish',
  validateJsonToken,
  (req: Request, res: Response) => matchController.finishMatchById(req, res),
);

export default router;
