import { Model, DataTypes } from 'sequelize';
import connection from '.';

class Match extends Model {
  public hometeam: number;
  public hometeamgoals: number;
  public awayteam: number;
  public awayteamgoals: number;
  public inprogress: boolean;
}
Match.init({
  hometeam: DataTypes.NUMBER,
  hometeamgoals: DataTypes.NUMBER,
  awayteam: DataTypes.NUMBER,
  awayteamgoals: DataTypes.NUMBER,
  inprogress: DataTypes.BOOLEAN,
}, {
  sequelize: connection,
  underscored: true,
  timestamps: false,
});

export default Match;
