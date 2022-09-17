// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';
import { withSentry } from '@sentry/nextjs';

const handler: NextApiHandler = (req, res) => {
  throw new Error('API throw error test');
  res.status(200).json({ name: 'John Doe' });
};

export default withSentry(handler);
