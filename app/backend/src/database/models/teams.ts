import { Model, DataTypes } from 'sequelize';
import connection from '.';

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

export default Team;
