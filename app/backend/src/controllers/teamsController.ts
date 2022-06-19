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

  public findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.teamsService.findById(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamsController;
