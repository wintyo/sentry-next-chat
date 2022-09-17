import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  const { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

  const mongodbUri =
    MONGODB_URI ||
    `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@localhost:27017`;

  await mongoose.connect(mongodbUri, {
    dbName: 'sentry-react-chat',
    autoIndex: true,
  });
};
