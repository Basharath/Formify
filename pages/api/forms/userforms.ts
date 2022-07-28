// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import validateAuth from '../../../lib/validateAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log('cookies', req.cookies);
  const { msg: authData, err: authError } = validateAuth(req, res);

  if (authError) {
    let statusCode = 401;
    if (authData === 'Invalid token') statusCode = 400;
    return res.status(statusCode).json({ msg: authData, err: true });
  }

  if (req.method === 'POST') {
    const { name, fields, ownerId } = JSON.parse(req.body);
    const data = {
      name,
      fields,
      ownerId,
    };
    console.log('form data', data);
    try {
      const result = await prisma.forminfo.create({
        data,
      });
      return res.status(200).json({ data: result, err: false });
    } catch (err) {
      console.error('err', err);
      return res.status(500).json({ msg: 'Something went wrong', err: true });
    }
  }
  if (req.method === 'PUT') {
    const formId = req.query.id as string;

    const { name, fields, ownerId } = JSON.parse(req.body);
    const data = {
      name,
      fields,
      ownerId,
    };

    try {
      const result = await prisma.forminfo.update({
        where: { id: formId },
        data,
      });
      return res.status(200).json({ data: result, err: false });
    } catch (err) {
      console.error('err', err);
      return res.status(500).json({ msg: 'Something went wrong', err: true });
    }
  }
  if (req.method === 'DELETE') {
    const formId = req.query.id as string;
    try {
      const result = await prisma.forminfo.delete({
        where: { id: formId },
      });
      return res.status(200).json({ data: result, err: false });
    } catch (err) {
      console.error('err', err);
      return res.status(500).json({ msg: 'Something went wrong', err: true });
    }
  }
  if (req.method === 'GET') {
    if (typeof authData === 'string') return;
    try {
      const result = await prisma.forminfo.findMany({
        where: {
          ownerId: authData.id,
        },
      });
      return res.status(200).json({ data: result, err: false });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  }

  return res.status(405).json({ msg: 'Method not allowed' });
}
