import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getAllMatches(_req: Request, res: Response): Promise<Response | void > {
    const allMatches = await this.matchService.getAllMatches();
    res.status(200).json(allMatches);
  }
}
