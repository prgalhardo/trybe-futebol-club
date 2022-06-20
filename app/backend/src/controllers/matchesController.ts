import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      if (inProgress === 'true' || inProgress === 'false') {
        const result = await this.matchesService.findAllByProgress(inProgress);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
    try {
      const matchesInfos = await this.matchesService.findAll();
      return res.status(200).json(matchesInfos);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMatches = await this.matchesService.create(req.body);
      return res.status(201).json(newMatches);
    } catch (error) {
      next(error);
    }
  };

  public updateInProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.matchesService.updateInProgress(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  public updateMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.matchesService.updateMatches(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json({ message: 'Updated match' });
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
