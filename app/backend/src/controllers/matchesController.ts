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
}

export default MatchesController;
