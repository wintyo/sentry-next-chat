import type { NextApiHandler } from 'next';
import { withSentry } from '@sentry/nextjs';

const handler: NextApiHandler = (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send('');
    return;
  }
  console.log(req.method);
  console.log(req.body);
  res.status(200).send('ok');
};

export default withSentry(handler);
