import { Request, Response, Router } from 'express';
import validateLoginBody from '../Middlewares/ValidateLogin';
import validateJsonToken from '../Middlewares/ValidateJsonToken';
import UserController from '../Controllers/UserController';

const router = Router();

const userController = new UserController();

router.post(
  '/login',
  validateLoginBody,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/login/role',
  validateJsonToken,
  (req: Request, res: Response) => res.status(200).json({ role: res.locals.user.role }),
);

export default router;
