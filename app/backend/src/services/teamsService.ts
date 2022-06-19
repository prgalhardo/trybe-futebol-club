import Team from '../database/models/teams';
import ITeam from '../interfaces/team.interface';

class TeamsService {
  public findAll = async (): Promise<ITeam[] | null> => {
    const teamsInfos = await Team.findAll();
    if (teamsInfos === null) throw new Error('Teams not found');
    return teamsInfos;
  };
}

export default TeamsService;
