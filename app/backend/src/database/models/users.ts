import { Model, DataTypes } from 'sequelize';
import connection from '.';

class User extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}
User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: connection,
  underscored: true,
  timestamps: false,
});

export default User;
