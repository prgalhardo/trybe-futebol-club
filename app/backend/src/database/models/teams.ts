import { Model, DataTypes } from 'sequelize';
import connection from '.';
import Match from './matches';

class Team extends Model {
  public teamName: string;
}

Team.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: connection,
  underscored: true,
  timestamps: false,
});

Team.belongsTo(Match, { foreignKey: 'teamName', as: 'teamName' });

Match.hasMany(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
Match.hasMany(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Team;
