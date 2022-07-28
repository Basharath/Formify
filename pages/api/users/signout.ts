// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // res.setHeader('Set-Cookie', serialize('token', '', cookieOptions));
    res.setHeader(
      'Set-Cookie',
      'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    );
    return res.send({ msg: 'OK' });
  }
}
