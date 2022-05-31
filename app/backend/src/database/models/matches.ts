import { Model, DataTypes } from 'sequelize';
import connection from '.';

class Match extends Model {
  public hometeam: string;
  public hometeamgoals: string;
  public awayteam: string;
  public awayteamgoals: string;
  public inprogress: string;
}
Match.init({
  hometeam: DataTypes.STRING,
  hometeamgoals: DataTypes.STRING,
  awayteam: DataTypes.STRING,
  awayteamgoals: DataTypes.STRING,
  inprogress: DataTypes.STRING,
}, {
  sequelize: connection,
  underscored: true,
  timestamps: false,
});

export default Match;
