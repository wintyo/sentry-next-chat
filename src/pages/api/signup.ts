import type { NextApiHandler } from 'next';
import crypto from 'crypto';
import { withSentry } from '@sentry/nextjs';
import { connectToDatabase } from '../../mongodb/connectToDatabase';
import { UserModel } from '../../mongodb/model/User';

const handler: NextApiHandler = async (req, res) => {
  console.log(req.method);
  console.log(req.body);
  switch (req.method) {
    case 'POST': {
      await connectToDatabase();

      // 重複チェックがスキーマ指定で上手くできなかったのでfindで検索する
      const sameUsersByUserId = await UserModel.find({
        userId: req.body.userId,
      }).exec();
      if (sameUsersByUserId.length > 0) {
        res.status(400).send('Already used userId');
        return;
      }

      const user = await UserModel.create({
        userId: req.body.userId,
        name: req.body.name,
        password: crypto
          .createHash('sha512')
          .update(req.body.password)
          .digest('hex'),
      });
      res.status(200).send(user);
      break;
    }
    default:
      res.status(404).send('');
  }
};

export default withSentry(handler);
