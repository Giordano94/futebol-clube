import { Request, Response } from 'express';
import UserService from '../Services/UserService';

export default class UserController {
  constructor(private userService = new UserService()) {}

  login = async (req: Request, res: Response) => {
    const { status, message } = await this.userService.login(req.body);
    if (status === 401) {
      return res.status(status).json({ message });
    }
    // console.log('REQ.BODY ', req.body);
    res.status(status).json(message);
    // console.log({ status, message });
  };
}
