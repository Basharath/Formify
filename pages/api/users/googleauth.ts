// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import generateToken from '../../../lib/generateToken';
import { serialize } from 'cookie';
import cookieOptions from '../../../lib/cookieOptions';
import jwt from 'jsonwebtoken';

interface DecodedType {
  name: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { googleToken } = req.body;
    try {
      const decodedData = jwt.decode(googleToken) as DecodedType;
      const { name, email } = decodedData;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        const result = await prisma.user.create({
          data: {
            name,
            email,
            password: '',
          },
        });

        const token = generateToken(result);

        res.setHeader('Set-Cookie', serialize('token', token, cookieOptions));
        return res.status(201).send('Signed up successfully');
      }

      const token = generateToken(user);
      res.setHeader('Set-Cookie', serialize('token', token, cookieOptions));

      return res.status(200).send('Signin successful');
    } catch (err) {
      console.error('err', err);
      return res.status(500).send('Something went wrong');
    }
  }
}
