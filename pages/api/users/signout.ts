// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import cookieOptions from '../../../lib/cookieOptions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.setHeader('Set-Cookie', serialize('token', '', cookieOptions));
    return res.json({ msg: 'OK' });
  }
}
