// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import validateAuth from '../../../lib/validateAuth';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const { msg: authData, err: authError } = validateAuth(req, res);

  if (authError) {
    let statusCode = 401;
    if (authData === 'Invalid token') statusCode = 400;
    return res.status(statusCode).json({ msg: authData, err: true });
  }

  if (req.method === 'GET') {
    // For type narrowing TS
    if (typeof authData === 'string') return;

    return res.status(200).json({ data: authData, err: false });
  } else {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
}
