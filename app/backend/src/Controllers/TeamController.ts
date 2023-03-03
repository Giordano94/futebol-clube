import { Request, Response } from 'express';
import TeamsService from '../Services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamsService()) {}

  async getAllTeams(_req: Request, res: Response): Promise<Response | void > {
    const allTeams = await this.teamService.getAllTeams();
    res.status(200).json(allTeams);
  }

  async getTeamById(req: Request, res: Response): Promise<Response | void > {
    const { id } = req.params;
    const team = await this.teamService.getTeamById(Number(id));
    res.status(200).json(team);
  }
}
