// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import generateToken from '../../../lib/generateToken';
import { serialize } from 'cookie';
import cookieOptions from '../../../lib/cookieOptions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = JSON.parse(req.body);
    const data = {
      email,
      password,
    };

    const { error } = validateUser(data);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user)
        return res.status(404).json({ msg: 'Invalid email or password' });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).json({ msg: 'Invalid email or password' });

      const token = generateToken(user);
      res.setHeader('Set-Cookie', serialize('token', token, cookieOptions));

      return res.status(200).json({ msg: 'OK' });
    } catch (err) {
      console.error('err', err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  }
}

interface UserType {
  email: string;
  password: string;
}

const validateUser = (user: UserType) => {
  const schema = Joi.object({
    email: Joi.string().email().min(4).max(255).required().label('Email'),
    password: Joi.string().min(8).max(15).required().label('Password'),
  });

  return schema.validate(user);
};
