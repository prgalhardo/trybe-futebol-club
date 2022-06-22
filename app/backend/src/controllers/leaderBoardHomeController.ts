import { Request, Response, NextFunction } from 'express';
import LeaderBoardHomeService from '../services/leaderBoardHomeService';

class LeaderBoardHomeController {
  constructor(private leaderBoardService = new LeaderBoardHomeService()) { }

  public finishedMatches = async (_req: Request, res: Response, _next: NextFunction) => {
    const allMatches = await this.leaderBoardService.sortedLeaderBoard();
    return res.status(200).json(allMatches);
  };
}

export default LeaderBoardHomeController;
