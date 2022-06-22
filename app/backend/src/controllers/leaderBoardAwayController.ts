import { Request, Response, NextFunction } from 'express';
import LeaderBoardAwayService from '../services/leaderBoardAwayService';

class LeaderBoardAwayController {
  constructor(private leaderBoardAwayService = new LeaderBoardAwayService()) { }

  public leaderBoardAway = async (_req: Request, res: Response, _next: NextFunction) => {
    const allMatches = await this.leaderBoardAwayService.finishedMatches();
    return res.status(200).json(allMatches);
  };
}

export default LeaderBoardAwayController;
