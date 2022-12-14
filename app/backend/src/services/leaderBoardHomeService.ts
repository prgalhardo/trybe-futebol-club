import Match from '../database/models/matches';
import MatchesService from './matchesService';
import ILeaderBoard from '../interfaces/leaderboard.interface';

class LeaderBoardHomeService {
  constructor(private matchesService = new MatchesService()) { }

  private finishedMatches = async () => {
    const allMatches = await this.matchesService.findAll();
    if (allMatches === null) throw new Error('Match not found!');
    const filteredFinishedMatches = allMatches.filter(({ inProgress }) => inProgress === false);
    return filteredFinishedMatches as Match[];
  };

  private homeTeamNames = async () => {
    const allFinishedMatches = await this.finishedMatches();
    const allTeamNames = allFinishedMatches.map(({ teamHome }) => teamHome.teamName);
    const filteredDuplicateNames = allTeamNames
      .filter((teamName, index) => allTeamNames.indexOf(teamName) === index); // Novamente estou filtrando o array de nomes para excluir os nomes duplicados, o indexOf vai pegar a primeira ocorrĂȘncia do elemento ignorando se houver outras. https://www.delftstack.com/pt/howto/javascript/javascript-remove-duplicates-from-an-array/#:~:text=%2C%203%2C%204%5D-,Utilize%20Array.,elemento%20se%20cumprir%20a%20condi%C3%A7%C3%A3o.
    const leaderBoardHome = await this.leaderBoardHome(filteredDuplicateNames, allFinishedMatches);
    return leaderBoardHome;
  };

  private leaderBoardHome = async (arrTeams: string[], objMatches: Match[]) => {
    const arrLeaderBoardHome: ILeaderBoard[] = [];
    arrTeams.forEach((teamName: string) => {
      const allInfosMatches = objMatches.filter(({ teamHome }) => teamHome.teamName === teamName);
      arrLeaderBoardHome.push({
        name: teamName,
        totalPoints: this.totalPoints(allInfosMatches),
        totalGames: this.totalGames(allInfosMatches),
        totalVictories: this.totalVictories(allInfosMatches),
        totalDraws: this.totalDraws(allInfosMatches),
        totalLosses: this.totalLosses(allInfosMatches),
        goalsFavor: this.goalsFavor(allInfosMatches),
        goalsOwn: this.goalsOwn(allInfosMatches),
        goalsBalance: this.goalsBalance(allInfosMatches),
        efficiency: Number(((this.totalPoints(allInfosMatches)
         / (this.totalGames(allInfosMatches) * 3)) * 100).toFixed(2)),
      });
    });
    return arrLeaderBoardHome;
  };

  private totalPoints = (matchesInfos: Match[]): number => {
    let points = 0;
    matchesInfos.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) points += 3;
      if (homeTeamGoals === awayTeamGoals) points += 1;
    });
    return points;
  };

  private totalGames = (matchesInfos: Match[]): number => {
    let games = 0;
    matchesInfos.forEach(({ teamHome }) => {
      if (teamHome.teamName) games += 1;
    });
    return games;
  };

  private totalVictories = (matchesInfos: Match[]): number => {
    let victories = 0;
    matchesInfos.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) victories += 1;
    });
    return victories;
  };

  private totalDraws = (matchesInfos: Match[]): number => {
    let draws = 0;
    matchesInfos.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals === awayTeamGoals) draws += 1;
    });
    return draws;
  };

  private totalLosses = (matchesInfos: Match[]): number => {
    let losses = 0;
    matchesInfos.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) losses += 1;
    });
    return losses;
  };

  private goalsFavor = (matchesInfos: Match[]): number => {
    let goalsFavor = 0;
    matchesInfos.forEach(({ homeTeamGoals }) => {
      if (homeTeamGoals) goalsFavor += homeTeamGoals;
    });
    return goalsFavor;
  };

  private goalsOwn = (matchesInfos: Match[]): number => {
    let goalsOwn = 0;
    matchesInfos.forEach(({ awayTeamGoals }) => {
      if (awayTeamGoals) goalsOwn += awayTeamGoals;
    });
    return goalsOwn;
  };

  private goalsBalance = (matchesInfos: Match[]): number => {
    const goalsBalance = this.goalsFavor(matchesInfos) - this.goalsOwn(matchesInfos);
    return goalsBalance;
  };

  public sortedLeaderBoard = async () => {
    const leaderBoard = await this.homeTeamNames();
    const sortedleaderBoard = leaderBoard.sort((a, b) =>
      b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);

    return sortedleaderBoard;
  };
}

export default LeaderBoardHomeService;
