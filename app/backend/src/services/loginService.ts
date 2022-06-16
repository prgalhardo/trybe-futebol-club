import * as Bcrypt from 'bcryptjs';
import User from '../database/models/users';
import IUser from '../interfaces/user.interface';
import Token from '../helpers/generateToken';

class LoginService {
  public create = async (email: string, password: string): Promise<IUser | null> => {
    const loginInfos = await User.findOne({ where: { email } });

    if (!loginInfos) throw new Error('Incorrect email or password');

    if (!Bcrypt.compareSync(password, loginInfos.password)) {
      throw new Error('Incorrect email or password');
    }

    const { id, username, role } = loginInfos;

    const token = Token.create({ id });

    const finalUserObject = {
      user: {
        id,
        username,
        role,
        email,
      },
      token,
    };

    return finalUserObject;
  };
}

export default LoginService;
