import type { NextApiHandler } from 'next';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { withSentry } from '@sentry/nextjs';
import { connectToDatabase } from '../../mongodb/connectToDatabase';
import { UserModel } from '../../mongodb/model/User';

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'POST': {
      await connectToDatabase();

      const users = await UserModel.find({ userId: req.body.userId }).exec();
      if (users.length <= 0) {
        res.status(400).send('Not found userId');
        return;
      }

      const user = users[0];
      const hashedPassword = crypto
        .createHash('sha512')
        .update(req.body.password)
        .digest('hex');

      if (hashedPassword !== user.password) {
        res.status(400).send('Not Match password');
        return;
      }

      res.status(200).send({
        token: jwt.sign(
          {
            userId: user.userId,
          },
          process.env.JWT_SECRET || 'secret'
        ),
        user,
      });
      break;
    }
    default:
      res.status(404).send('');
  }
};

export default withSentry(handler);
