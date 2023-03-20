import { Request, Response } from 'express';
import LeaderBoardService from '../Services/LeaderBoardService';

export default class leaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  async homeLeaderBoard(_req: Request, res: Response) {
    const leaderBoard = await this.leaderBoardService.createHomeTeamLeaderBoard();
    res.status(200).json(leaderBoard);
  }
}
