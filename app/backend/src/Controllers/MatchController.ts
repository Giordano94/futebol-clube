import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getAllMatches(req: Request, res: Response): Promise<Response | void > {
    const {
      query: { inProgress },
    } = req;
    const inProgressQuery = inProgress as string;
    const allMatches = await this.matchService.getAllMatches(inProgressQuery);
    res.status(200).json(allMatches);
  }
}
