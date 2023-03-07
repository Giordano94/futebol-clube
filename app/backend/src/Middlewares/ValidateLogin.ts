import { RequestHandler } from 'express';

const validateLoginBody: RequestHandler = (req, res, next) => {
  const {
    body: { email, password },
  } = req;

  const validEmail = /\S+@\S+\.\S+/;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!(validEmail.test(email)) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default validateLoginBody;
