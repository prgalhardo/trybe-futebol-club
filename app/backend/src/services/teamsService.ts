import Team from '../database/models/teams';
import ITeam from '../interfaces/team.interface';

class TeamsService {
  public findAll = async (): Promise<ITeam[] | null> => {
    const teamsInfos = await Team.findAll();
    return teamsInfos;
  };

  public findById = async (id: string): Promise<ITeam | null> => {
    const team = await Team.findByPk(id);
    if (team === null) throw new Error('Team not found');
    return team;
  };
}

export default TeamsService;
