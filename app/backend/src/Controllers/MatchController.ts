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

  finishMatchById = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;

    const { status, message } = await this.matchService.finishMatchById(Number(id));

    return res.status(status).json({ message });
  };

  updateAtributesMatches = async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;

    const updatedAtributes = req.body;

    const { status, message } = await this.matchService
      .updateAtributesMatches(updatedAtributes, Number(id));

    return res.status(status).json({ message });
  };

  insertMatch = async (req:Request, res: Response) => {
    const newMatch = req.body;
    console.log('newMachCOntroller', newMatch);

    const { status, message } = await this.matchService.insertMatch(newMatch);

    if (status === 404 || status === 422) {
      return res.status(status).json({ message });
    }

    return res.status(status).json(message);
  };
}
