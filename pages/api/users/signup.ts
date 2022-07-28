// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import generateToken from '../../../lib/generateToken';
import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';
import cookieOptions from '../../../lib/cookieOptions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password } = JSON.parse(req.body);
    const data = {
      name,
      email,
      password,
    };
    const { error } = validateUser(data);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      data.password = await bcrypt.hash(password, 12);
      const result = await prisma.user.create({
        data,
      });

      const token = generateToken(result);

      res.setHeader('Set-Cookie', serialize('token', token, cookieOptions));
      return res.status(201).send('Signed up successfully');
    } catch (err) {
      console.error('err', err);
      return res.status(500).send('Something went wrong');
    }
  }
}

interface UserType {
  name: string;
  email: string;
  password: string;
}

const validateUser = (user: UserType) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).label('Name'),
    email: Joi.string().email().min(4).max(255).required().label('Email'),
    password: Joi.string().min(8).max(15).required().label('Password'),
  });

  return schema.validate(user);
};
