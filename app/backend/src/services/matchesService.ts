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
}

export default MatchesService;
