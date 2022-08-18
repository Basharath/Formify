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
  return res.send('Sorry! This end point is not supported!');
  // if (req.method === 'POST') {
  //   const { email, password } = req.body;
  //   const data = {
  //     email,
  //     password,
  //   };

  //   const { error } = validateUser(data);
  //   if (error) return res.status(400).send(error.details[0].message);

  //   try {
  //     const user = await prisma.user.findUnique({
  //       where: {
  //         email,
  //       },
  //     });
  //     if (!user) return res.status(404).send('Invalid email or password');

  //     const validPassword = await bcrypt.compare(password, user.password);
  //     if (!validPassword)
  //       return res.status(400).send('Invalid email or password');

  //     const token = generateToken(user);
  //     res.setHeader('Set-Cookie', serialize('token', token, cookieOptions));

  //     return res.status(200).send('Signin successful');
  //   } catch (err) {
  //     console.error('err', err);
  //     return res.status(500).send('Something went wrong');
  //   }
  // }
}

// interface UserType {
//   email: string;
//   password: string;
// }

// const validateUser = (user: UserType) => {
//   const schema = Joi.object({
//     email: Joi.string().email().min(4).max(255).required().label('Email'),
//     password: Joi.string().min(8).max(15).required().label('Password'),
//   });

//   return schema.validate(user);
// };
