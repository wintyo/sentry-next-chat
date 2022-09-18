import type { NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';
import { withSentry } from '@sentry/nextjs';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET': {
      console.log(req.headers);
      const bearToken = req.headers['authorization'] || '';
      const token = bearToken.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET || '', (err, result) => {
        if (err) {
          res.status(401).send('');
          return;
        }
        res.status(200).send(result);
      });
      break;
    }
    default:
      res.status(404).send('');
  }
};

export default withSentry(handler);
