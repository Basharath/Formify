import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface DecodedType {
  id: string;
  email: string;
}

export default function validateAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization } = req.headers;
  const { token: cookieToken } = req.cookies;
  const authToken = authorization;

  if (!authToken && !cookieToken)
    return res.status(401).json({ msg: 'Access denied. No token provided.' });

  const finalToken = authToken ? authToken : cookieToken ? cookieToken : '';
  try {
    const decodedData = <DecodedType>(
      jwt.verify(finalToken, <string>process.env.JWT_PRIVATE)
    );

    return { msg: decodedData, err: false };
  } catch (err) {
    return { msg: 'Invalid token', err: true };
  }
}
