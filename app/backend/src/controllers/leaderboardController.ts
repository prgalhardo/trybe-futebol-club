import { Request, Response, NextFunction } from 'express';
import LeaderBoardService from '../services/leaderboardService';

class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) { }

  public finishedMatches = async (_req: Request, res: Response, _next: NextFunction) => {
    const allMatches = await this.leaderBoardService.sortedLeaderBoard();
    return res.status(200).json(allMatches);
  };
}

export default LeaderBoardController;
