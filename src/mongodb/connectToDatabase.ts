import mongoose from 'mongoose';
import path from 'path';

export const connectToDatabase = async () => {
  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
      path: path.resolve(__dirname, '../../mongodb/.env'),
    });
  }

  const { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

  const mongodbUri =
    MONGODB_URI ||
    `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@localhost:27017`;

  await mongoose.connect(mongodbUri, {
    dbName: 'sentry-react-chat',
    autoIndex: true,
  });
};
