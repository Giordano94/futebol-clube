import * as jsonwebtoken from 'jsonwebtoken';
// import IUser from '../Interfaces/IUser';
import ILogin from '../Interfaces/ILogin';

const { JWT_SECRET } = process.env;
const secret = JWT_SECRET as string;

const config: jsonwebtoken.SignOptions = {
  algorithm: 'HS256',
};

const sing = (payload: ILogin) => {
  if (!secret) return 'jwt_secret';

  return jsonwebtoken.sign(payload, secret, config);
};

export default sing;
