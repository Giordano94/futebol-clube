import * as jsonwebtoken from 'jsonwebtoken';
import { RequestHandler } from 'express';

const { JWT_SECRET } = process.env;
const secret = JWT_SECRET as string;

const tokenAuthentication: RequestHandler = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  // console.log('AUTHORIZATION', authorization);
  const jwt = authorization as string;

  if (!authorization) {
    res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = jsonwebtoken.verify(jwt, secret);
    res.locals.user = token;
    console.log('res.locals.user', res.locals.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenAuthentication;
