import { Model, DataTypes } from 'sequelize';
import connection from '.';
import Match from './matches';

class Team extends Model {
  public teamname: string;
}

Team.init({
  teamname: DataTypes.STRING,
}, {
  sequelize: connection,
  underscored: true,
  timestamps: false,
});

Team.belongsTo(Match, { foreignKey: 'teamname', as: 'teamName' });

Match.hasMany(Team, { foreignKey: 'hometeam', as: 'homeTeam' });
Match.hasMany(Team, { foreignKey: 'awayteam', as: 'awayTeam' });

export default Team;
