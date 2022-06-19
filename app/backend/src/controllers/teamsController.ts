import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teamsInfos = await this.teamsService.findAll();
      return res.status(200).json(teamsInfos);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamsController;
