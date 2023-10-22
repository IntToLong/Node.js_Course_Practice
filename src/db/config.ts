/* eslint-disable @typescript-eslint/no-unused-vars */
import constants from '../constants';
import mongoose from 'mongoose';

export default function connectDB(): void {
  try {
    mongoose.connect(constants.URIDB);
  } catch (err: unknown) {
    console.error((err as Error).message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once('open', (_) => {
    console.log(`Database connected: ${constants.URIDB}`);
  });

  dbConnection.on('error', (err: Error) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
