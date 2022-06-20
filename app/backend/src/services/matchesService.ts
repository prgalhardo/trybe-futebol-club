import Match from '../database/models/matches';
import IMatch from '../interfaces/match.interface';
import Team from '../database/models/teams';

class MatchesService {
  public findAll = async (): Promise<IMatch[] | null> => {
    const matchesInfos = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    if (matchesInfos === null) throw new Error('Matches not found');
    return matchesInfos;
  };

  public findAllByProgress = async (status: string): Promise<IMatch[] | null> => {
    const statusInBoolean = JSON.parse(status);
    const matchesInfos = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        }],
      where: { inProgress: statusInBoolean },
    });
    if (matchesInfos === null) throw new Error('Matches not found');
    return matchesInfos;
  };

  public create = async ({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }:
  Match): Promise<Match> => {
    const newMacthes = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });

    return newMacthes;
  };

  public updateInProgress = async (id: string): Promise<Match | null> => {
    const findMatchById = await Match.findOne({ where: { id } });
    await Match.update({ inProgress: false }, { where: { id } });
    return findMatchById;
  };

  public updateMatches = async (
    id: string,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Match | null> => {
    const findMatchById = await Match.findOne({ where: { id } });
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return findMatchById;
  };
}

export default MatchesService;
