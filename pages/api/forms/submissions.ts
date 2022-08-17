// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import validateAuth from '../../../lib/validateAuth';
import sendMail from '../../../lib/sendMail';
import HTMLTemplate from '../../../lib/HTMLTemplate';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const id = req.query.id as string;
    const { name, email, twitter, website, message } = req.body;
    const data = {
      ...(name && { name }),
      ...(email && { email }),
      ...(twitter && { twitter }),
      ...(website && { website }),
      ...(message && { message }),
      forminfoId: id,
    };
    if (!id) return res.status(400).send('Invalid form ID');

    try {
      const formInfo = await prisma.forminfo.findUnique({
        where: {
          id,
        },
        include: {
          owner: {
            select: {
              email: true,
            },
          },
        },
      });
      if (!formInfo) return res.status(400).send('Invalid form ID');

      const result = await prisma.form.create({
        data,
      });

      const ownerEmail = formInfo?.owner.email;

      if (ownerEmail) {
        const HTMLData = HTMLTemplate(data, formInfo?.fields, formInfo.name);
        try {
          const emailResult = await sendMail(ownerEmail, HTMLData);
          console.log('Successful!', emailResult);
        } catch (err) {
          console.log("Couldn't sent email!", err);
        }
      }

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
    const userFormId = req.query.id as string;

    if (userFormId) {
      let result;
      try {
        const submissions = await prisma.form.findMany({
          where: {
            forminfoId: userFormId,
          },
          include: {
            forminfo: true,
          },
          orderBy: {
            updatedAt: 'desc',
          },
        });

        if (submissions.length < 1) {
          const forminfo = await prisma.forminfo.findUnique({
            where: {
              id: userFormId,
            },
          });
          result = [{ forminfo, id: '' }];
        } else result = submissions;
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
