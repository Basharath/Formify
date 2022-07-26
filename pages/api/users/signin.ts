// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = JSON.parse(req.body);
    try {
      const result = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      const userPassword = result?.password;
      if (userPassword === password) {
        return res.status(200).json({ data: { message: 'OK' } });
      }
      return res.status(200).json({ data: { message: 'Failed' } });
    } catch (err) {
      console.error('err', err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // if (req.method === 'GET') {
  //   try {
  //     const result = await prisma.user.findMany();
  //     return res.status(200).json({ data: result });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ msg: 'Something went wrong' });
  //   }
  // } else {
  //   return res.status(405).json({ msg: 'Method not allowed' });
  // }
}
