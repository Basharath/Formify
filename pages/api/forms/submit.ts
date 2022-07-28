// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { form } = req.query;
    const { name, email, twitter, website, message } = req.body;
    const data = {
      ...(name && { name }),
      ...(email && { email }),
      ...(twitter && { twitter }),
      ...(website && { website }),
      ...(message && { message }),
      forminfoId: form,
    };
    console.log('form', data);
    try {
      const result = await prisma.form.create({
        data,
      });
      return res.status(200).json({ data: result });
    } catch (err) {
      console.error('err', err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  }
  // if (req.method === 'GET') {
  //   try {
  //     const result = await prisma.form.findMany();
  //     return res.status(200).json({ data: result });
  //   } catch (err) {
  //     console.error(err);
  //     return res.status(500).json({ msg: 'Something went wrong' });
  //   }
  // }
  else {
    return res.status(405).json({ msg: 'Method not allowed' });
  }
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
