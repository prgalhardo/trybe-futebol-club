// import Match from '../database/models/matches';
import MatchesService from './matchesService';
// import ILeaderBoard from '../interfaces/leaderboard.interface';

class LeaderBoardAwayService {
  constructor(private matchesService = new MatchesService()) { }

  public finishedMatches = async () => {
    const allMatches = await this.matchesService.findAll();
    if (allMatches === null) throw new Error('Match not found!');
    const filteredFinishedMatches = allMatches.filter(({ inProgress }) => inProgress === false);
    return filteredFinishedMatches;
  };
}

export default LeaderBoardAwayService;

// private finishedMatches = async () => {
//   const allMatches = await this.matchesService.findAll();
//   if (allMatches === null) throw new Error('Match not found!');
//   const filteredFinishedMatches = allMatches.filter(({ inProgress }) => inProgress === false);
//   return filteredFinishedMatches as Match[];
// };
