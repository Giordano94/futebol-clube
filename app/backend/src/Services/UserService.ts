import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import ILogin from '../Interfaces/ILogin';
import sing from '../Utils/JWTService';

export default class UserService {
  model: ModelStatic<UserModel> = UserModel;

  login = async (login: ILogin) => {
    const invalidResponse = { status: 401, message: 'Invalid email or password' };

    const user = await UserModel.findOne({
      where: { email: login.email },
    });

    // console.log('Login', login);

    if (user === null) return invalidResponse;
    // console.log('User', user.dataValues);

    const comparePassword = bcrypt.compareSync(login.password, user?.password || '-');
    // console.log('login.password', login.password);
    // console.log('user.password', user.password);
    // console.log('comparePassword', comparePassword);

    if (comparePassword === false) return invalidResponse;

    const token = sing(user.dataValues);
    // console.log('TOKEN', token);

    const validResponse = { status: 200, message: { token } };
    // console.log('STATUSMESSAGECONTR', validResponse);

    return validResponse;
  };
}
