import { Model, DataTypes } from 'sequelize';
import connection from '.';

class Team extends Model {
  public id: number;
  public teamName: string;
}

Team.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: connection,
  underscored: true,
  timestamps: false,
});

export default Team;
