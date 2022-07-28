// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import cookieOptions from '../../../lib/cookieOptions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // res.setHeader('Set-Cookie', serialize('token', '', cookieOptions));
    res.setHeader(
      'Set-Cookie',
      'token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    );
    return res.json({ msg: 'OK' });
  }
}
