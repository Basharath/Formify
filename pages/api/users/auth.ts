// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import generateToken from '../../../lib/generateToken';
import { serialize } from 'cookie';
import cookieOptions from '../../../lib/cookieOptions';
import admin from 'firebase-admin';

interface DecodedType {
  name: string;
  email: string;
}

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).send('No token provided!');
    }

    let decodedToken;
    try {
      decodedToken = (await admin
        .auth()
        .verifyIdToken(firebaseToken)) as unknown as DecodedType;
    } catch (err) {
      // console.error('err', err);
      return res.status(400).send('Invalid credentials');
    }

    try {
      const { name, email } = decodedToken;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        const result = await prisma.user.create({
          data: {
            name: name || email,
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
