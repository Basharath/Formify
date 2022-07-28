// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import validateAuth from '../../../lib/validateAuth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id } = req.query;
    const { name, email, twitter, website, message } = req.body;
    const data = {
      ...(name && { name }),
      ...(email && { email }),
      ...(twitter && { twitter }),
      ...(website && { website }),
      ...(message && { message }),
      forminfoId: id,
    };
    // console.log('form', data);
    try {
      const result = await prisma.form.create({
        data,
      });
      return res.status(200).send(result);
    } catch (err) {
      console.error('err', err);
      return res.status(500).send('Something went wrong');
    }
  }

  const { msg: authData, err: authError } = validateAuth(req, res);

  if (authError) {
    let statusCode = 401;
    if (authData === 'Invalid token') statusCode = 400;
    return res.status(statusCode).send(authData);
  }

  if (req.method === 'GET') {
    const useFormId = req.query.id as string;

    if (useFormId) {
      try {
        const result = await prisma.form.findMany({
          where: {
            forminfoId: useFormId,
          },
        });
        return res.status(200).send(result);
      } catch (err) {
        console.error(err);
        return res.status(500).send('Something went wrong');
      }
    }
  }
  if (req.method === 'DELETE') {
    const submissionId = req.query.id as string;
    try {
      const result = await prisma.form.delete({
        where: { id: submissionId },
      });
      return res.status(200).send(result);
    } catch (err) {
      console.error('err', err);
      return res.status(500).send('Something went wrong');
    }
  }

  return res.status(405).send('Method not allowed');
}

const allowCors =
  (fn: (a: NextApiRequest, b: NextApiResponse) => {}) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 1);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      'Access-Control-Allow-Methods',
      // 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
      'POST'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

export default allowCors(handler);
